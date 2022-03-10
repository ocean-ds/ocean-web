/// <reference path="./typings.d.ts" />
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

import logo from './assets/logo.svg';

addons.setConfig({
  theme: create({
    base: 'light',
    appBg: '#F7F9FF',
    appBorderRadius: 8,
    brandTitle: 'Ocean DS',
    fontBase: '"Nunito Sans"',
    brandUrl: '/',
    brandImage: logo,
    colorSecondary: '#5872F5',
    barSelectedColor: '#5872F5',
    barTextColor: '#67697A',
    textColor: '#67697A',
    inputTextColor: '#67697A',
    colorPrimary: '#5872F5',
  }),
});
