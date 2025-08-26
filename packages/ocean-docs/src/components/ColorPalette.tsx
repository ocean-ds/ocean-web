import React from 'react';
import styles from './ColorPalette.module.css';

interface ColorSwatch {
  token: string;
  name: string;
  hex: string;
  usage: string;
}

interface ColorCategory {
  title: string;
  description: string;
  colors: ColorSwatch[];
}

const colorData: ColorCategory[] = [
  {
    title: 'Cores da Marca',
    description: 'Cores principais da identidade visual do Ocean',
    colors: [
      {
        token: 'colorBrandPrimaryPure',
        name: 'Color Brand Primary Pure',
        hex: '#0025E0',
        usage: 'Cor principal da marca, CTAs principais',
      },
      {
        token: 'colorBrandPrimaryUp',
        name: 'Color Brand Primary Up',
        hex: '#B8C3FF',
        usage: 'Fundos sutis, estados hover suaves',
      },
      {
        token: 'colorBrandPrimaryDown',
        name: 'Color Brand Primary Down',
        hex: '#5872F5',
        usage: 'Estados ativos, elementos secundários',
      },
      {
        token: 'colorBrandPrimaryDeep',
        name: 'Color Brand Primary Deep',
        hex: '#0E248F',
        usage: 'Textos importantes, elementos de destaque escuro',
      },
    ],
  },
  {
    title: 'Cores Complementares',
    description: 'Cores que oferecem contraste e variedade visual',
    colors: [
      {
        token: 'colorComplementaryPure',
        name: 'Color Complementary Pure',
        hex: '#13BDBD',
        usage: 'Elementos de destaque secundários, ícones informativos',
      },
      {
        token: 'colorComplementaryUp',
        name: 'Color Complementary Up',
        hex: '#B0F5F5',
        usage: 'Fundos de destaque suaves, estados hover',
      },
      {
        token: 'colorComplementaryDown',
        name: 'Color Complementary Down',
        hex: '#6AE5E5',
        usage: 'Estados ativos, elementos interativos',
      },
      {
        token: 'colorComplementaryDeep',
        name: 'Color Complementary Deep',
        hex: '#1C9999',
        usage: 'Textos importantes, elementos de destaque',
      },
    ],
  },
  {
    title: 'Cores de Destaque',
    description: 'Cores para chamar atenção e indicar ações importantes',
    colors: [
      {
        token: 'colorHighlightPure',
        name: 'Color Highlight Pure',
        hex: '#FF726E',
        usage: 'Alertas, notificações, elementos que precisam de atenção',
      },
      {
        token: 'colorHighlightUp',
        name: 'Color Highlight Up',
        hex: '#FFB8B2',
        usage: 'Fundos de alerta suaves, estados hover',
      },
      {
        token: 'colorHighlightDown',
        name: 'Color Highlight Down',
        hex: '#F0584D',
        usage: 'Estados ativos, elementos de erro',
      },
      {
        token: 'colorHighlightDeep',
        name: 'Color Highlight Deep',
        hex: '#E53E32',
        usage: 'Textos de erro críticos, elementos de destaque escuro',
      },
    ],
  },
  {
    title: 'Cores de Interface - Claras',
    description: 'Cores claras para layouts e elementos de UI',
    colors: [
      {
        token: 'colorInterfaceLightPure',
        name: 'Color Interface Light Pure',
        hex: '#FFFFFF',
        usage: 'Fundo principal, superfícies de cartões',
      },
      {
        token: 'colorInterfaceLightUp',
        name: 'Color Interface Light Up',
        hex: '#F3F5FE',
        usage: 'Fundos secundários, estados hover suaves',
      },
      {
        token: 'colorInterfaceLightDown',
        name: 'Color Interface Light Down',
        hex: '#E0E2EE',
        usage: 'Bordas, divisores, elementos de separação',
      },
      {
        token: 'colorInterfaceLightDeep',
        name: 'Color Interface Light Deep',
        hex: '#CED1E1',
        usage: 'Fundos de destaque, estados selecionados',
      },
    ],
  },
  {
    title: 'Cores de Interface - Escuras',
    description: 'Cores escuras para textos e elementos de destaque',
    colors: [
      {
        token: 'colorInterfaceDarkPure',
        name: 'Color Interface Dark Pure',
        hex: '#0C0014',
        usage: 'Textos principais, elementos de destaque escuro',
      },
      {
        token: 'colorInterfaceDarkUp',
        name: 'Color Interface Dark Up',
        hex: '#AAADC0',
        usage: 'Textos secundários, placeholders',
      },
      {
        token: 'colorInterfaceDarkDown',
        name: 'Color Interface Dark Down',
        hex: '#67697A',
        usage: 'Textos terciários, elementos desabilitados',
      },
      {
        token: 'colorInterfaceDarkDeep',
        name: 'Color Interface Dark Deep',
        hex: '#393847',
        usage: 'Fundos escuros, elementos de destaque',
      },
    ],
  },
  {
    title: 'Cores de Status - Positivas',
    description: 'Cores para comunicar sucessos e confirmações',
    colors: [
      {
        token: 'colorStatusPositivePure',
        name: 'Color Status Positive Pure',
        hex: '#3DCC64',
        usage: 'Sucessos, confirmações, estados ativos',
      },
      {
        token: 'colorStatusPositiveUp',
        name: 'Color Status Positive Up',
        hex: '#F2FDF5',
        usage: 'Fundos de sucesso, notificações positivas',
      },
      {
        token: 'colorStatusPositiveDown',
        name: 'Color Status Positive Down',
        hex: '#7ADC94',
        usage: 'Estados hover, elementos interativos positivos',
      },
      {
        token: 'colorStatusPositiveDeep',
        name: 'Color Status Positive Deep',
        hex: '#20A04F',
        usage: 'Textos de sucesso, elementos de destaque',
      },
    ],
  },
  {
    title: 'Cores de Status - Aviso',
    description: 'Cores para comunicar avisos e estados de atenção',
    colors: [
      {
        token: 'colorStatusWarningPure',
        name: 'Color Status Warning Pure',
        hex: '#FFA347',
        usage: 'Avisos, alertas, estados de atenção',
      },
      {
        token: 'colorStatusWarningUp',
        name: 'Color Status Warning Up',
        hex: '#FFF7F0',
        usage: 'Fundos de aviso, notificações de atenção',
      },
      {
        token: 'colorStatusWarningDown',
        name: 'Color Status Warning Down',
        hex: '#FFBD7A',
        usage: 'Estados hover, elementos interativos de aviso',
      },
      {
        token: 'colorStatusWarningDeep',
        name: 'Color Status Warning Deep',
        hex: '#FFBA14',
        usage: 'Textos de aviso, elementos de destaque',
      },
    ],
  },
  {
    title: 'Cores de Status - Negativas',
    description: 'Cores para comunicar erros e estados críticos',
    colors: [
      {
        token: 'colorStatusNegativePure',
        name: 'Color Status Negative Pure',
        hex: '#F5456C',
        usage: 'Erros, exclusões, estados críticos',
      },
      {
        token: 'colorStatusNegativeUp',
        name: 'Color Status Negative Up',
        hex: '#FFF1F4',
        usage: 'Fundos de erro, notificações negativas',
      },
      {
        token: 'colorStatusNegativeDown',
        name: 'Color Status Negative Down',
        hex: '#F27992',
        usage: 'Estados hover, elementos interativos negativos',
      },
      {
        token: 'colorStatusNegativeDeep',
        name: 'Color Status Negative Deep',
        hex: '#D31441',
        usage: 'Textos de erro, elementos de destaque críticos',
      },
    ],
  },
];

