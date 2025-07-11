import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import { Star } from '@useblu/ocean-icons-react';
import Tag from '../Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'A variante visual da tag.',
      control: 'select',
      options: ['default', 'highlight'],
    },
    type: {
      description: 'O tipo da tag que define cores e ícones.',
      control: 'select',
      options: [
        'default',
        'neutral',
        'neutral-02',
        'neutral-03',
        'positive',
        'warning',
        'negative',
        'important',
      ],
    },
    size: {
      description: 'O tamanho da tag.',
      control: 'select',
      options: ['small', 'medium'],
    },
    icon: {
      description: 'Ícone customizado para a tag.',
      control: false,
    },
    setIconOff: {
      description: 'Desabilita a exibição do ícone.',
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Introduction />
          <DocBlock.Heading>Uso</DocBlock.Heading>
          <DocBlock.Canvas of={Usage} />
          <DocBlock.Controls of={Usage} />
          <DocBlock.Heading>Padrões comuns</DocBlock.Heading>
          <CommonPatterns />
          <DocBlock.Heading>Exemplos</DocBlock.Heading>
          <h3 id="variantes-default">Variantes default</h3>
          <DefaultVariantsDescription />
          <DocBlock.Canvas of={DefaultVariants} />
          <h3 id="variantes-highlight">Variantes highlight</h3>
          <HighlightVariantsDescription />
          <DocBlock.Canvas of={HighlightVariants} />
          <h3 id="tamanhos">Tamanhos</h3>
          <DocBlock.Canvas of={Sizes} />
          <h3 id="icones">Ícones</h3>
          <IconsDescription />
          <DocBlock.Canvas of={Icons} />
          <h3 id="icones-customizados">Ícones Customizados</h3>
          <CustomIconsDescription />
          <DocBlock.Canvas of={CustomIcons} />
          <h3 id="sem-icones">Sem Ícones</h3>
          <NoIconsDescription />
          <DocBlock.Canvas of={NoIcons} />
          <UsageExamples />
          <BestPractices />
          <CssClasses />
          <ApiReference />
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

const DefaultVariantsDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      A variante `default` oferece diferentes tipos com cores e ícones
      específicos:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>default</code>: Tag padrão sem ícone específico
      </li>
      <li>
        <code>neutral</code>: Tag neutra para informações gerais
      </li>
      <li>
        <code>neutral-02</code>: Segunda variante neutra
      </li>
      <li>
        <code>neutral-03</code>: Terceira variante neutra
      </li>
      <li>
        <code>positive</code>: Para informações positivas/sucesso
      </li>
      <li>
        <code>warning</code>: Para avisos e alertas
      </li>
      <li>
        <code>negative</code>: Para erros e informações críticas
      </li>
    </ul>
  </>
);

const HighlightVariantsDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      A variante `highlight` é usada para destacar informações importantes:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>important</code>: Para informações críticas e importantes
      </li>
      <li>
        <code>neutral</code>: Para notificações neutras destacadas
      </li>
    </ul>
  </>
);

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Exibe informações categorizadas com cores e ícones para identificação
      visual rápida.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Tag é usado para exibir informações categorizadas, status ou
      labels com cores e ícones específicos que facilitam a identificação
      visual. Suporta diferentes tipos, variantes e tamanhos para diversos
      contextos de uso.
    </DocBlock.Markdown>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source dark code={`import { Tag } from '@useblu/ocean-react';`} />
  </>
);

