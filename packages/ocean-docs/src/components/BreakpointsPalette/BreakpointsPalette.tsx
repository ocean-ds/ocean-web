import React from 'react';
import styles from './BreakpointsPalette.module.css';

interface Breakpoint {
  name: string;
  minWidth: string;
  container: string;
  columns: number;
  colSize: string;
  margin: string;
  gutter: string;
  description: string;
}

const breakpointsData: Breakpoint[] = [
  {
    name: 'X-Small',
    minWidth: '320px',
    container: '100%',
    columns: 4,
    colSize: 'Auto',
    margin: '16px',
    gutter: '16px',
    description: 'Dispositivos móveis pequenos',
  },
  {
    name: 'Small',
    minWidth: '576px',
    container: '100%',
    columns: 4,
    colSize: 'Auto',
    margin: '16px',
    gutter: '16px',
    description: 'Dispositivos móveis modernos',
  },
  {
    name: 'Medium',
    minWidth: '768px',
    container: '100%',
    columns: 8,
    colSize: 'Auto',
    margin: '16px',
    gutter: '16px',
    description: 'Tablets pequenos',
  },
  {
    name: 'Large',
    minWidth: '992px',
    container: '100%',
    columns: 8,
    colSize: 'Auto',
    margin: '16px',
    gutter: '16px',
    description: 'Tablets grandes',
  },
  {
    name: 'X-Large',
    minWidth: '1200px',
    container: '1076px',
    columns: 12,
    colSize: '75px',
    margin: 'Auto',
    gutter: '16px',
    description: 'Desktops pequenos',
  },
  {
    name: 'XX-Large',
    minWidth: '1400px',
    container: '1076px',
    columns: 12,
    colSize: '75px',
    margin: 'Auto',
    gutter: '16px',
    description: 'Desktops grandes',
  },
];

const BreakpointsPalette: React.FC = () => {
  return (
    <div className={styles.breakpointsPalette}>
      <div className={styles.breakpointsGrid}>
        {breakpointsData.map((breakpoint) => (
          <div key={breakpoint.name} className={styles.breakpointCard}>
            <div className={styles.breakpointHeader}>
              <h3 className={styles.breakpointName}>{breakpoint.name}</h3>
              <div className={styles.breakpointWidth}>
                {breakpoint.minWidth}
              </div>
            </div>

            <div className={styles.breakpointPreview}>
              <div className={styles.containerPreview}>
                <div className={styles.containerLabel}>Container</div>
                <div className={styles.containerValue}>
                  {breakpoint.container}
                </div>
              </div>

              <div className={styles.gridPreview}>
                <div className={styles.gridLabel}>Grid</div>
                <div className={styles.gridVisual}>
                  {Array.from({ length: breakpoint.columns }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className={styles.gridColumn}
                        style={{
                          width:
                            breakpoint.colSize === 'Auto' ? 'auto' : '12px',
                          minWidth:
                            breakpoint.colSize === 'Auto' ? '12px' : '12px',
                        }}
                      />
                    )
                  )}
                </div>
                <div className={styles.gridInfo}>
                  <span>{breakpoint.columns} colunas</span>
                  <span>•</span>
                  <span>{breakpoint.colSize}</span>
                </div>
              </div>

              <div className={styles.spacingInfo}>
                <div className={styles.spacingItem}>
                  <span className={styles.spacingLabel}>Margem:</span>
                  <span className={styles.spacingValue}>
                    {breakpoint.margin}
                  </span>
                </div>
                <div className={styles.spacingItem}>
                  <span className={styles.spacingLabel}>Gutter:</span>
                  <span className={styles.spacingValue}>
                    {breakpoint.gutter}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.breakpointDescription}>
              {breakpoint.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakpointsPalette;
