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

// Função auxiliar para criar cores com padrão consistente
const createColorSet = (
  baseName: string,
  displayName: string,
  colors: { [key: string]: { hex: string; usage: string } }
): ColorSwatch[] =>
  Object.entries(colors).map(([variant, { hex, usage }]) => ({
    token: `${baseName}${variant}`,
    name: `${displayName} ${variant}`,
    hex,
    usage,
  }));

// Função auxiliar para criar categoria de cores
const createColorCategory = (
  title: string,
  description: string,
  colorSet: ColorSwatch[]
): ColorCategory => ({
  title,
  description,
  colors: colorSet,
});

// Definição das cores organizadas por categoria
const colorDefinitions = {
  brand: {
    title: 'Cores da Marca',
    description: 'Cores principais da identidade visual do Ocean',
    colors: {
      Pure: {
        hex: '#0025E0',
        usage: 'Cor principal da marca, CTAs principais',
      },
      Up: { hex: '#B8C3FF', usage: 'Fundos sutis, estados hover suaves' },
      Down: { hex: '#5872F5', usage: 'Estados ativos, elementos secundários' },
      Deep: {
        hex: '#0E248F',
        usage: 'Textos importantes, elementos de destaque escuro',
      },
    },
  },
  complementary: {
    title: 'Cores Complementares',
    description: 'Cores que oferecem contraste e variedade visual',
    colors: {
      Pure: {
        hex: '#13BDBD',
        usage: 'Elementos de destaque secundários, ícones informativos',
      },
      Up: { hex: '#B0F5F5', usage: 'Fundos de destaque suaves, estados hover' },
      Down: { hex: '#6AE5E5', usage: 'Estados ativos, elementos interativos' },
      Deep: {
        hex: '#1C9999',
        usage: 'Textos importantes, elementos de destaque',
      },
    },
  },
  highlight: {
    title: 'Cores de Destaque',
    description: 'Cores para chamar atenção e indicar ações importantes',
    colors: {
      Pure: {
        hex: '#FF726E',
        usage: 'Alertas, notificações, elementos que precisam de atenção',
      },
      Up: { hex: '#FFB8B2', usage: 'Fundos de alerta suaves, estados hover' },
      Down: { hex: '#F0584D', usage: 'Estados ativos, elementos de erro' },
      Deep: {
        hex: '#E53E32',
        usage: 'Textos de erro críticos, elementos de destaque escuro',
      },
    },
  },
  interfaceLight: {
    title: 'Cores de Interface - Claras',
    description: 'Cores claras para layouts e elementos de UI',
    colors: {
      Pure: {
        hex: '#FFFFFF',
        usage: 'Fundo principal, superfícies de cartões',
      },
      Up: { hex: '#F3F5FE', usage: 'Fundos secundários, estados hover suaves' },
      Down: {
        hex: '#E0E2EE',
        usage: 'Bordas, divisores, elementos de separação',
      },
      Deep: {
        hex: '#CED1E1',
        usage: 'Fundos de destaque, estados selecionados',
      },
    },
  },
  interfaceDark: {
    title: 'Cores de Interface - Escuras',
    description: 'Cores escuras para textos e elementos de destaque',
    colors: {
      Pure: {
        hex: '#0C0014',
        usage: 'Textos principais, elementos de destaque escuro',
      },
      Up: { hex: '#AAADC0', usage: 'Textos secundários, placeholders' },
      Down: {
        hex: '#67697A',
        usage: 'Textos terciários, elementos desabilitados',
      },
      Deep: { hex: '#393847', usage: 'Fundos escuros, elementos de destaque' },
    },
  },
  statusPositive: {
    title: 'Cores de Status - Positivas',
    description: 'Cores para comunicar sucessos e confirmações',
    colors: {
      Pure: { hex: '#3DCC64', usage: 'Sucessos, confirmações, estados ativos' },
      Up: {
        hex: '#F2FDF5',
        usage: 'Fundos de sucesso, notificações positivas',
      },
      Down: {
        hex: '#7ADC94',
        usage: 'Estados hover, elementos interativos positivos',
      },
      Deep: {
        hex: '#20A04F',
        usage: 'Textos de sucesso, elementos de destaque',
      },
    },
  },
  statusWarning: {
    title: 'Cores de Status - Aviso',
    description: 'Cores para comunicar avisos e estados de atenção',
    colors: {
      Pure: { hex: '#FFA347', usage: 'Avisos, alertas, estados de atenção' },
      Up: { hex: '#FFF7F0', usage: 'Fundos de aviso, notificações de atenção' },
      Down: {
        hex: '#FFBD7A',
        usage: 'Estados hover, elementos interativos de aviso',
      },
      Deep: { hex: '#FFBA14', usage: 'Textos de aviso, elementos de destaque' },
    },
  },
  statusNegative: {
    title: 'Cores de Status - Negativas',
    description: 'Cores para comunicar erros e estados críticos',
    colors: {
      Pure: { hex: '#F5456C', usage: 'Erros, exclusões, estados críticos' },
      Up: { hex: '#FFF1F4', usage: 'Fundos de erro, notificações negativas' },
      Down: {
        hex: '#F27992',
        usage: 'Estados hover, elementos interativos negativos',
      },
      Deep: {
        hex: '#D31441',
        usage: 'Textos de erro, elementos de destaque críticos',
      },
    },
  },
};

// Mapeamento de nomes de exibição
const displayNames = {
  brand: 'Color Brand Primary',
  complementary: 'Color Complementary',
  highlight: 'Color Highlight',
  interfaceLight: 'Color Interface Light',
  interfaceDark: 'Color Interface Dark',
  statusPositive: 'Color Status Positive',
  statusWarning: 'Color Status Warning',
  statusNegative: 'Color Status Negative',
};

// Geração do array de dados de cores
const colorData: ColorCategory[] = Object.entries(colorDefinitions).map(
  ([key, { title, description, colors }]) =>
    createColorCategory(
      title,
      description,
      createColorSet(
        key,
        displayNames[key as keyof typeof displayNames],
        colors
      )
    )
);

const ColorSwatchComponent: React.FC<{ color: ColorSwatch }> = ({ color }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.hex);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      copyToClipboard();
    }
  };

  return (
    <div className={styles.colorSwatch}>
      <div
        className={styles.colorBox}
        style={{ backgroundColor: color.hex }}
        onClick={copyToClipboard}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        title={`Clique para copiar ${color.hex}`}
        aria-label={`Copiar cor ${color.hex} para a área de transferência`}
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
