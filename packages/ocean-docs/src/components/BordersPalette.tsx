import React from 'react';
import styles from './BordersPalette.module.css';

interface BorderRadius {
  token: string;
  name: string;
  value: string;
  usage: string;
}

interface BorderWidth {
  token: string;
  name: string;
  value: string;
  usage: string;
}

interface OpacityLevel {
  token: string;
  name: string;
  value: string;
  usage: string;
}

interface ShadowLevel {
  token: string;
  name: string;
  blur: string;
  xOffset: string;
  yOffset: string;
  usage: string;
}

interface BordersData {
  borderRadius: BorderRadius[];
  borderWidths: BorderWidth[];
  opacityLevels: OpacityLevel[];
  shadowLevels: ShadowLevel[];
}

const bordersData: BordersData = {
  borderRadius: [
    {
      token: 'borderRadiusTiny',
      name: 'Tiny',
      value: '4px',
      usage: 'Elementos pequenos, ícones, badges',
    },
    {
      token: 'borderRadiusSm',
      name: 'SM',
      value: '8px',
      usage: 'Botões pequenos, inputs, elementos compactos',
    },
    {
      token: 'borderRadiusMd',
      name: 'MD',
      value: '12px',
      usage: 'Botões padrão, cartões pequenos',
    },
    {
      token: 'borderRadiusLg',
      name: 'LG',
      value: '16px',
      usage: 'Cartões grandes, modais, containers',
    },
    {
      token: 'borderRadiusPill',
      name: 'Pill',
      value: '56px',
      usage: 'Botões de ação, chips, elementos de navegação',
    },
    {
      token: 'borderRadiusCircular',
      name: 'Circular',
      value: '50%',
      usage: 'Avatars, botões de ação circular, ícones',
    },
  ],
  borderWidths: [
    {
      token: 'borderWidthNone',
      name: 'None',
      value: '0px',
      usage: 'Elementos sem borda, estados padrão',
    },
    {
      token: 'borderWidthHairline',
      name: 'Hairline',
      value: '1px',
      usage: 'Bordas sutis, divisores, estados hover',
    },
    {
      token: 'borderWidthThin',
      name: 'Thin',
      value: '2px',
      usage: 'Bordas de destaque, elementos selecionados',
    },
  ],
  opacityLevels: [
    {
      token: 'opacityLevelSemiopaque',
      name: 'Semi Opaque',
      value: '80%',
      usage: 'Overlays, elementos de destaque',
    },
    {
      token: 'opacityLevelIntense',
      name: 'Intense',
      value: '64%',
      usage: 'Elementos semi-transparentes, backgrounds',
    },
    {
      token: 'opacityLevelMedium',
      name: 'Medium',
      value: '40%',
      usage: 'Estados desabilitados, elementos secundários',
    },
    {
      token: 'opacityLevelLight',
      name: 'Light',
      value: '16%',
      usage: 'Fundos sutis, elementos de fundo',
    },
    {
      token: 'opacityLevelSemitransparent',
      name: 'Semi Transparent',
      value: '8%',
      usage: 'Elementos muito sutis, overlays leves',
    },
  ],
  shadowLevels: [
    {
      token: 'shadowLevel1',
      name: 'Level 1',
      blur: '8px',
      xOffset: '0px',
      yOffset: '4px',
      usage: 'Elementos elevados levemente, cartões pequenos',
    },
    {
      token: 'shadowLevel2Bottom',
      name: 'Level 2 Bottom',
      blur: '16px',
      xOffset: '0px',
      yOffset: '8px',
      usage: 'Elementos com elevação média, botões, inputs',
    },
    {
      token: 'shadowLevel2Top',
      name: 'Level 2 Top',
      blur: '16px',
      xOffset: '0px',
      yOffset: '-8px',
      usage: 'Elementos elevados para cima, tooltips, dropdowns',
    },
    {
      token: 'shadowLevel3',
      name: 'Level 3',
      blur: '32px',
      xOffset: '0px',
      yOffset: '16px',
      usage: 'Elementos com alta elevação, modais, drawers',
    },
    {
      token: 'shadowLevel4',
      name: 'Level 4',
      blur: '48px',
      xOffset: '0px',
      yOffset: '16px',
      usage: 'Elementos com máxima elevação, popups, overlays',
    },
  ],
};

