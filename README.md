<h1 align="center">
  <a href="https://pagnet.github.io/ocean-ds-web/index.html">
    <img alt="ocean-logo" src="https://user-images.githubusercontent.com/3240432/96205195-5c8b0080-0f3c-11eb-8229-1f0a7f93df0a.png" width="400">
  </a>
</h1>

<p align="center">
  The design system made by <a href="https://www.useblu.com.br/sobre">Blu</a>
</p>

<p align="center">
  <a href="https://github.com/Pagnet/ocean-ds-web/actions">
    <img alt="Actions Status" src="https://github.com/Pagnet/ocean-ds-web/workflows/CI/badge.svg">
  </a>
  <a href="https://codeclimate.com/github/Pagnet/ocean-ds-web">
    <img alt="Code Climate coverage" src="https://img.shields.io/codeclimate/coverage/Pagnet/ocean-ds-web">
  </a>  
  <a href="https://sonarcloud.io/dashboard?id=Pagnet_ocean-ds-web">
    <img alt="Sonarcloud Status" src="https://sonarcloud.io/api/project_badges/measure?project=Pagnet_ocean-ds-web&metric=alert_status">
  </a>
  <a href="https://github.com/Pagnet/ocean-ds-web/blob/master/LICENSE">
    <img alt="GitHub License" src="https://img.shields.io/github/license/Pagnet/ocean-ds-web">
  </a>
  <a href="https://github.com/Pagnet/ocean-ds-web/graphs/commit-activity">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Pagnet/ocean-ds-web">
  </a>
  <a href="https://github.com/Pagnet/ocean-ds-web/network/updates">
    <img alt="Dependabot" src="https://img.shields.io/badge/Dependabot-enabled-brightgreen">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img alt="Prettier code style" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
  </a>
  <a href="https://lerna.js.org/">
    <img alt="Lerna" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg">
  </a>
  <a href="https://conventionalcommits.org">
    <img alt="Conventional Commits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg">
  </a>
  <a href="http://makeapullrequest.com">
    <img alt="Conventional Commits" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  </a>
</p>

This project is composed of many npm packages for building web apps with [Ocean](https://zeroheight.com/9c9b2b3aa/p/257272-ocean-ds/t/968532) design system.

## Installation

```bash
yarn add @useblu/ocean-core @useblu/ocean-react
```

or

```bash
npm i @useblu/ocean-core @useblu/ocean-react
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import '@useblu/ocean-core/dist/ocean.min.css';
import { Button } from '@useblu/ocean-react';

function App() {
  return <Button variant="primary">Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Read the [documentation](https://pagnet.github.io/ocean-ds-web/index.html) to learn more.

## Contributing

Whether you're helping us fix bugs, improve the docs, or spread the word, we'd love to have you as part of this project! :blue_heart: Read below to learn how you can take part of it.

### Code of Conduct

We adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](.github/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### Contributing Guide

Read our [contributing guide](.github/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/Pagnet/ocean-ds-web/labels/good%20first%20issue) that contain bugs which have a relatively limited scope. This is a great place to get started.

## License

All packages are licensed under the terms of the [GPL-3.0 License](LICENSE).
