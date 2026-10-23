import { useCallback, useEffect, useRef, useState } from 'react';

export const DRAWER_STACK_WIDTH = 378;
export const DRAWER_STACK_GAP = 16;
export const DRAWER_STACK_MOBILE_QUERY = '(max-width: 575px)';
/** Three full-width drawers and their four gaps: 3 × 378 + 4 × 16. */
export const DRAWER_STACK_THREE_MIN_WIDTH =
  3 * DRAWER_STACK_WIDTH + 4 * DRAWER_STACK_GAP;

/** How many levels the stack keeps: three on wide screens and on mobile, two otherwise. */
export function drawerStackLimit(
  viewportWidth: number,
  mobile: boolean
): 2 | 3 {
  if (mobile) return 3;
  return viewportWidth >= DRAWER_STACK_THREE_MIN_WIDTH ? 3 : 2;
}

/** Width of each drawer so `count` drawers fit side by side. */
export function drawerStackWidth(
  viewportWidth: number,
  count: 1 | 2 | 3
): number {
  return Math.min(
    DRAWER_STACK_WIDTH,
    Math.floor((viewportWidth - DRAWER_STACK_GAP * (count + 1)) / count)
  );
}

/** Opening a drawer already in the stack is a no-op; at the limit the new one replaces the top. */
export function pushDrawerStack(
  stack: string[],
  id: string,
  limit: number
): string[] {
  if (stack.includes(id)) return stack;
  const capacity = Math.max(1, limit);
  if (stack.length < capacity) return [...stack, id];
  return [...stack.slice(0, capacity - 1), id];
}

/** Closes the drawer and every drawer opened after it. */
export function closeDrawerStack(stack: string[], id: string): string[] {
  const index = stack.indexOf(id);
  return index === -1 ? stack : stack.slice(0, index);
}

/** Goes back to the drawer: closes only the ones opened after it. */
export function focusDrawerStack(stack: string[], id: string): string[] {
  const index = stack.indexOf(id);
  if (index === -1 || index === stack.length - 1) return stack;
  return stack.slice(0, index + 1);
}

/** Fewer fit than are open: the middle level leaves, the first and the top stay. */
export function fitDrawerStack(stack: string[], limit: number): string[] {
  const capacity = Math.max(1, limit);
  if (stack.length <= capacity) return stack;
  return [...stack.slice(0, capacity - 1), stack[stack.length - 1]];
}

/** Dim of a panel by its distance to the top drawer. */
export function drawerStackDim(
  distanceToTop: number
): 'near' | 'far' | undefined {
  if (distanceToTop <= 0) return undefined;
  return distanceToTop === 1 ? 'near' : 'far';
}

export interface DrawerStackItemProps {
  open: boolean;
  depth: number;
  onDrawerClose: () => void;
  overlayClose: () => void;
  hideOverlay: boolean;
  floating?: boolean;
  width?: number;
  offsetX?: number;
  dim?: 'near' | 'far';
  onDimClick?: () => void;
  onBack?: () => void;
}

export interface DrawerStack {
  /** Ids of the open drawers, from the first to the top. */
  stack: string[];
  /** Opens a drawer beside the top one. */
  open: (id: string) => void;
  /** Closes the drawer and the ones opened after it. */
  close: (id: string) => void;
  /** Goes back to the drawer and closes the ones opened after it. */
  focus: (id: string) => void;
  closeAll: () => void;
  /** Props to spread on the `Drawer` with this id. */
  drawerProps: (id: string) => DrawerStackItemProps;
}

export interface UseDrawerStackOptions {
  /** Drawers open on mount, from the first to the top. */
  initial?: string[];
}

const viewport = () => ({
  width: window.innerWidth,
  mobile:
    typeof window.matchMedia === 'function' &&
    window.matchMedia(DRAWER_STACK_MOBILE_QUERY).matches,
});

/**
 * Stack of drawers that open beside each other: up to three side by side on wide screens
 * (two below 1198px), the ones behind dimmed, clicking one behind goes back to it, closing
 * one closes the ones after it, and on mobile only the top shows, with a back arrow.
 */
export default function useDrawerStack({
  initial = [],
}: UseDrawerStackOptions = {}): DrawerStack {
  const [screen, setScreen] = useState(viewport);
  const limit = drawerStackLimit(screen.width, screen.mobile);
  const [stack, setStack] = useState<string[]>(() =>
    fitDrawerStack(initial, limit)
  );
  const lastDepth = useRef<Record<string, number>>({});

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScreen(viewport()));
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setStack((current) => fitDrawerStack(current, limit));
  }, [limit]);

  const open = useCallback(
    (id: string) => setStack((current) => pushDrawerStack(current, id, limit)),
    [limit]
  );
  const close = useCallback(
    (id: string) => setStack((current) => closeDrawerStack(current, id)),
    []
  );
  const focus = useCallback(
    (id: string) => setStack((current) => focusDrawerStack(current, id)),
    []
  );
  const closeAll = useCallback(() => setStack([]), []);

  const total = stack.length;
  const width = drawerStackWidth(
    screen.width,
    Math.min(Math.max(total, 1), 3) as 1 | 2 | 3
  );

  const drawerProps = (id: string): DrawerStackItemProps => {
    const position = stack.indexOf(id);
    if (position !== -1) lastDepth.current[id] = position;
    const depth = lastDepth.current[id] ?? 0;
    const inStack = position !== -1;
    const distance = inStack ? total - 1 - position : 0;
    const base = {
      depth,
      onDrawerClose: () => close(id),
      overlayClose: closeAll,
    };
    if (screen.mobile) {
      return {
        ...base,
        open: inStack && distance === 0,
        hideOverlay: false,
        onBack: depth > 0 ? () => close(id) : undefined,
      };
    }
    return {
      ...base,
      open: inStack,
      hideOverlay: depth > 0,
      floating: true,
      width,
      offsetX: distance * (width + DRAWER_STACK_GAP),
      dim: drawerStackDim(distance),
      onDimClick: () => focus(id),
    };
  };

  return { stack, open, close, focus, closeAll, drawerProps };
}
