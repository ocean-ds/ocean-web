#!/usr/bin/env node
/* eslint-disable no-console, @typescript-eslint/no-var-requires */
/*
 * Release notes of the Ocean repositories, for the "Release note & changelog" docs page.
 *
 * Reads the GitHub Releases of ocean-web, ocean-tokens, ocean-icons, ocean-ios and
 * ocean-android, groups each change as added (feat), fixed (fix), removed (breaking
 * change) or other (title outside the convention), drops the lines with no value for the
 * reader and writes `.storybook/assets/release-notes/release-notes.json`. Storybook serves
 * that folder as a static file, and the page reads it when it opens.
 *
 * Read only: it never writes to GitHub.
 *
 * Modes:
 * - default (Storybook build and start): never fails. A repository that cannot be read is
 *   written with `status: "error"`, and the page shows a warning on its tab.
 * - `--strict` (hourly workflow): any repository that cannot be read, or that comes back
 *   without releases, stops the script with exit code 1 and nothing is written, so the
 *   workflow publishes nothing and the page online stays as it was.
 *
 * Options: `--out <file>` writes somewhere else. `GITHUB_TOKEN` (or `GH_TOKEN`), when set,
 * authenticates the requests.
 */
const fs = require('node:fs');
const path = require('node:path');

const OWNER = 'ocean-ds';
const PER_PAGE = 100;
const MAX_PAGES = 6;

const REPOS = [
  { id: 'web', repo: 'ocean-web', format: 'changelog' },
  { id: 'tokens', repo: 'ocean-tokens', format: 'changelog' },
  { id: 'icons', repo: 'ocean-icons', format: 'changelog' },
  { id: 'ios', repo: 'ocean-ios', format: 'generated' },
  { id: 'android', repo: 'ocean-android', format: 'generated' },
];

const DEFAULT_OUT = path.resolve(
  __dirname,
  '../.storybook/assets/release-notes/release-notes.json'
);

/* Conventional commit types that are internal upkeep. The changelog generator of ocean-web,
 * ocean-tokens and ocean-icons already leaves them out; the mobile notes follow the same rule. */
const HIDDEN_TYPES = new Set([
  'chore',
  'ci',
  'build',
  'test',
  'docs',
  'style',
  'refactor',
]);

/* Lines with no value for the reader, whatever their type. */
const HIDDEN_TEXT = [
  /version bump only/i,
  // Commits made only to start a pipeline: "trigger release", "trigger a new version"…
  /^trigger( a)?( new)? \w+$/i,
  /\[skip ci\]|\[ci skip\]/i,
];

/* Changelog headings (conventional-changelog) and the group of each one. */
const CHANGELOG_SECTIONS = {
  features: 'added',
  'bug fixes': 'fixed',
  'performance improvements': 'fixed',
  'breaking changes': 'removed',
  reverts: 'other',
};

const emptyGroups = () => ({ added: [], fixed: [], removed: [], other: [] });

const isHidden = (text) => HIDDEN_TEXT.some((pattern) => pattern.test(text));

const pullUrl = (repo, number) =>
  `https://github.com/${OWNER}/${repo}/pull/${number}`;

