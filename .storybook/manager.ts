/// <reference path="./typings.d.ts" />
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

import logo from './assets/logo.png';

addons.setConfig({
  theme: create({
    brandTitle: 'Ocean DS',
    brandUrl: 'https://zeroheight.com/9c9b2b3aa/p/49e1f9-ocean-design-system',
    brandImage: logo,
  }),
});
