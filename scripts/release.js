/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const { execSync } = require('child_process');

dotenv.config();

const params = process.argv.slice(2);
const command = `lerna version --no-private ${params.join(' ')}`.trim();

execSync(command, {
  stdio: 'inherit',
});
