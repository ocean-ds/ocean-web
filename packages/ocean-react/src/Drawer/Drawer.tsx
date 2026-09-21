import React, {
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { ArrowLeftOutline, XOutline } from '@useblu/ocean-icons-react';
import Button from '../Button/Button';

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onDrawerClose?(event: React.MouseEvent | React.KeyboardEvent): void;
  overlayClose: (event?: MouseEvent<HTMLDivElement>) => void;
  headerIcon?: React.ReactNode;
  align?: 'right' | 'left';
  iconAlignment?: 'right' | 'left';
  anchorEl?: RefObject<HTMLDivElement> | null;
  onMouseOutDrawer?: (event?: MouseEvent<HTMLDivElement>) => void;
  size?: 'small' | 'large';
  /**
   * Drawer flutuante: margem das bordas, cantos arredondados, motion Gentle e
   * scrim que só esmaece depois que o painel cruza a borda. Abaixo de 576px o
   * painel ocupa a tela inteira. É o padrão; `floating={false}` volta ao painel
   * colado na borda. Drawers ancoradas (`anchorEl`) nunca flutuam.
   */
  floating?: boolean;
  /** Deslocamento horizontal extra, em px, aplicado ao `translateX` quando aberta. */
  offsetX?: number;
  /** Posição na pilha (0 = primeira, 1 = segunda). Define o `z-index` relativo. */
  depth?: number;
  /** Largura em px que substitui a de `size` (pilha em viewport estreito). */
  width?: number;
  /**
   * Não renderiza o scrim próprio — quem empilha fornece um único scrim e trata
   * o clique fora; o overlay fica transparente e não intercepta o ponteiro.
   */
  hideOverlay?: boolean;
  /** Ação "voltar" no cabeçalho (drawer mobile): troca o X pela seta e alinha à esquerda. */
  onBack?: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

const Drawer = ({
  children,
  open,
  onDrawerClose,
  overlayClose,
  align = 'right',
  headerIcon = <XOutline />,
  iconAlignment = 'right',
  anchorEl,
  onMouseOutDrawer,
  size = 'small',
  floating: floatingProp,
  offsetX,
  depth,
  width,
  hideOverlay = false,
  onBack,
}: DrawerProps): React.ReactElement => {
  const floating = floatingProp ?? !anchorEl;
  const drawerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(!floating);

  /*
   * Modo flutuante: uma Drawer montada já com `open` nasce fechada por um
   * ciclo de estilo e só então abre, para a transição de `transform`
   * deslizar da borda em vez de aparecer pronta.
   */
  useLayoutEffect(() => {
    if (!floating || entered === open) return;
    if (open) panelRef.current?.getBoundingClientRect();
    setEntered(open);
  }, [floating, open, entered]);

  const visuallyOpen = floating ? entered : open;
  const handleOverlayClose = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      event.preventDefault();
      overlayClose(event);
    }
  };

  const getAnchorPosition = useCallback(() => {
    if (!anchorEl?.current) return null;

    const position = anchorEl.current.getBoundingClientRect();

    if (align === 'right') {
      const positionSize = window.innerWidth - position.left;

      return {
        width: `${positionSize}px`,
        right: `${positionSize}px`,
        left: 'auto',
      };
    }

    return {
      width: `${position.right}px`,
      right: 'auto',
      left: `${position.right}px`,
    };
  }, [align, anchorEl]);

  const attachDrawer = useCallback(() => {
    const position = getAnchorPosition();

    if (!drawerRef.current || !position) return;

    drawerRef.current.style.width = `calc(100% - ${position?.width}px)})`;
    drawerRef.current.style.left = position.left;
    drawerRef.current.style.right = position.right;
  }, [getAnchorPosition]);

  useEffect(() => {
    attachDrawer();
  }, [anchorEl, drawerRef, attachDrawer]);

  const overlayStyle: React.CSSProperties | undefined =
    depth !== undefined ? { zIndex: 200 + depth } : undefined;
  const drawerStyle: React.CSSProperties | undefined =
    depth !== undefined || width !== undefined || offsetX !== undefined
      ? ({
          ...(depth !== undefined && { zIndex: 400 + depth }),
          ...(width !== undefined && { width: `${width}px` }),
          ...(offsetX !== undefined && {
            '--ods-drawer-offset-x': `${offsetX}px`,
          }),
        } as React.CSSProperties)
      : undefined;
  const headerAlignment = onBack ? 'left' : iconAlignment;

  return (
    <div
      className={classNames(
        'ods-overlay',
        visuallyOpen && 'ods-overlay--open',
        floating && 'ods-overlay--floating',
        hideOverlay && 'ods-overlay--transparent'
      )}
      aria-hidden="true"
      onClick={handleOverlayClose}
      ref={drawerRef}
      style={overlayStyle}
      data-testid="drawer-overlay"
    >
      <div
        className={classNames(
          'ods-drawer',
          visuallyOpen && 'ods-drawer--open',
          `ods-drawer--${align}`,
          `ods-drawer--${size}`,
          floating && 'ods-drawer--floating'
        )}
        style={drawerStyle}
        ref={panelRef}
        onMouseLeave={onMouseOutDrawer}
      >
        <div
          className={classNames(
            'ods-drawer__content--header',
            `ods-drawer__content--header--${headerAlignment}`
          )}
        >
          <Button
            type="button"
            onClick={onBack ?? onDrawerClose}
            aria-label={onBack ? 'Voltar' : undefined}
          >
            {onBack ? <ArrowLeftOutline /> : headerIcon}
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
