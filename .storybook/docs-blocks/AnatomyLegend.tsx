import React, {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export type AnatomySide = 'left' | 'right' | 'top' | 'bottom';

export type AnatomyPart = {
  /** Seletor CSS da parte dentro do exemplo. */
  selector: string;
  label: ReactNode;
  prop?: ReactNode;
  /** Lado da calha em que fica o marcador (a linha sai dele até a parte). */
  side: AnatomySide;
  /**
   * Ponto de chegada ao longo da parte, de 0 a 1 (vertical em left/right, horizontal em
   * top/bottom). Padrão 0.5 (meio).
   */
  anchor?: number;
};

type Callout = {
  marker: { x: number; y: number };
  target: { x: number; y: number };
};

const GUTTER = 64; // espaço das calhas (Spacing/Xxl)
const MIN_GAP = 32; // distância mínima entre marcadores no mesmo lado

/** Afasta marcadores do mesmo lado para não se sobreporem, mantendo a ordem. */
const spread = (values: number[]): number[] => {
  const order = values.map((value, index) => ({ value, index }));
  order.sort((a, b) => a.value - b.value);
  const result = [...values];
  let last = -Infinity;
  order.forEach(({ value, index }) => {
    const next = Math.max(value, last + MIN_GAP);
    result[index] = next;
    last = next;
  });
  return result;
};

/**
 * Anatomia com chamadas: o exemplo vivo fica no centro, os marcadores numerados nas calhas
 * em volta (fora do componente) e uma linha fina liga cada marcador à parte. As posições
 * vêm do DOM renderizado, então seguem o componente real; cada parte diz o lado e o ponto
 * de chegada. A legenda numerada fica à direita.
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
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [callouts, setCallouts] = useState<(Callout | null)[]>([]);

  const measure = useCallback(() => {
    const root = stage.current;
    if (!root) return;
    const box = root.getBoundingClientRect();
    const raw = parts.map((part) => {
      const el = root.querySelector(part.selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const anchor = part.anchor ?? 0.5;
      const left = r.left - box.left;
      const top = r.top - box.top;
      switch (part.side) {
        case 'left':
          return {
            marker: { x: GUTTER / 2, y: top + r.height * anchor },
            target: { x: left, y: top + r.height * anchor },
          };
        case 'right':
          return {
            marker: { x: box.width - GUTTER / 2, y: top + r.height * anchor },
            target: { x: left + r.width, y: top + r.height * anchor },
          };
        case 'top':
          return {
            marker: { x: left + r.width * anchor, y: GUTTER / 2 },
            target: { x: left + r.width * anchor, y: top },
          };
        default:
          return {
            marker: { x: left + r.width * anchor, y: box.height - GUTTER / 2 },
            target: { x: left + r.width * anchor, y: top + r.height },
          };
      }
    });

    // Espaça marcadores do mesmo lado (eixo vertical em left/right, horizontal em top/bottom).
    (['left', 'right', 'top', 'bottom'] as AnatomySide[]).forEach((side) => {
      const indexes = parts
        .map((part, index) => (part.side === side && raw[index] ? index : -1))
        .filter((index) => index >= 0);
      const vertical = side === 'left' || side === 'right';
      const spaced = spread(
        indexes.map((index) =>
          vertical
            ? (raw[index] as Callout).marker.y
            : (raw[index] as Callout).marker.x
        )
      );
      indexes.forEach((index, i) => {
        const callout = raw[index] as Callout;
        if (vertical) callout.marker.y = spaced[i];
        else callout.marker.x = spaced[i];
      });
    });

    setSize({ w: box.width, h: box.height });
    setCallouts(raw);
  }, [parts]);

  useLayoutEffect(() => {
    measure();
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(measure)
        : null;
    if (observer && stage.current) observer.observe(stage.current);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => observer?.disconnect();
  }, [measure]);

  return (
    <div className="odoc__anatomy">
      <div
        className="odoc__anatomy-stage"
        ref={stage}
        style={{ padding: GUTTER }}
      >
        <div style={{ width }}>{example}</div>
        <svg
          className="odoc__anatomy-lines"
          width={size.w}
          height={size.h}
          aria-hidden
        >
          {callouts.map(
            (callout, index) =>
              callout && (
                // eslint-disable-next-line react/no-array-index-key
                <g key={index}>
                  <path
                    d={`M ${callout.marker.x} ${callout.marker.y} L ${callout.target.x} ${callout.target.y}`}
                  />
                  <circle cx={callout.target.x} cy={callout.target.y} r={3} />
                </g>
              )
          )}
        </svg>
        {callouts.map(
          (callout, index) =>
            callout && (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="odoc__anatomy-marker"
                style={{ left: callout.marker.x, top: callout.marker.y }}
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
