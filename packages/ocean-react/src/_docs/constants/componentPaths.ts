type ComponentPaths = {
  [key: string]: string;
};

const groupPaths = {
  feedback: 'Feedback',
  dataDisplay: 'Data Display',
  action: 'Action',
  input: 'Input',
  navigation: 'Navigation',
  chart: 'Chart',
};

// eslint-disable-next-line import/prefer-default-export
export const componentsPaths: ComponentPaths = {
  alert: `${groupPaths.feedback}/Alert`,
  badge: `${groupPaths.dataDisplay}/Badge`,
  breadcrumb: `${groupPaths.navigation}/BreadCrumb`,
  button: `${groupPaths.action}/Button`,
  carousel: `${groupPaths.dataDisplay}/Carousel`,
  checkbox: `${groupPaths.input}/Checkbox`,
  donut: `${groupPaths.chart}/Donut`,
};
