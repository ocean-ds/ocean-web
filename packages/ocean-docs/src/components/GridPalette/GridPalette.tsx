import React from 'react';
import styles from './GridPalette.module.css';

interface GridExample {
  name: string;
  description: string;
  columns: number;
  colSize: string;
  gap: string;
  container: string;
  example: React.ReactNode;
}

const GridPalette: React.FC = () => {
  const gridExamples: GridExample[] = [
    {
      name: 'Grid 4 Colunas (Mobile)',
      description: 'Grid básico para dispositivos móveis - X-Small e Small',
      columns: 4,
      colSize: 'Auto',
      gap: '16px',
      container: '100%',
      example: (
        <div
          className={styles.gridExample}
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.gridItem}>
              <span className={styles.itemText}>{index + 1}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: 'Grid 8 Colunas (Tablet)',
      description: 'Grid para tablets e telas médias - Medium e Large',
      columns: 8,
      colSize: 'Auto',
      gap: '16px',
      container: '100%',
      example: (
        <div
          className={styles.gridExample}
          style={{ gridTemplateColumns: 'repeat(8, 1fr)', gap: '16px' }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={styles.gridItem}>
              <span className={styles.itemText}>{index + 1}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: 'Grid 12 Colunas (Desktop)',
      description: 'Grid para desktops e telas grandes - X-Large e XX-Large',
      columns: 12,
      colSize: '75px',
      gap: '16px',
      container: '1076px',
      example: (
        <div
          className={styles.gridExample}
          style={{
            gridTemplateColumns: 'repeat(12, 60px)',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className={styles.gridItem}>
              <span className={styles.itemText}>{index + 1}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: 'Grid com Span (Layout Complexo)',
      description:
        'Exemplo de colunas com diferentes spans para layouts flexíveis',
      columns: 12,
      colSize: '75px',
      gap: '16px',
      container: '1076px',
      example: (
        <div
          className={styles.gridExample}
          style={{
            gridTemplateColumns: 'repeat(12, 60px)',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          <div
            className={styles.gridItem}
            style={{ gridColumn: 'span 6', backgroundColor: '#28a745' }}
          >
            <span className={styles.itemText}>Span 6</span>
          </div>
          <div
            className={styles.gridItem}
            style={{ gridColumn: 'span 3', backgroundColor: '#ffc107' }}
          >
            <span className={styles.itemText}>Span 3</span>
          </div>
          <div
            className={styles.gridItem}
            style={{ gridColumn: 'span 3', backgroundColor: '#ffc107' }}
          >
            <span className={styles.itemText}>Span 3</span>
          </div>
          <div
            className={styles.gridItem}
            style={{ gridColumn: 'span 4', backgroundColor: '#17a2b8' }}
          >
            <span className={styles.itemText}>Span 4</span>
          </div>
          <div
            className={styles.gridItem}
            style={{ gridColumn: 'span 4', backgroundColor: '#17a2b8' }}
          >
            <span className={styles.itemText}>Span 4</span>
          </div>
          <div
            className={styles.gridItem}
            style={{ gridColumn: 'span 4', backgroundColor: '#17a2b8' }}
          >
            <span className={styles.itemText}>Span 4</span>
          </div>
        </div>
      ),
    },
    {
      name: 'Grid Responsivo (Auto-fit)',
      description: 'Grid que se adapta automaticamente aos breakpoints',
      columns: 12,
      colSize: 'Auto',
      gap: '16px',
      container: '100%',
      example: (
        <div className={styles.responsiveGrid}>
          <div className={styles.responsiveItem}>
            <span className={styles.itemText}>Responsivo</span>
          </div>
          <div className={styles.responsiveItem}>
            <span className={styles.itemText}>Grid</span>
          </div>
          <div className={styles.responsiveItem}>
            <span className={styles.itemText}>System</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.gridPalette}>
      <h3 className={styles.paletteTitle}>Sistema de Grid</h3>

      {gridExamples.map((example, index) => (
        <div key={index} className={styles.gridExampleCard}>
          <div className={styles.exampleHeader}>
            <h4 className={styles.exampleName}>{example.name}</h4>
            <p className={styles.exampleDescription}>{example.description}</p>
          </div>

          <div className={styles.exampleSpecs}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Colunas:</span>
              <span className={styles.specValue}>{example.columns}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Tamanho:</span>
              <span className={styles.specValue}>{example.colSize}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Gap:</span>
              <span className={styles.specValue}>{example.gap}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Container:</span>
              <span className={styles.specValue}>{example.container}</span>
            </div>
          </div>

          <div className={styles.exampleVisual}>{example.example}</div>
        </div>
      ))}
    </div>
  );
};

export default GridPalette;
