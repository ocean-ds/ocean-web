const baseConfig = require('../../jest.config.base');
const packageName = require('./package.json').name.split('@useblu/').pop();

module.exports = {
  ...baseConfig,
  roots: [`<rootDir>/packages/${packageName}/src`],
  setupFilesAfterEnv: [`<rootDir>/packages/${packageName}/jest.setup.ts`],
  testRegex: [`(packages/${packageName}/.*/__tests__/.*|\\.test)\\.tsx?$`],
  collectCoverageFrom: [
    `<rootDir>/packages/${packageName}/src/**/*.{ts,tsx}`,
    `!<rootDir>/packages/${packageName}/src/**/index.ts`,
  ],
  name: packageName,
  displayName: packageName,
  rootDir: '../..',
};
