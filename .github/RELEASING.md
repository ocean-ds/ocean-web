# How to Release

This project uses lerna to do versioning. This makes releasing really easy and changelogs are automatically generated.

This section is for **maintainers** who will be creating releases.

1. Configure the `.env` file with a key `GH_TOKEN=Your-GitHub-authentication-token`<details><summary>How to generate it?</summary>under Settings > Developer settings > Personal access tokens</details>
2. Run `yarn` to make sure everything is up to date.
3. Run `yarn release:version`. This command does the following:
   1. Identifies packages that have been updated since the previous tagged release.
   2. Prompts for a new version.
   3. Modifies package metadata to reflect new release, running appropriate lifecycle scripts in root and per-package.
   4. Commits those changes and tags the commit.
   5. Pushes to the git remote.
4. Check the [github release](https://github.com/Pagnet/ocean-ds-web/releases) created.
5. Check the `deploy-pkg` and `deploy-doc` job [on CircleCI](https://app.circleci.com/pipelines/github/Pagnet/ocean-ds-web).
