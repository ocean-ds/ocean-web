import { componentsPaths } from '../constants/componentPaths';

const getComponentPath = (componentName: string): string =>
  componentName && componentsPaths[componentName];

export default getComponentPath;
