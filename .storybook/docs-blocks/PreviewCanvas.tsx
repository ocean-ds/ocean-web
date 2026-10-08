import React, { ReactNode } from 'react';

/**
 * Moldura padrão de exemplo vivo: largura toda do conteúdo, componente centralizado na
 * horizontal e na vertical, respiro generoso em cima e embaixo.
 */
// eslint-disable-next-line import/prefer-default-export
export const PreviewCanvas = ({
  children,
  background,
  width = 360,
  compact = false,
}: {
  children: ReactNode;
  background?: string;
  /** Largura do exemplo; `auto` para matrizes (rolagem horizontal se não couber). */
  width?: number | 'auto';
  compact?: boolean;
}): React.ReactElement => (
  <div
    className={`odoc__canvas${compact ? ' odoc__canvas--compact' : ''}`}
    style={{ background }}
  >
    <div
      style={
        width === 'auto'
          ? { maxWidth: '100%', overflowX: 'auto' }
          : { width, maxWidth: '100%' }
      }
    >
      {children}
    </div>
  </div>
);
