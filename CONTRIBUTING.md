# How to Contribute

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Ocean DS and its packages. Please take a moment to review this document in order to make the contribution process straightforward and effective for everyone involved.

### Table Of Contents

- [Code of Conduct](##Code-of-Conduct)
- [Issues](##Issues)

## Code of Conduct

We adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Issues

A great way to contribute to the project is to send a detailed report when you encounter an issue. We always appreciate a well-written, thorough bug report, and will thank you for it!

These are the locations to report or find an issue:

- [In the JIRA Board](https://useblu.atlassian.net/jira/software/projects/DSO/boards/79) (restricted :sweat_smile:)
- [Here on Github](https://github.com/Pagnet/ocean-ds-web/issues) (public :heart_eyes:)

Check that our issue database doesn't already include that problem or suggestion before submitting an issue. If you find a match, you can use the "subscribe" button to get notified on updates. Do not leave random "+1" or "I have this too" comments, as they only clutter the discussion, and don't help resolving it. However, if you have ways to reproduce the issue or have additional information that may help resolving the issue, please leave a comment.

### Security Issues

Blu's staff takes security and privacy issues seriously. If you discover a potential point of failure, please bring it to their attention immediately!

Please DO NOT file a public issue, but rather send your report privately to seguranca@useblu.com.br.

Read more: [SECURITY.md](SECURITY.md)

---

# I want to get an issue to code

- If you're new in this project we recommend you to choose on of [good first issue](https://github.com/Pagnet/ocean-ds-web/pulls?q=is%3Aopen+is%3Apr+label%3A%22good+first+issue%22)
- Assigns the issue to you. Let everyone know that you took that issue to settle;
- We adopt [Github Flow](https://guides.github.com/introduction/flow/);

# Coding

## Environment requirements

- Node 12.8.0+ _(if need many versions of node we recommend you to use some [node version manager](https://github.com/nvm-sh/nvm))_
- Yarn 1.22.0+ _(we use instead of npm because of [yarn workspace](https://classic.yarnpkg.com/en/docs/workspaces/))_
- VSCode _(recommended, it's useful because we share common configs and extensions)_

## Structure

This is a [monorepo using lerna](https://medium.com/hy-vee-engineering/creating-a-monorepo-with-lerna-yarn-workspaces-cf163908965d); all packages are listed in the `packages/` folder.

|     Package      | Description                                            | Latest Version |
| :--------------: | ------------------------------------------------------ | :------------: |
| ocean-components | React components that implement Ocean's Design System. |      WIP       |
|   ocean-formik   | Bindings for using formik with ocean-components.       |      WIP       |

## NPM scripts

There is npm scripts for root level and package level; Both are usually the same, the difference is when you are in the root level you will execute process across all packages.

## Code style

- It is not shame to check how other similarities libs have doing;

### Commit message

- We adopt [convetional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary). This improve readability of git the history and generate automatic changelogs via lerna;
- `yarn cm` will guide you adhering to a commit convention;
- There's a [vscode extension](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) to help you.

### Code Formatter

- We use [prettier](https://prettier.io/docs/en/why-prettier.html) to guaranteed the same code format in the project.
- We recommend you to use an [integration to your favorite editor](https://prettier.io/docs/en/editors.html).
- You code will be automatically formatted when you commit.
- `yarn format` will automatically format your files.

### Linter

- We adopt eslint to ensure recommended rules ([tslint is deprecated](https://www.darraghoriordan.com/2020/03/06/upgrade-tslint-deprecated-to-eslint/));
- Think carefully if you want to override some rule. Open an issue for discution first.

### Sass

- We adopted [BEM](http://getbem.com/introduction/) pattern.

### Typescript

- https://react-typescript-cheatsheet.netlify.app/
- https://basarat.gitbook.io/typescript/

### Documenting

- We adopted Storybook to document our components;
- You must writing stories [using MDX format](https://storybook.js.org/docs/react/writing-docs/mdx);

### Testing

- All src files must 100% coverage with tests;
- We adopted Jest as officially framework test;
- We adopted [Testing Library](https://testing-library.com/docs/intro) to test UI components;

# How to make a pull request?

- If your PR is in working in progress leave it in DRAFT mode;
