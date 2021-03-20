# @useblu/ocean-react

<a href="https://npmjs.org/package/@useblu/ocean-react"><img alt="NPM version" src="https://img.shields.io/npm/v/@useblu/ocean-react" /></a> <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/min/@useblu/ocean-react">

> React components that implement Ocean's Design System.

## Installation

Using yarn:

```bash
yarn add @useblu/ocean-react
```

or using npm:

```bash
npm i @useblu/ocean-react
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import '@useblu/ocean-react/dist/ocean-ds.min.css';
import { Button } from '@useblu/ocean-react';

function App() {
  return <Button variant="primary">Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Read the [documentation](https://pagnet.github.io/ocean-ds-web/index.html) to learn more.

## License

Licensed under the **GPL-3.0 license**.
