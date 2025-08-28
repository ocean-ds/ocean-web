import React from 'react';
import styles from './SpacingPalette.module.css';

interface SpacingStack {
  token: string;
  name: string;
  value: string;
  usage: string;
}

interface SpacingInset {
  token: string;
  name: string;
  value: string;
  usage: string;
}

interface SpacingSquish {
  token: string;
  name: string;
  value: string;
  usage: string;
}

interface SpacingData {
  spacingStack: SpacingStack[];
  spacingInset: SpacingInset[];
  spacingSquish: SpacingSquish[];
}

const spacingData: SpacingData = {
  spacingStack: [
    {
      token: 'spacingStackXxxs',
      name: 'XXXS',
      value: '4px',
      usage: 'Espaçamento mínimo entre elementos muito próximos',
    },
    {
      token: 'spacingStackXxs',
      name: 'XXS',
      value: '8px',
      usage: 'Espaçamento pequeno entre elementos compactos',
    },
    {
      token: 'spacingStackXxsExtra',
      name: 'XXS Extra',
      value: '12px',
      usage: 'Espaçamento intermediário entre elementos pequenos',
    },
    {
      token: 'spacingStackXs',
      name: 'XS',
      value: '16px',
      usage: 'Espaçamento padrão entre elementos de conteúdo',
    },
    {
      token: 'spacingStackSm',
      name: 'SM',
      value: '24px',
      usage: 'Espaçamento entre seções pequenas',
    },
    {
      token: 'spacingStackMd',
      name: 'MD',
      value: '32px',
      usage: 'Espaçamento padrão entre seções principais',
    },
    {
      token: 'spacingStackLg',
      name: 'LG',
      value: '40px',
      usage: 'Espaçamento entre seções grandes',
    },
    {
      token: 'spacingStackXl',
      name: 'XL',
      value: '48px',
      usage: 'Espaçamento entre componentes principais',
    },
    {
      token: 'spacingStackXxl',
      name: 'XXL',
      value: '64px',
      usage: 'Espaçamento entre seções muito grandes',
    },
    {
      token: 'spacingStackXxxl',
      name: 'XXXL',
      value: '80px',
      usage: 'Espaçamento máximo entre seções principais',
    },
  ],
  spacingInset: [
    {
      token: 'spacingInsetXxs',
      name: 'XXS',
      value: '4px',
      usage: 'Preenchimento mínimo para elementos muito compactos',
    },
    {
      token: 'spacingInsetXs',
      name: 'XS',
      value: '8px',
      usage: 'Preenchimento pequeno para elementos compactos',
    },
    {
      token: 'spacingInsetSm',
      name: 'SM',
      value: '16px',
      usage: 'Preenchimento padrão para elementos de conteúdo',
    },
    {
      token: 'spacingInsetMd',
      name: 'MD',
      value: '24px',
      usage: 'Preenchimento confortável para cartões e containers',
    },
    {
      token: 'spacingInsetLg',
      name: 'LG',
      value: '32px',
      usage: 'Preenchimento generoso para seções importantes',
    },
    {
      token: 'spacingInsetXl',
      name: 'XL',
      value: '40px',
      usage: 'Preenchimento máximo para containers principais',
    },
  ],
  spacingSquish: [
    {
      token: 'spacingSquishXs',
      name: 'XS',
      value: '4px 8px',
      usage: 'Preenchimento compacto para botões pequenos',
    },
    {
      token: 'spacingSquishSm',
      name: 'SM',
      value: '8px 16px',
      usage: 'Preenchimento padrão para botões e inputs',
    },
    {
      token: 'spacingSquishMd',
      name: 'MD',
      value: '16px 24px',
      usage: 'Preenchimento confortável para elementos interativos',
    },
    {
      token: 'spacingSquishLg',
      name: 'LG',
      value: '16px 32px',
      usage: 'Preenchimento generoso para CTAs e botões grandes',
    },
  ],
};

const SpacingStackComponent: React.FC = () => {
  const { spacingStack } = spacingData;

  return (
    <div className={styles.spacingCategory}>
      <h3 className={styles.categoryTitle}>Spacing Stack</h3>
      <div className={styles.spacingStackGrid}>
        {spacingStack.map((stack) => (
          <div key={stack.token} className={styles.spacingStackItem}>
            <div className={styles.spacingStackPreview}>
              <div className={styles.spacingStackVisual}>
                <div className={styles.spacingStackTop} />
                <div
                  className={styles.spacingStackGap}
                  style={{ height: stack.value }}
                />
                <div className={styles.spacingStackBottom} />
              </div>
            </div>
            <div className={styles.spacingStackInfo}>
              <div className={styles.token}>{stack.token}</div>
              <div className={styles.name}>{stack.name}</div>
              <div className={styles.value}>{stack.value}</div>
              <div className={styles.usage}>{stack.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SpacingInsetComponent: React.FC = () => {
  const { spacingInset } = spacingData;

  return (
    <div className={styles.spacingCategory}>
      <h3 className={styles.categoryTitle}>Spacing Inset</h3>
      <div className={styles.spacingInsetGrid}>
        {spacingInset.map((inset) => (
          <div key={inset.token} className={styles.spacingInsetItem}>
            <div className={styles.spacingInsetPreview}>
              <div
                className={styles.spacingInsetVisual}
                style={{ padding: inset.value }}
              >
                <div className={styles.spacingInsetContent}>{inset.value}</div>
              </div>
            </div>
            <div className={styles.spacingInsetInfo}>
              <div className={styles.token}>{inset.token}</div>
              <div className={styles.name}>{inset.name}</div>
              <div className={styles.value}>{inset.value}</div>
              <div className={styles.usage}>{inset.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SpacingSquishComponent: React.FC = () => {
  const { spacingSquish } = spacingData;

  return (
    <div className={styles.spacingCategory}>
      <h3 className={styles.categoryTitle}>Spacing Squish</h3>
      <div className={styles.spacingSquishGrid}>
        {spacingSquish.map((squish) => (
          <div key={squish.token} className={styles.spacingSquishItem}>
            <div className={styles.spacingSquishPreview}>
              <div
                className={styles.spacingSquishVisual}
                style={{
                  padding: squish.value,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div className={styles.spacingSquishContent}>
                  {squish.value}
                </div>
              </div>
            </div>
            <div className={styles.spacingSquishInfo}>
              <div className={styles.token}>{squish.token}</div>
              <div className={styles.name}>{squish.name}</div>
              <div className={styles.value}>{squish.value}</div>
              <div className={styles.usage}>{squish.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SpacingPalette: React.FC = () => (
  <div className={styles.spacingPalette}>
    <SpacingStackComponent />
    <SpacingInsetComponent />
    <SpacingSquishComponent />
  </div>
);

export default SpacingPalette;
