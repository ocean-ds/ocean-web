import type { Config } from '@jest/types';

import baseConfig from '../../jest.config.base';
import pkg from './package.json';

const packageName = pkg.name.split('@useblu/').pop();

const config: Config.InitialOptions = {
  ...baseConfig,
  roots: [`<rootDir>/packages/${packageName}/src`],
  setupFilesAfterEnv: [`<rootDir>/packages/${packageName}/jest.setup.ts`],
  testRegex: [`(packages/${packageName}/.*/__tests__/.*|\\.test)\\.tsx?$`],
  collectCoverageFrom: [
    `<rootDir>/packages/${packageName}/src/**/*.{ts,tsx}`,
    `!<rootDir>/packages/${packageName}/src/**/index.ts`,
    `!<rootDir>/packages/${packageName}/src/_stories/components/*.{ts,tsx}`,
  ],
  name: packageName,
  displayName: packageName,
  rootDir: '../..',
};

export default config;
