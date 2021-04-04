# @useblu/ocean-components

<a href="https://npmjs.org/package/@useblu/ocean-components"><img alt="NPM version" src="https://img.shields.io/npm/v/@useblu/ocean-components" /></a> <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/min/@useblu/ocean-components">

> UIkit css that implement Ocean's Design System.

## Installation

Using yarn:

```bash
yarn add @useblu/ocean-components
```

or using npm:

```bash
npm i @useblu/ocean-components
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import '@useblu/ocean-components/dist/ocean.min.css';

function App() {
  return (
    <button class="ods-btn ods-btn--md ods-btn--primary">Hello World</button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Read the [documentation](https://pagnet.github.io/ocean-ds-web/index.html) to learn more.

## License

Licensed under the **GPL-3.0 license**.
