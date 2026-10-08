import React, { ReactNode } from 'react';

const labels = { do: 'Faça', dont: 'Não faça', caution: 'Cuidado' };

/** Cartão Faça / Não faça / Cuidado com exemplo vivo e uma frase. */
export const DoDont = ({
  kind,
  caption,
  children,
  background,
}: {
  kind: 'do' | 'dont' | 'caution';
  caption: ReactNode;
  children: ReactNode;
  background?: string;
}): React.ReactElement => (
  <figure className="odoc__card" style={{ margin: 0 }}>
    <div className="odoc__card-example" style={{ background }}>
      <div style={{ width: 360, maxWidth: '100%' }}>{children}</div>
    </div>
    <figcaption>
      <div className={`odoc__card-label odoc__card-label--${kind}`}>
        {labels[kind]}
      </div>
      <p className="odoc__card-caption">{caption}</p>
    </figcaption>
  </figure>
);

export const DoDontGrid = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => <div className="odoc__dodont">{children}</div>;
