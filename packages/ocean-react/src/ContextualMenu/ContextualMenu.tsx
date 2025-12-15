import React from 'react';
import classNames from 'classnames';
import { X } from '@useblu/ocean-icons-react';
import ContextualMenuItem, {
  ContextualMenuItemProps,
} from './ContextualMenuItem';
import IconButton from '../IconButton';

export interface ContextualMenuProps {
  /**
   * Array de itens do menu contextual
   */
  items: Omit<ContextualMenuItemProps, 'onClick'>[];
  /**
   * Define se o menu está aberto ou fechado (componente controlado)
   */
  open: boolean;
  /**
   * Callback chamado quando o estado open muda
   * @param open - Novo estado de abertura do menu
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Callback chamado ao selecionar um item do menu
   * @param value - O valor do item selecionado
   */
  onSelect?: (value: string) => void;
  /**
   * Valor do item atualmente selecionado
   */
  selectedValue?: string;
  /**
   * Classes CSS adicionais para customização
   */
  className?: string;
}

export const ContextualMenu = ({
  items,
  open,
  onOpenChange,
  onSelect,
  selectedValue,
  className,
}: ContextualMenuProps): React.ReactElement => {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <>
      <div
        className={classNames('ods-contextual-menu__overlay', {
          'ods-contextual-menu__overlay--after-open': open,
          'ods-contextual-menu__overlay--before-close': !open,
        })}
        onClick={handleClose}
        aria-hidden="true"
        data-testid="contextual-menu-overlay"
      />

      <ul
        className={classNames('ods-contextual-menu', className, {
          'ods-contextual-menu--after-open': open,
          'ods-contextual-menu--before-close': !open,
        })}
      >
        <li className="ods-contextual-menu__header">
          <IconButton size="sm" onClick={handleClose} aria-label="Fechar menu">
            <X />
          </IconButton>
        </li>
        {items.map((item, index) => (
          <li
            key={item.id || item.value || index}
            className="ods-contextual-menu__item"
          >
            <ContextualMenuItem
              {...item}
              onClick={() => {
                onSelect?.(item.value);
                onOpenChange(false);
              }}
              selectedValue={selectedValue}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContextualMenu;
