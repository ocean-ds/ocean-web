import type { Config } from '@jest/types';
import baseConfig from './jest.config.base';

const config: Config.InitialOptions = {
  ...baseConfig,
  projects: ['<rootDir>/packages/*/jest.config.ts'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.{ts,tsx}',
    '!<rootDir>/packages/*/src/**/index.ts',
    '!<rootDir>/packages/*/src/**/examples/**',
    `!<rootDir>/packages/*/src/_stories/components/*.{ts,tsx}`,
  ],
  moduleDirectories: ['node_modules'],
};

export default config;
