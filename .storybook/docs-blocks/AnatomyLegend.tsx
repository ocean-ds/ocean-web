import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';

export type AnatomyPart = {
  /** Seletor CSS da parte dentro do exemplo (o marcador vai no canto superior esquerdo). */
  selector: string;
  label: ReactNode;
  prop?: ReactNode;
};

/**
 * Anatomia: exemplo vivo com marcadores numerados sobre cada parte + legenda.
 * As posições vêm do DOM renderizado, então seguem o componente real.
 */
export const AnatomyLegend = ({
  example,
  parts,
  width = 360,
}: {
  example: ReactNode;
  parts: AnatomyPart[];
  width?: number;
}): React.ReactElement => {
  const stage = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<({ x: number; y: number } | null)[]>([]);

  useLayoutEffect(() => {
    const root = stage.current;
    if (!root) return;
    const box = root.getBoundingClientRect();
    setPoints(
      parts.map(({ selector }) => {
        const el = root.querySelector(selector);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        // Marcador logo acima e à esquerda da parte, para não cobrir o texto.
        return { x: rect.left - box.left - 8, y: rect.top - box.top - 8 };
      })
    );
  }, [parts]);

  return (
    <div className="odoc__anatomy">
      <div className="odoc__anatomy-stage" ref={stage}>
        <div style={{ width }}>{example}</div>
        {points.map(
          (point, index) =>
            point && (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="odoc__anatomy-marker"
                style={{ left: point.x, top: point.y }}
              >
                {index + 1}
              </span>
            )
        )}
      </div>
      <ol className="odoc__anatomy-legend">
        {parts.map((part, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <span className="odoc__anatomy-number">{index + 1}</span>
            <span>
              {part.label}
              {part.prop && <> — {part.prop}</>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