const BorderRadiusComponent: React.FC = () => {
  const { borderRadius } = bordersData;

  return (
    <div className={styles.bordersCategory}>
      <h3 className={styles.categoryTitle}>Border Radius</h3>
      <div className={styles.borderRadiusGrid}>
        {borderRadius.map((radius) => (
          <div key={radius.token} className={styles.borderRadiusItem}>
            <div className={styles.borderRadiusPreview}>
              <div
                className={styles.borderRadiusSample}
                style={{
                  borderRadius: radius.value,
                  width: radius.value === '50%' ? '40px' : '60px',
                  height: radius.value === '50%' ? '40px' : '40px',
                }}
              />
            </div>
            <div className={styles.borderRadiusInfo}>
              <div className={styles.token}>{radius.token}</div>
              <div className={styles.name}>{radius.name}</div>
              <div className={styles.value}>{radius.value}</div>
              <div className={styles.usage}>{radius.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BorderWidthsComponent: React.FC = () => {
  const { borderWidths } = bordersData;

  return (
    <div className={styles.bordersCategory}>
      <h3 className={styles.categoryTitle}>Border Widths</h3>
      <div className={styles.borderWidthsGrid}>
        {borderWidths.map((width) => (
          <div key={width.token} className={styles.borderWidthItem}>
            <div className={styles.borderWidthPreview}>
              <div
                className={styles.borderWidthSample}
                style={{ borderWidth: width.value }}
              />
            </div>
            <div className={styles.borderWidthInfo}>
              <div className={styles.token}>{width.token}</div>
              <div className={styles.name}>{width.name}</div>
              <div className={styles.value}>{width.value}</div>
              <div className={styles.usage}>{width.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OpacityLevelsComponent: React.FC = () => {
  const { opacityLevels } = bordersData;

  return (
    <div className={styles.bordersCategory}>
      <h3 className={styles.categoryTitle}>Opacity Levels</h3>
      <div className={styles.opacityLevelsGrid}>
        {opacityLevels.map((opacity) => (
          <div key={opacity.token} className={styles.opacityLevelItem}>
            <div className={styles.opacityLevelPreview}>
              <div className={styles.opacityBackground}>
                <div
                  className={styles.opacitySample}
                  style={{ opacity: opacity.value }}
                />
              </div>
            </div>
            <div className={styles.opacityLevelInfo}>
              <div className={styles.token}>{opacity.token}</div>
              <div className={styles.name}>{opacity.name}</div>
              <div className={styles.value}>{opacity.value}</div>
              <div className={styles.usage}>{opacity.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShadowLevelsComponent: React.FC = () => {
  const { shadowLevels } = bordersData;

  return (
    <div className={styles.bordersCategory}>
      <h3 className={styles.categoryTitle}>Shadow Levels</h3>
      <div className={styles.shadowLevelsGrid}>
        {shadowLevels.map((shadow) => (
          <div key={shadow.token} className={styles.shadowLevelItem}>
            <div className={styles.shadowLevelPreview}>
              <div
                className={styles.shadowSample}
                style={{
                  boxShadow: `${shadow.xOffset} ${shadow.yOffset} ${shadow.blur} rgba(0, 0, 0, 0.1)`,
                }}
              />
            </div>
            <div className={styles.shadowLevelInfo}>
              <div className={styles.token}>{shadow.token}</div>
              <div className={styles.name}>{shadow.name}</div>
              <div className={styles.shadowProperties}>
                <span>B: {shadow.blur}</span>
                <span>X: {shadow.xOffset}</span>
                <span>Y: {shadow.yOffset}</span>
              </div>
              <div className={styles.usage}>{shadow.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BordersPalette: React.FC = () => (
  <div className={styles.bordersPalette}>
    <BorderRadiusComponent />
    <BorderWidthsComponent />
    <OpacityLevelsComponent />
    <ShadowLevelsComponent />
  </div>
);

export default BordersPalette;
