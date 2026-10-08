import React, { ReactNode, useState } from 'react';
import { Source } from '@storybook/blocks';

/** Barra "Mostrar código · Copiar" de um exemplo vivo. */
export const CodeToggle = ({ code }: { code: string }): React.ReactElement => {
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard
      ?.writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => undefined);
  };

  return (
    <div className="odoc__code">
      <div className="odoc__code-bar">
        <button
          type="button"
          className="odoc__code-button"
          aria-expanded={shown}
          onClick={() => setShown(!shown)}
        >
          {shown ? 'Esconder código' : 'Mostrar código'}
        </button>
        <button type="button" className="odoc__code-button" onClick={copy}>
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      {shown && <Source language="tsx" dark code={code} />}
    </div>
  );
};

/**
 * Moldura padrão de exemplo vivo: largura toda do conteúdo, componente centralizado na
 * horizontal e na vertical, respiro generoso em cima e embaixo. Com `code`, ganha a barra
 * "Mostrar código · Copiar".
 */
export const PreviewCanvas = ({
  children,
  background,
  width = 360,
  compact = false,
  code,
}: {
  children: ReactNode;
  background?: string;
  /** Largura do exemplo; `auto` para matrizes (rolagem horizontal se não couber). */
  width?: number | 'auto';
  compact?: boolean;
  code?: string;
}): React.ReactElement => (
  <div className={`odoc__preview${compact ? ' odoc__preview--compact' : ''}`}>
    <div className="odoc__canvas" style={{ background }}>
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
    {code && <CodeToggle code={code} />}
  </div>
);