/** Change of a changelog line: `* **scope:** text ([#12](…)) ([abc1234](…))`. */
const parseChangelogLine = (line, repo) => {
  const body = line.replace(/^\s*[*-]\s+/, '').trim();
  if (!body) return null;
  const scopeMatch = body.match(/^\*\*([^*]+?):\*\*\s*/);
  const scope = scopeMatch ? scopeMatch[1] : undefined;
  const rest = scopeMatch ? body.slice(scopeMatch[0].length) : body;
  // Text ends where the first reference starts: ` ([#12](…))`, ` ([abc1234](…))` or `, closes`.
  const text = rest
    .split(/\s\(\[(?:#\d+|[0-9a-f]{7,40})\]\(/)[0]
    .replace(/,\s*closes\s.*$/i, '')
    .trim();
  if (!text || isHidden(text)) return null;
  const pr = rest.match(/\[#(\d+)\]\(https:\/\/github\.com\/[^)]+\)/);
  const commit = rest.match(
    /\[[0-9a-f]{7,40}\]\((https:\/\/github\.com\/[^)]+)\)/
  );
  const change = { text };
  if (scope) change.scope = scope;
  if (pr) {
    change.pr = Number(pr[1]);
    change.url = pullUrl(repo, pr[1]);
  } else if (commit) {
    [, change.url] = commit;
  }
  return change;
};

/** Notes written by conventional-changelog (lerna and semantic-release). */
const parseChangelog = (body, repo) => {
  const groups = emptyGroups();
  let group = null;
  body.split(/\r?\n/).forEach((line) => {
    const heading = line.match(/^#{3,4}\s(.*)$/);
    if (heading) {
      group = CHANGELOG_SECTIONS[heading[1].trim().toLowerCase()] ?? null;
      return;
    }
    if (/^#{1,2}\s/.test(line)) {
      group = null;
      return;
    }
    if (!group || !/^\s*[*-]\s+/.test(line)) return;
    const change = parseChangelogLine(line, repo);
    if (change) groups[group].push(change);
  });
  return groups;
};

// `type(scope)!: text`. The text is trimmed afterwards, so the pattern never backtracks.
const CONVENTIONAL_TITLE = /^(\w+)(?:\(([^)]*)\))?(!)?:(.*)$/;

/** Group of a pull request title, or null when the line is hidden. */
const classifyTitle = (title) => {
  const match = title.match(CONVENTIONAL_TITLE);
  const text = match ? match[4].trim() : '';
  if (!match || !text) {
    return isHidden(title) ? null : { group: 'other', text: title };
  }
  const [, rawType, scope, bang] = match;
  const type = rawType.toLowerCase();
  if (isHidden(text)) return null;
  if (bang || /BREAKING CHANGE/.test(title))
    return { group: 'removed', text, scope };
  if (type === 'feat') return { group: 'added', text, scope };
  if (type === 'fix' || type === 'perf') return { group: 'fixed', text, scope };
  if (HIDDEN_TYPES.has(type)) return null;
  return { group: 'other', text, scope };
};

const PULL_URL = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/(\d+)$/;

/**
 * Line of the GitHub notes: `* title by @user in <pull url>`. Split by its fixed markers
 * (no backtracking regular expression); null when the line has another shape.
 */
const parseGeneratedLine = (line) => {
  const bullet = line.trimStart();
  if (!bullet.startsWith('* ') && !bullet.startsWith('- ')) return null;
  const rest = bullet.slice(2).trimEnd();
  const inAt = rest.lastIndexOf(' in ');
  const byAt = rest.lastIndexOf(' by @', inAt);
  if (inAt < 0 || byAt < 0) return null;
  const url = rest.slice(inAt + 4).trim();
  const pull = url.match(PULL_URL);
  const title = rest.slice(0, byAt).trim();
  const author = rest.slice(byAt + 5, inAt).trim();
  if (!pull || !title || !author || author.includes(' ')) return null;
  return { title, author, url, number: pull[1] };
};

/** Notes written by GitHub (`generateReleaseNotes`): `* title by @user in <pull url>`. */
const parseGenerated = (body) => {
  const groups = emptyGroups();
  let inChanges = false;
  body.split(/\r?\n/).forEach((line) => {
    if (/^##\s/.test(line)) {
      inChanges = /what's changed/i.test(line);
      return;
    }
    if (!inChanges) return;
    const entry = parseGeneratedLine(line);
    if (!entry) return;
    const { title, author, url, number } = entry;
    // Dependency updates opened by bots carry no change of the components.
    if (/^(dependabot|renovate)/i.test(author)) return;
    const classified = classifyTitle(title);
    if (!classified) return;
    const change = { text: classified.text, pr: Number(number), url };
    if (classified.scope) change.scope = classified.scope;
    groups[classified.group].push(change);
  });
  // Same pull request listed twice keeps one line.
  Object.keys(groups).forEach((key) => {
    const seen = new Set();
    groups[key] = groups[key].filter((change) => {
      const id = change.url ?? change.text;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  });
  return groups;
};

const hasChanges = (groups) =>
  Object.values(groups).some((changes) => changes.length > 0);

const fetchPage = async (repo, page) => {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${repo}/releases?per_page=${PER_PAGE}&page=${page}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'ocean-web-release-notes',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(30000),
    }
  );
  if (!response.ok) {
    throw new Error(`${repo}: GitHub answered ${response.status}`);
  }
  const releases = await response.json();
  if (!Array.isArray(releases)) throw new Error(`${repo}: unexpected answer`);
  return releases;
};

/*
 * Published releases, newest first, up to PER_PAGE of them. A token with write access also
 * sees drafts, which GitHub lists first (ocean-ios has hundreds), so it reads more pages
 * until it has enough published ones.
 */
const fetchReleases = async ({ repo }) => {
  const published = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    // eslint-disable-next-line no-await-in-loop
    const releases = await fetchPage(repo, page);
    published.push(
      ...releases.filter((release) => !release.draft && !release.prerelease)
    );
    if (published.length >= PER_PAGE || releases.length < PER_PAGE) break;
  }
  if (published.length === 0) throw new Error(`${repo}: no releases`);
  return published.slice(0, PER_PAGE);
};

const readRepo = async (source) => {
  const releases = await fetchReleases(source);
  const parse = source.format === 'changelog' ? parseChangelog : parseGenerated;
  return releases
    .map((release) => ({
      version: release.tag_name,
      date: release.published_at ?? release.created_at,
      url: release.html_url,
      groups: parse(release.body ?? '', source.repo),
    }))
    .filter((release) => hasChanges(release.groups))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

const build = async ({ strict }) => {
  const results = await Promise.allSettled(REPOS.map(readRepo));
  const repos = {};
  const failures = [];
  results.forEach((result, index) => {
    const { id, repo } = REPOS[index];
    const base = { repo, url: `https://github.com/${OWNER}/${repo}/releases` };
    if (result.status === 'fulfilled') {
      repos[id] = { ...base, status: 'ok', releases: result.value };
    } else {
      const message = result.reason?.message ?? String(result.reason);
      failures.push(message);
      repos[id] = { ...base, status: 'error', releases: [] };
    }
  });
  if (strict && failures.length > 0) {
    throw new Error(
      `could not read every repository:\n- ${failures.join('\n- ')}`
    );
  }
  return {
    generatedAt: new Date().toISOString(),
    complete: failures.length === 0,
    repos,
    failures,
  };
};

const option = (name) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const main = async () => {
  const strict = process.argv.includes('--strict');
  const out = path.resolve(option('--out') ?? DEFAULT_OUT);
  let data;
  try {
    data = await build({ strict });
  } catch (error) {
    if (strict) {
      console.error(`[release-notes] nothing written: ${error.message}`);
      process.exit(1);
    }
    // Unexpected error: the docs still build, and the page shows its warning.
    data = {
      generatedAt: new Date().toISOString(),
      complete: false,
      repos: {},
      failures: [error.message],
    };
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(data, null, 2)}\n`);
  const summary = Object.entries(data.repos)
    .map(([id, repo]) => `${id}=${repo.status}(${repo.releases.length})`)
    .join(' ');
  console.log(
    `[release-notes] ${path.relative(process.cwd(), out)} ${summary}`
  );
  if (data.failures.length) {
    console.warn(`[release-notes] warnings:\n- ${data.failures.join('\n- ')}`);
  }
};

if (require.main === module) {
  main().catch((error) => {
    console.error(`[release-notes] ${error.message}`);
    // Only the hourly workflow (strict) fails; the Storybook build always goes on.
    process.exitCode = process.argv.includes('--strict') ? 1 : 0;
  });
}

module.exports = { parseChangelog, parseGenerated, classifyTitle };
