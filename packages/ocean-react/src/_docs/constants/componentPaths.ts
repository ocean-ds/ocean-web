type ComponentPaths = {
  [key: string]: string;
};

const groupPaths = {
  action: 'Action',
  chart: 'Chart',
  dataDisplay: 'Data Display',
  feedback: 'Feedback',
  foundations: 'Foundations',
  input: 'Input',
  navigation: 'Navigation',
};

// eslint-disable-next-line import/prefer-default-export
export const componentsPaths: ComponentPaths = {
  // Actions
  button: `${groupPaths.action}/Button`,

  // Charts
  donut: `${groupPaths.chart}/Donut`,

  // Data Display
  badge: `${groupPaths.dataDisplay}/Badge`,
  carousel: `${groupPaths.dataDisplay}/Carousel`,
  crosssell: `${groupPaths.dataDisplay}/CrossSellCard`,

  // Feedback
  alert: `${groupPaths.feedback}/Alert`,

  // Fundations
  colors: `${groupPaths.foundations}/Colors`,

  // Input
  checkbox: `${groupPaths.input}/Checkbox`,

  // Navigation
  breadcrumb: `${groupPaths.navigation}/BreadCrumb`,
};
