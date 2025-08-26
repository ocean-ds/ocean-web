import React from 'react';
import styles from './TypographyPalette.module.css';

interface FontSize {
  token: string;
  name: string;
  size: string;
  usage: string;
}

interface FontWeight {
  token: string;
  name: string;
  value: string;
  usage: string;
}

interface LineHeight {
  token: string;
  name: string;
  value: string;
  usage: string;
}

interface TypographyData {
  fontFamily: {
    token: string;
    name: string;
    font: string;
    usage: string;
  };
  fontSizes: FontSize[];
  fontWeights: FontWeight[];
  lineHeights: LineHeight[];
}

const typographyData: TypographyData = {
  fontFamily: {
    token: 'fontFamilyBase',
    name: 'Aa - Base',
    font: 'Nunito Sans',
    usage: 'Fonte principal para todo o conteúdo textual da aplicação',
  },
  fontSizes: [
    {
      token: 'fontSizeGiant',
      name: 'Giant',
      size: '96px',
      usage: 'Títulos principais, hero sections',
    },
    {
      token: 'fontSizeDisplay',
      name: 'Display',
      size: '80px',
      usage: 'Títulos de destaque, landing pages',
    },
    {
      token: 'fontSizeXxxl',
      name: 'XXXL',
      size: '64px',
      usage: 'Títulos de seção grandes',
    },
    {
      token: 'fontSizeXxl',
      name: 'XXL',
      size: '48px',
      usage: 'Títulos de seção',
    },
    {
      token: 'fontSizeXl',
      name: 'XL',
      size: '40px',
      usage: 'Subtítulos grandes',
    },
    {
      token: 'fontSizeLg',
      name: 'LG',
      size: '32px',
      usage: 'Títulos de conteúdo, headings',
    },
    {
      token: 'fontSizeMd',
      name: 'MD',
      size: '24px',
      usage: 'Texto de destaque, subtítulos',
    },
    {
      token: 'fontSizeSm',
      name: 'SM',
      size: '20px',
      usage: 'Texto de corpo principal',
    },
    {
      token: 'fontSizeXs',
      name: 'XS',
      size: '16px',
      usage: 'Texto de corpo secundário',
    },
    {
      token: 'fontSizeXxs',
      name: 'XXS',
      size: '14px',
      usage: 'Texto pequeno, captions',
    },
    {
      token: 'fontSizeXxxs',
      name: 'XXXS',
      size: '12px',
      usage: 'Texto muito pequeno, labels',
    },
  ],
  fontWeights: [
    {
      token: 'fontWeightExtraBold',
      name: 'Extra Bold',
      value: '800',
      usage: 'Títulos principais, elementos de destaque máximo',
    },
    {
      token: 'fontWeightBold',
      name: 'Bold',
      value: '700',
      usage: 'Títulos, elementos de destaque',
    },
    {
      token: 'fontWeightMedium',
      name: 'Medium',
      value: '600',
      usage: 'Subtítulos, elementos semi-destacados',
    },
    {
      token: 'fontWeightRegular',
      name: 'Regular',
      value: '400',
      usage: 'Texto de corpo, conteúdo principal',
    },
    {
      token: 'fontWeightLight',
      name: 'Light',
      value: '300',
      usage: 'Textos secundários, elementos sutis',
    },
  ],
  lineHeights: [
    {
      token: 'lineHeightTight',
      name: 'Tight',
      value: '100%',
      usage: 'Títulos, elementos compactos',
    },
    {
      token: 'lineHeightMedium',
      name: 'Medium',
      value: '124%',
      usage: 'Texto de corpo padrão',
    },
    {
      token: 'lineHeightLoose',
      name: 'Loose',
      value: '132%',
      usage: 'Texto de leitura confortável',
    },
    {
      token: 'lineHeightComfy',
      name: 'Comfy',
      value: '150%',
      usage: 'Textos longos, parágrafos',
    },
  ],
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