const ColorSwatchComponent: React.FC<{ color: ColorSwatch }> = ({ color }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.hex);
  };

  return (
    <div className={styles.colorSwatch}>
      <div
        className={styles.colorBox}
        style={{ backgroundColor: color.hex }}
        onClick={copyToClipboard}
        title={`Clique para copiar ${color.hex}`}
      />
      <div className={styles.colorInfo}>
        <div className={styles.token}>{color.token}</div>
        <div className={styles.name}>{color.name}</div>
        <div className={styles.hex}>{color.hex}</div>
        <div className={styles.usage}>{color.usage}</div>
      </div>
    </div>
  );
};

const ColorCategoryComponent: React.FC<{ category: ColorCategory }> = ({
  category,
}) => (
  <div className={styles.colorCategory}>
    <h3 className={styles.categoryTitle}>{category.title}</h3>
    <p className={styles.categoryDescription}>{category.description}</p>
    <div className={styles.colorGrid}>
      {category.colors.map((color) => (
        <ColorSwatchComponent key={color.token} color={color} />
      ))}
    </div>
  </div>
);

const ColorPalette: React.FC = () => (
  <div className={styles.colorPalette}>
    {colorData.map((category) => (
      <ColorCategoryComponent key={category.title} category={category} />
    ))}
  </div>
);

export default ColorPalette;
