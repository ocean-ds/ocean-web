import React from 'react';
import styles from './BordersPalette.module.css';

interface BorderItem {
  token: string;
  name: string;
  value: string;
  usage: string;
}

interface ShadowItem {
  token: string;
  name: string;
  blur: string;
  xOffset: string;
  yOffset: string;
  usage: string;
}

interface BordersData {
  borderRadius: BorderItem[];
  borderWidths: BorderItem[];
  opacityLevels: BorderItem[];
  shadowLevels: ShadowItem[];
}

// Função auxiliar para criar itens de borda
const createBorderItems = (
  baseToken: string,
  items: { [key: string]: { value: string; usage: string } }
): BorderItem[] =>
  Object.entries(items).map(([name, { value, usage }]) => ({
    token: `${baseToken}${name}`,
    name,
    value,
    usage,
  }));

// Função auxiliar para criar itens de sombra
const createShadowItems = (
  baseToken: string,
  items: {
    [key: string]: {
      blur: string;
      xOffset: string;
      yOffset: string;
      usage: string;
    };
  }
): ShadowItem[] =>
  Object.entries(items).map(([name, { blur, xOffset, yOffset, usage }]) => ({
    token: `${baseToken}${name}`,
    name,
    blur,
    xOffset,
    yOffset,
    usage,
  }));

// Definição dos elementos organizados por categoria
const bordersDefinitions = {
  radius: {
    Tiny: { value: '4px', usage: 'Elementos pequenos, ícones, badges' },
    Sm: { value: '8px', usage: 'Botões pequenos, inputs, elementos compactos' },
    Md: { value: '12px', usage: 'Botões padrão, cartões pequenos' },
    Lg: { value: '16px', usage: 'Cartões grandes, modais, containers' },
    Pill: {
      value: '56px',
      usage: 'Botões de ação, chips, elementos de navegação',
    },
    Circular: {
      value: '50%',
      usage: 'Avatars, botões de ação circular, ícones',
    },
  },
  widths: {
    None: { value: '0px', usage: 'Elementos sem borda, estados padrão' },
    Hairline: { value: '1px', usage: 'Bordas sutis, divisores, estados hover' },
    Thin: { value: '2px', usage: 'Bordas de destaque, elementos selecionados' },
  },
  opacity: {
    Semiopaque: { value: '80%', usage: 'Overlays, elementos de destaque' },
    Intense: {
      value: '64%',
      usage: 'Elementos semi-transparentes, backgrounds',
    },
    Medium: {
      value: '40%',
      usage: 'Estados desabilitados, elementos secundários',
    },
    Light: { value: '16%', usage: 'Fundos sutis, elementos de fundo' },
    Semitransparent: {
      value: '8%',
      usage: 'Elementos muito sutis, overlays leves',
    },
  },
  shadows: {
    Level1: {
      blur: '8px',
      xOffset: '0px',
      yOffset: '4px',
      usage: 'Elementos elevados levemente, cartões pequenos',
    },
    Level2Bottom: {
      blur: '16px',
      xOffset: '0px',
      yOffset: '8px',
      usage: 'Elementos com elevação média, botões, inputs',
    },
    Level2Top: {
      blur: '16px',
      xOffset: '0px',
      yOffset: '-8px',
      usage: 'Elementos elevados para cima, tooltips, dropdowns',
    },
    Level3: {
      blur: '32px',
      xOffset: '0px',
      yOffset: '16px',
      usage: 'Elementos com alta elevação, modais, drawers',
    },
    Level4: {
      blur: '48px',
      xOffset: '0px',
      yOffset: '16px',
      usage: 'Elementos com máxima elevação, popups, overlays',
    },
  },
};

// Geração do objeto de dados de bordas
const bordersData: BordersData = {
  borderRadius: createBorderItems('borderRadius', bordersDefinitions.radius),
  borderWidths: createBorderItems('borderWidth', bordersDefinitions.widths),
  opacityLevels: createBorderItems('opacityLevel', bordersDefinitions.opacity),
  shadowLevels: createShadowItems('shadow', bordersDefinitions.shadows),
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

interface BordersPaletteProps {
  section?: 'border' | 'opacityLevels' | 'shadowLevels' | 'all';
}

const BordersPalette: React.FC<BordersPaletteProps> = ({ section = 'all' }) => {
  const renderSection = () => {
    switch (section) {
      case 'border':
        return (
          <>
            <BorderRadiusComponent />
            <BorderWidthsComponent />;
          </>
        );
      case 'opacityLevels':
        return <OpacityLevelsComponent />;
      case 'shadowLevels':
        return <ShadowLevelsComponent />;
      case 'all':
      default:
        return (
          <>
            <BorderRadiusComponent />
            <BorderWidthsComponent />
            <OpacityLevelsComponent />
            <ShadowLevelsComponent />
          </>
        );
    }
  };

  return <div className={styles.bordersPalette}>{renderSection()}</div>;
};

export default BordersPalette;
