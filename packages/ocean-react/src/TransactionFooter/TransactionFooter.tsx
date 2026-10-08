import React from 'react';
import classNames from 'classnames';

export type TransactionFooterVariant = 'default' | 'highlight';

export type TransactionFooterProps = {
  /**
   * A variante visual do rodapé.
   * `default` mantém o fundo neutro (`colorInterfaceLightPure`) com cantos retos;
   * `highlight` aplica o fundo `colorInterfaceLightUp` e arredonda os cantos
   * superiores em 16px, sem alterar as dimensões externas do bloco.
   * @default 'default'
   */
  variant?: TransactionFooterVariant;
  /**
   * O conteúdo do rodapé — linhas de resumo (benefício → custo → total), divisor
   * e botões. A composição e a ordem das linhas são responsabilidade do consumidor.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const TransactionFooter = React.forwardRef<
  HTMLDivElement,
  TransactionFooterProps
>(({ variant = 'default', className, children, ...rest }, ref) => (
  <div
    ref={ref}
    className={classNames(
      'ods-transaction-footer',
      `ods-transaction-footer--${variant}`,
      className
    )}
    {...rest}
  >
    {children}
  </div>
));

TransactionFooter.displayName = 'TransactionFooter';

export default TransactionFooter;