export const Usage: Story = {
  args: {
    children: 'Sua Tag',
    type: 'default',
    size: 'medium',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Tag básica
<Tag>Informação</Tag>

// Tag com tipo específico
<Tag type="positive">Sucesso</Tag>
<Tag type="warning">Atenção</Tag>
<Tag type="negative">Erro</Tag>

// Tag com ícone customizado
<Tag icon={<Star size={16} />} type="neutral">
  Favorito
</Tag>

// Tag sem ícone
<Tag type="warning" setIconOff={true}>
  Aviso
</Tag>

// Tag highlight
<Tag variant="highlight" type="important">
  Importante
</Tag>`}
    />
  </>
);

export const DefaultVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Tag type="default">Default</Tag>
      <Tag type="neutral">Neutral</Tag>
      <Tag type="neutral-02">Neutral 02</Tag>
      <Tag type="neutral-03">Neutral 03</Tag>
      <Tag type="positive" setIconOff>
        Positive
      </Tag>
      <Tag type="warning" setIconOff>
        Warning
      </Tag>
      <Tag type="negative" setIconOff>
        Negative
      </Tag>
    </div>
  ),
};

export const HighlightVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Tag variant="highlight" type="important">
        Important
      </Tag>
      <Tag variant="highlight" type="neutral">
        Neutral
      </Tag>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Tag size="medium">Medium Tag</Tag>
      <Tag size="small">Small Tag</Tag>
    </div>
  ),
};

const IconsDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Alguns tipos de tag incluem ícones padrão que são exibidos
      automaticamente:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>positive</code>: Ícone de check (✓)
      </li>
      <li>
        <code>warning</code>: Ícone de exclamação (!)
      </li>
      <li>
        <code>negative</code>: Ícone X (✗)
      </li>
    </ul>
  </>
);

export const Icons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Tag type="warning">Warning</Tag>
      <Tag type="negative">Negative</Tag>
      <Tag type="positive">Positive</Tag>
    </div>
  ),
};

const CustomIconsDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Você pode adicionar ícones customizados para qualquer tipo de tag:
    </DocBlock.Markdown>
  </>
);

export const CustomIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Tag icon={<Star size={16} />} type="neutral">
        Neutral
      </Tag>
      <Tag icon={<Star size={16} />} type="neutral-02">
        Neutral 02
      </Tag>
      <Tag icon={<Star size={16} />} type="neutral-03">
        Neutral 03
      </Tag>
      <Tag type="warning" icon={<Star size={16} />}>
        Warning
      </Tag>
      <Tag type="negative" icon={<Star size={16} />}>
        Negative
      </Tag>
      <Tag type="positive" icon={<Star size={16} />}>
        Positive
      </Tag>
    </div>
  ),
};

const NoIconsDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Use a prop `setIconOff` para desabilitar a exibição de ícones:
    </DocBlock.Markdown>
  </>
);

export const NoIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Tag type="warning" setIconOff>
        Warning
      </Tag>
    </div>
  ),
};

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Status de Transação</h3>
    <DocBlock.Source
      dark
      code={`<div style={{ display: 'flex', gap: '8px' }}>
  <Tag type="positive">Aprovado</Tag>
  <Tag type="warning">Pendente</Tag>
  <Tag type="negative">Rejeitado</Tag>
</div>`}
    />

    <h3>Tags com Ícones Customizados</h3>
    <DocBlock.Source
      dark
      code={`import { Star, Heart } from '@useblu/ocean-icons-react';

<Tag icon={<Star size={16} />} type="neutral">
  Favorito
</Tag>
<Tag icon={<Heart size={16} />} type="positive">
  Curtido
</Tag>`}
    />

    <h3>Tags Highlight para Informações Importantes</h3>
    <DocBlock.Source
      dark
      code={`<Tag variant="highlight" type="important">
  Informação Crítica
</Tag>
<Tag variant="highlight" type="neutral">
  Notificação
</Tag>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
    <ul>
      <li>
        Use <code>type=&quot;positive&quot;</code> para status de sucesso
      </li>
      <li>
        Use <code>type=&quot;warning&quot;</code> para avisos e alertas
      </li>
      <li>
        Use <code>type=&quot;negative&quot;</code> para erros e informações
        críticas
      </li>
      <li>
        Use <code>variant=&quot;highlight&quot;</code> para informações
        importantes
      </li>
      <li>Mantenha consistência no uso de cores e ícones</li>
    </ul>

    <h3>2. Acessibilidade</h3>
    <ul>
      <li>Use textos descritivos que indiquem claramente o status</li>
      <li>Evite usar apenas cores para transmitir informação</li>
      <li>Combine cores com ícones para melhor compreensão</li>
      <li>Mantenha contraste adequado entre texto e fundo</li>
    </ul>

    <h3>3. Design</h3>
    <ul>
      <li>Use tags para categorizar e organizar informações</li>
      <li>Limite o número de tags em uma área para evitar poluição visual</li>
      <li>Considere o tamanho da tag baseado no contexto</li>
      <li>Use ícones customizados quando necessário para maior clareza</li>
    </ul>
  </>
);

const CssClasses = (): JSX.Element => (
  <>
    <DocBlock.Heading>Classes CSS</DocBlock.Heading>
    <table>
      <thead>
        <tr>
          <th>Classe</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.ods-tag</code>
          </td>
          <td>Estilos aplicados ao elemento raiz.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--default</code>
          </td>
          <td>Estilos aplicados ao elemento raiz com tipo padrão.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--primary</code>
          </td>
          <td>Estilos aplicados ao elemento raiz com tipo primário.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--complementary</code>
          </td>
          <td>Estilos aplicados ao elemento raiz com tipo complementar.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--negative</code>
          </td>
          <td>Estilos aplicados ao elemento raiz com tipo negativo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--warning</code>
          </td>
          <td>Estilos aplicados ao elemento raiz com tipo de aviso.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--positive</code>
          </td>
          <td>Estilos aplicados ao elemento raiz com tipo positivo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--medium</code>
          </td>
          <td>
            Estilos aplicados ao elemento raiz para definir tamanho médio.
          </td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--small</code>
          </td>
          <td>
            Estilos aplicados ao elemento raiz para definir tamanho pequeno.
          </td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--medium__with-icon</code>
          </td>
          <td>
            Estilos aplicados ao elemento raiz para definir tamanho médio com
            ícone.
          </td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--small__with-icon</code>
          </td>
          <td>
            Estilos aplicados ao elemento raiz para definir tamanho pequeno com
            ícone.
          </td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--highlight__important</code>
          </td>
          <td>
            Estilos aplicados ao elemento raiz com variante highlight e tipo
            importante.
          </td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag--highlight__neutral</code>
          </td>
          <td>
            Estilos aplicados ao elemento raiz com variante highlight e tipo
            neutro.
          </td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag__icon</code>
          </td>
          <td>Estilos aplicados ao elemento ícone.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-tag__content</code>
          </td>
          <td>Estilos aplicados ao elemento de conteúdo.</td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Tag é baseado no elemento div e suporta todos os atributos
      padrão de div.
    </DocBlock.Markdown>
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Tipo</th>
          <th>Padrão</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>variant</td>
          <td>
            <code>&quot;default&quot; | &quot;highlight&quot;</code>
          </td>
          <td>
            <code>&quot;default&quot;</code>
          </td>
          <td>
            Define a variante visual da tag. Default para tags normais,
            highlight para informações importantes.
          </td>
        </tr>
        <tr>
          <td>type</td>
          <td>
            <code>
              &quot;default&quot; | &quot;neutral&quot; | &quot;neutral-02&quot;
              | &quot;neutral-03&quot; | &quot;positive&quot; |
              &quot;warning&quot; | &quot;negative&quot; | &quot;important&quot;
            </code>
          </td>
          <td>
            <code>&quot;default&quot;</code>
          </td>
          <td>
            Define o tipo da tag que determina cores e ícones. Cada tipo tem uma
            cor e ícone específicos.
          </td>
        </tr>
        <tr>
          <td>size</td>
          <td>
            <code>&quot;small&quot; | &quot;medium&quot;</code>
          </td>
          <td>
            <code>&quot;medium&quot;</code>
          </td>
          <td>Controla o tamanho da tag. Pequeno (small) ou médio (medium).</td>
        </tr>
        <tr>
          <td>icon</td>
          <td>
            <code>React.ReactElement</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Ícone customizado para substituir o ícone padrão do tipo. Deve ser
            um elemento React.
          </td>
        </tr>
        <tr>
          <td>setIconOff</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>Quando true, desabilita a exibição de qualquer ícone na tag.</td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento div. Qualquer outra prop fornecida
      será passada para o elemento div.
    </DocBlock.Markdown>
  </>
);
