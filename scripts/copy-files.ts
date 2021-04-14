import fs from 'fs';
import path from 'path';

const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const checkFolder = (folderPath: string) => {
  // Throw error if folder path doesn't exist
  if (!folderPath) throw Error('folder path is required');

  // Check folder exists in the path using `fs.existsSync`
  const isFolderExist = fs.existsSync(folderPath);
  return isFolderExist;
};

function createPackageFile(packagePath: string) {
  let packageData = fs.readFileSync(
    path.resolve(packagePath, './package.json'),
    'utf8'
  );

  packageData = packageData.replace(/dist\//g, '');

  const newPackageData = JSON.parse(packageData);
  delete newPackageData.scripts;
  delete newPackageData.devDependencies;
  delete newPackageData.stylelint;
  delete newPackageData.browserslist;
  delete newPackageData.files;

  const targetPath = path.resolve(packagePath, 'dist', './package.json');

  fs.writeFileSync(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

for (const dirName of getDirectories('packages')) {
  const packagePath = `packages/${dirName}`;

  if (!checkFolder(`${packagePath}/dist`)) continue;

  createPackageFile(packagePath);
}
