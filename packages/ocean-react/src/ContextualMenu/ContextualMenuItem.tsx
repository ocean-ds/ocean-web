import { LockClosed } from '@useblu/ocean-icons-react';
import classNames from 'classnames';
import React from 'react';
import Tag, { TagProps } from '../Tag/Tag';

export type ContextualMenuItemProps = {
  /**
   * Texto do item do menu
   */
  label: string;
  /**
   * Valor único identificador do item
   */
  value: string;
  /**
   * Ícone exibido à esquerda do texto
   */
  icon?: React.ReactNode;
  /**
   * Callback chamado ao clicar no item
   */
  onClick: () => void;
  /**
   * Valor do item atualmente selecionado (usado internamente)
   */
  selectedValue?: string;
  /**
   * Tipo visual do item
   */
  type: 'primary' | 'neutral' | 'critical';
  /**
   * Desabilita o item
   */
  disabled?: boolean;
  /**
   * Indica que o item está bloqueado (requer permissão/upgrade)
   */
  blocked?: boolean;
  /**
   * Tag exibida à direita do texto
   */
  tag?: TagProps;
  /**
   * ID HTML do elemento
   */
  id?: string;
};

export type ContextualMenuItemValue = {
  label: string;
  value: string;
};
export const ContextualMenuItem = ({
  label,
  value,
  icon,
  onClick,
  type,
  disabled,
  blocked,
  tag,
  id,
  selectedValue,
}: ContextualMenuItemProps): React.ReactElement => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      id={id}
      className={classNames(
        'ods-contextual-menu__item__button',
        `ods-contextual-menu__item__button--${type}`,
        {
          [`ods-contextual-menu__item__button--${type}-selected`]: isSelected,
          'ods-contextual-menu__item__button--blocked': blocked,
          'ods-contextual-menu__item__button--with-icon': icon,
        }
      )}
    >
      {icon && (
        <span
          className={classNames(
            'ods-contextual-menu__item__button__icon',
            `ods-contextual-menu__item__button__icon--${type}`,
            {
              'ods-contextual-menu__item__button__icon--disabled': disabled,
              'ods-contextual-menu__item__button__icon--blocked': blocked,
            }
          )}
        >
          {icon}
        </span>
      )}
      <div className="ods-contextual-menu__item__button__content">
        <p className="ods-typography ods-typography__description">{label}</p>
        {blocked && <LockClosed size={16} />}
        {tag && <Tag size="small" setIconOff {...tag} />}
      </div>
    </button>
  );
};

export default ContextualMenuItem;
