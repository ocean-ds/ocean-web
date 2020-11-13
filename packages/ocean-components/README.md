# @useblu/ocean-components

> React components that implement Ocean's Design System.

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

import '@useblu/ocean-components/dist/ocean-ds.min.css';
import { Button } from '@useblu/ocean-components';

function App() {
  return <Button variant="primary">Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Read the [documentation](https://pagnet.github.io/ocean-ds-web/index.html) to learn more.

## Contributing

Please see our [contributing.md](/contributing.md).

## License

Licensed under the [GPL-3.0 license](LICENSE).
