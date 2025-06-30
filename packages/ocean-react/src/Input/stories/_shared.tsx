import * as DocBlock from '@storybook/blocks';
import React from 'react';

// Configurações comuns de ArgTypes
export const commonArgTypes = {
  label: {
    name: 'label',
    description:
      'O rótulo do campo de entrada. Essencial para acessibilidade e compreensão do usuário sobre o que inserir.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
    control: { type: 'text' },
  },
  placeholder: {
    name: 'placeholder',
    description:
      'Texto de exemplo mostrado quando o input está vazio. Deve demonstrar o formato esperado ou dar dicas sobre o conteúdo.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
    control: { type: 'text' },
  },
  helperText: {
    name: 'helperText',
    description:
      'Texto de ajuda exibido abaixo do input. Use para orientações adicionais ou mensagens de validação.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
    control: { type: 'text' },
  },
  error: {
    name: 'error',
    description:
      'Quando true, aplica estilos de estado de erro ao input. Use com validação de formulário para indicar problemas.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
    control: { type: 'boolean' },
  },
  disabled: {
    name: 'disabled',
    description:
      'Quando true, desabilita o campo de entrada. Use quando o campo não estiver disponível ou aplicável no contexto atual.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
    control: { type: 'boolean' },
  },
  tooltipMessage: {
    name: 'tooltipMessage',
    description:
      'Mensagem de tooltip exibida ao passar o mouse sobre o ícone de ajuda.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'undefined' },
    },
    control: { type: 'text' },
  },
  // Props comumente desabilitadas
  htmlFor: {
    control: { type: null },
  },
  defaultValue: {
    control: { type: null },
  },
};

// Componentes de documentação compartilhados
export const SharedBestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Uso Geral</h3>
    <ul>
      <li>
        Use labels descritivos que indiquem claramente o propósito do campo
      </li>
      <li>Forneça placeholders que demonstrem formato ou exemplos esperados</li>
      <li>Use helperText para orientações importantes e permanentes</li>
      <li>Mantenha consistência visual e comportamental em toda aplicação</li>
    </ul>

    <h3>2. Validação e Estados</h3>
    <ul>
      <li>
        Use o estado <code>error</code> apenas quando validação falhar
      </li>
      <li>Combine helperText com mensagens de erro específicas e acionáveis</li>
      <li>Mantenha feedback de validação claro e próximo ao campo</li>
      <li>
        Use <code>disabled</code> apenas quando necessário e explique o motivo
      </li>
    </ul>

    <h3>3. Acessibilidade</h3>
    <ul>
      <li>Sempre forneça labels claros e descritivos</li>
      <li>Use helperText para instruções importantes</li>
      <li>Mantenha ordem de tabulação lógica e consistente</li>
      <li>Forneça feedback claro para todos os estados</li>
      <li>Certifique-se que contrast ratios atendam padrões WCAG</li>
    </ul>

    <h3>4. Conteúdo e Texto</h3>
    <ul>
      <li>Use linguagem clara, simples e orientada à ação</li>
      <li>Evite jargões técnicos desnecessários</li>
      <li>Mantenha consistência no tom e estilo</li>
      <li>Priorize brevidade sem sacrificar clareza</li>
    </ul>
  </>
);

export const SharedCssClasses = (): JSX.Element => (
  <>
    <DocBlock.Heading>Classes CSS</DocBlock.Heading>
    <table>
      <thead>
        <tr>
          <th>Classe Global</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.ods-input</code>
          </td>
          <td>Estilos aplicados ao elemento raiz do componente.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__field</code>
          </td>
          <td>Estilos aplicados ao elemento input.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__label</code>
          </td>
          <td>Estilos aplicados ao rótulo do campo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__helper-text</code>
          </td>
          <td>Estilos aplicados ao texto de ajuda.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input__adornment</code>
          </td>
          <td>Estilos aplicados aos adornments (ícones, símbolos).</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--error</code>
          </td>
          <td>Estilos aplicados quando o campo está em estado de erro.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--disabled</code>
          </td>
          <td>Estilos aplicados quando o campo está desabilitado.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-input--focused</code>
          </td>
          <td>Estilos aplicados quando o campo está em foco.</td>
        </tr>
      </tbody>
    </table>
  </>
);

// Template base para API Reference comum
export const createApiReference = (
  specificProps: React.ReactNode = null
): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente Input é baseado no elemento `input` e suporta todos os
      atributos padrão HTML relevantes.
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
          <td>label</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Rótulo que identifica o propósito do campo. Sempre forneça labels
            descritivos para acessibilidade.
          </td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Texto de exemplo que aparece quando vazio. Use para mostrar formato
            ou exemplo de conteúdo.
          </td>
        </tr>
        <tr>
          <td>helperText</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Texto auxiliar que fornece contexto ou instruções. Útil para
            explicar requisitos ou formato esperado.
          </td>
        </tr>
        <tr>
          <td>error</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Define se o campo está em estado de erro. Ativa estilos visuais de
            erro e modifica a cor do helperText.
          </td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>
            Desabilita a interação com o campo. Use para campos calculados
            automaticamente ou indisponíveis.
          </td>
        </tr>
        <tr>
          <td>tooltipMessage</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Mensagem de tooltip para informações contextuais. Use para
            explicações que não cabem no helperText.
          </td>
        </tr>
        {specificProps}
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento input. Qualquer outra prop fornecida
      será passada para o elemento appropriado.
    </DocBlock.Markdown>
  </>
);

// Props específicas para diferentes tipos de Input
export const typeSpecificProps = (
  <>
    <tr>
      <td>type</td>
      <td>
        <code>
          &quot;text&quot; | &quot;email&quot; | &quot;password&quot; |
          &quot;search&quot; | &quot;tel&quot;
        </code>
      </td>
      <td>
        <code>&quot;text&quot;</code>
      </td>
      <td>
        Define o tipo do input e comportamento de validação. Use email para
        validação automática, password para campos seguros.
      </td>
    </tr>
  </>
);

export const adornmentSpecificProps = (
  <>
    <tr>
      <td>adornment</td>
      <td>
        <code>ReactNode</code>
      </td>
      <td>
        <code>undefined</code>
      </td>
      <td>
        Elemento adicional (ícone, símbolo) exibido junto ao input. Use para
        contexto visual ou funcionalidade extra.
      </td>
    </tr>
    <tr>
      <td>position</td>
      <td>
        <code>&quot;left&quot; | &quot;right&quot;</code>
      </td>
      <td>
        <code>&quot;right&quot;</code>
      </td>
      <td>
        Posição do adornment. Use left para símbolos de moeda, right para ícones
        de ação.
      </td>
    </tr>
  </>
);

// Decorator padrão para Usage stories
export const defaultUsageDecorator = [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div
      style={{
        minWidth: '300px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <StoryComponent />
    </div>
  ),
];

// Template para Introduction comum
export const createIntroduction = (
  description: string,
  overview: string,
  importCode?: string
): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>{description}</DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>{overview}</DocBlock.Markdown>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={importCode || `import { Input } from '@useblu/ocean-react';`}
    />
  </>
);
