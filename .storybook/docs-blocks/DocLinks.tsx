import React, { ReactNode } from 'react';

export type DocLink = { label: string; href: string };

const LinkBar = ({
  links,
  className,
}: {
  links: DocLink[];
  className: string;
}) => (
  <nav className={className}>
    {links.map((link, index) => (
      <React.Fragment key={link.href}>
        {index > 0 && <span aria-hidden> · </span>}
        <a href={link.href} target="_blank" rel="noreferrer">
          {link.label}
        </a>
      </React.Fragment>
    ))}
  </nav>
);

/** Barra de links do cabeçalho (código-fonte, guia na base, Figma). */
export const DocHeaderLinks = ({
  links,
}: {
  links: DocLink[];
}): React.ReactElement => <LinkBar links={links} className="odoc__links" />;

/** Rodapé da página (editar a documentação, dar feedback). */
export const DocFooter = ({
  links,
}: {
  links: DocLink[];
}): React.ReactElement => (
  <footer className="odoc__footer">
    <LinkBar links={links} className="odoc__links" />
  </footer>
);

export type AiRules = {
  useWhen: string[];
  dontUse: string[];
  required: string[];
  forbidden: string[];
  defaults: string[];
  childOf: string[];
  source: string[];
};

const AI_LABELS: [keyof AiRules, string][] = [
  ['useWhen', 'USE QUANDO'],
  ['dontUse', 'NÃO USE'],
  ['required', 'OBRIGATÓRIO'],
  ['forbidden', 'PROIBIDO'],
  ['defaults', 'PADRÕES'],
  ['childOf', 'FILHO DE'],
  ['source', 'FONTE'],
];

/** Texto das regras para IA (rótulos fixos), para a página e para o resumo da Meta. */
export const aiRulesText = (rules: AiRules): string =>
  AI_LABELS.map(
    ([key, label]) =>
      `${label}:\n${rules[key].map((line) => `- ${line}`).join('\n')}`
  ).join('\n\n');

/** Bloco "Regras para IA" em monoespaçado. */
export const AiRulesBlock = ({
  rules,
  intro,
}: {
  rules: AiRules;
  intro?: ReactNode;
}): React.ReactElement => (
  <div className="odoc__ai">
    {intro && <p className="odoc__lead">{intro}</p>}
    <pre className="odoc__ai-text">{aiRulesText(rules)}</pre>
  </div>
);
