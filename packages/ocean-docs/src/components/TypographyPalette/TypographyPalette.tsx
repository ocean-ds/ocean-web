import React from 'react';
import styles from './TypographyPalette.module.css';

interface TypographyItem {
  token: string;
  name: string;
  value: string;
  usage: string;
}

interface FontSizeItem extends TypographyItem {
  size: string;
}

interface TypographyData {
  fontFamily: {
    token: string;
    name: string;
    font: string;
    usage: string;
  };
  fontSizes: FontSizeItem[];
  fontWeights: TypographyItem[];
  lineHeights: TypographyItem[];
}

// Função auxiliar para criar itens de tipografia
const createTypographyItems = (
  baseToken: string,
  items: { [key: string]: { value: string; usage: string } }
): TypographyItem[] =>
  Object.entries(items).map(([name, { value, usage }]) => ({
    token: `${baseToken}${name}`,
    name,
    value,
    usage,
  }));

// Função auxiliar para criar itens de tamanho de fonte
const createFontSizeItems = (
  baseToken: string,
  items: { [key: string]: { size: string; usage: string } }
): FontSizeItem[] =>
  Object.entries(items).map(([name, { size, usage }]) => ({
    token: `${baseToken}${name}`,
    name,
    size,
    value: size,
    usage,
  }));

// Definição dos elementos organizados por categoria
const typographyDefinitions = {
  sizes: {
    Giant: { size: '96px', usage: 'Títulos principais, hero sections' },
    Display: { size: '80px', usage: 'Títulos de destaque, landing pages' },
    Xxxl: { size: '64px', usage: 'Títulos de seção grandes' },
    Xxl: { size: '48px', usage: 'Títulos de seção' },
    Xl: { size: '40px', usage: 'Subtítulos grandes' },
    Lg: { size: '32px', usage: 'Títulos de conteúdo, headings' },
    Md: { size: '24px', usage: 'Texto de destaque, subtítulos' },
    Sm: { size: '20px', usage: 'Texto de corpo principal' },
    Xs: { size: '16px', usage: 'Texto de corpo secundário' },
    Xxs: { size: '14px', usage: 'Texto pequeno, captions' },
    Xxxs: { size: '12px', usage: 'Texto muito pequeno, labels' },
  },
  weights: {
    ExtraBold: {
      value: '800',
      usage: 'Títulos principais, elementos de destaque máximo',
    },
    Bold: { value: '700', usage: 'Títulos, elementos de destaque' },
    Medium: { value: '600', usage: 'Subtítulos, elementos semi-destacados' },
    Regular: { value: '400', usage: 'Texto de corpo, conteúdo principal' },
    Light: { value: '300', usage: 'Textos secundários, elementos sutis' },
  },
  lineHeights: {
    Tight: { value: '100%', usage: 'Títulos, elementos compactos' },
    Medium: { value: '124%', usage: 'Texto de corpo padrão' },
    Loose: { value: '132%', usage: 'Texto de leitura confortável' },
    Comfy: { value: '150%', usage: 'Textos longos, parágrafos' },
  },
};

// Geração do objeto de dados de tipografia
const typographyData: TypographyData = {
  fontFamily: {
    token: 'fontFamilyBase',
    name: 'Aa - Base',
    font: 'Nunito Sans',
    usage: 'Fonte principal para todo o conteúdo textual da aplicação',
  },
  fontSizes: createFontSizeItems('fontSize', typographyDefinitions.sizes),
  fontWeights: createTypographyItems(
    'fontWeight',
    typographyDefinitions.weights
  ),
  lineHeights: createTypographyItems(
    'lineHeight',
    typographyDefinitions.lineHeights
  ),
};

const FontFamilyComponent: React.FC = () => {
  const { fontFamily } = typographyData;

  return (
    <div className={styles.typographyCategory}>
      <h3 className={styles.categoryTitle}>Família de Fonte</h3>
      <div className={styles.fontFamilyContainer}>
        <div className={styles.fontFamilyPreview}>
          <div className={styles.fontFamilySample}>{fontFamily.name}</div>
          <div className={styles.fontFamilyInfo}>
            <div className={styles.token}>{fontFamily.token}</div>
            <div className={styles.fontName}>{fontFamily.font}</div>
            <div className={styles.usage}>{fontFamily.usage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FontSizesComponent: React.FC = () => {
  const { fontSizes } = typographyData;

  return (
    <div className={styles.typographyCategory}>
      <h3 className={styles.categoryTitle}>Tamanhos de Fonte</h3>
      <div className={styles.fontSizesGrid}>
        {fontSizes.map((fontSize) => (
          <div key={fontSize.token} className={styles.fontSizeItem}>
            <div className={styles.fontSizePreview}>
              <div
                className={styles.fontSizeSample}
                style={{ fontSize: fontSize.size }}
              >
                Aa
              </div>
            </div>
            <div className={styles.fontSizeInfo}>
              <div className={styles.token}>{fontSize.token}</div>
              <div className={styles.name}>{fontSize.name}</div>
              <div className={styles.size}>{fontSize.size}</div>
              <div className={styles.usage}>{fontSize.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FontWeightsComponent: React.FC = () => {
  const { fontWeights } = typographyData;

  const getFontWeight = (value: string) => {
    switch (value) {
      case '800':
        return 800;
      case '700':
        return 700;
      case '600':
        return 600;
      case '400':
        return 400;
      case '300':
        return 300;
      default:
        return 400;
    }
  };

  return (
    <div className={styles.typographyCategory}>
      <h3 className={styles.categoryTitle}>Pesos de Fonte</h3>
      <div className={styles.fontWeightsGrid}>
        {fontWeights.map((fontWeight) => (
          <div key={fontWeight.token} className={styles.fontWeightItem}>
            <div className={styles.fontWeightPreview}>
              <div
                className={styles.fontWeightSample}
                style={{ fontWeight: getFontWeight(fontWeight.value) }}
              >
                {fontWeight.name}
              </div>
            </div>
            <div className={styles.fontWeightInfo}>
              <div className={styles.token}>{fontWeight.token}</div>
              <div className={styles.value}>{fontWeight.value}</div>
              <div className={styles.usage}>{fontWeight.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineHeightsComponent: React.FC = () => {
  const { lineHeights } = typographyData;

  return (
    <div className={styles.typographyCategory}>
      <h3 className={styles.categoryTitle}>Alturas de Linha</h3>
      <div className={styles.lineHeightsGrid}>
        {lineHeights.map((lineHeight) => (
          <div key={lineHeight.token} className={styles.lineHeightItem}>
            <div className={styles.lineHeightPreview}>
              <div
                className={styles.lineHeightSample}
                style={{ lineHeight: lineHeight.value }}
              >
                <div>Primeira linha</div>
                <div>Segunda linha</div>
                <div>Terceira linha</div>
              </div>
            </div>
            <div className={styles.lineHeightInfo}>
              <div className={styles.token}>{lineHeight.token}</div>
              <div className={styles.name}>{lineHeight.name}</div>
              <div className={styles.value}>{lineHeight.value}</div>
              <div className={styles.usage}>{lineHeight.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TypographyPalette: React.FC = () => (
  <div className={styles.typographyPalette}>
    <FontFamilyComponent />
    <FontSizesComponent />
    <FontWeightsComponent />
    <LineHeightsComponent />
  </div>
);

export default TypographyPalette;
