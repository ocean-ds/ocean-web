import React, { ReactNode } from 'react';
import { Unstyled } from '@storybook/blocks';
import Typography from '../../packages/ocean-react/src/Typography';
import { DocTab, DocTabs } from './DocTabs';
import { DocFooter, DocHeaderLinks, DocLink } from './DocLinks';

/**
 * Página de documentação no formato aprovado (MR-615): título, subtítulo, links do
 * cabeçalho, cinco abas e rodapé. Unstyled: sem o CSS do Storybook Docs, os componentes
 * vivos saem como no produto.
 */
// eslint-disable-next-line import/prefer-default-export
export const DocPage = ({
  title,
  subtitle,
  links,
  footer,
  tabs,
}: {
  title: string;
  subtitle: ReactNode;
  links: DocLink[];
  footer: DocLink[];
  tabs: DocTab[];
}): React.ReactElement => (
  <Unstyled>
    <div className="odoc" style={{ maxWidth: 1200 }}>
      <header className="odoc__header">
        <Typography variant="heading2">{title}</Typography>
        <p className="odoc__lead">{subtitle}</p>
        <DocHeaderLinks links={links} />
      </header>
      <DocTabs tabs={tabs} />
      <DocFooter links={footer} />
    </div>
  </Unstyled>
);
