import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import FileUploader, { FileChangeEvent, FileState } from '../FileUploader';
import FileUploaderAuto from '../examples/FileUploaderAuto';
import FileUploaderControlled from '../examples/FileUploaderControlled';

const meta: Meta<typeof FileUploader> = {
  title: 'Components/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Rótulo do campo de upload.',
      control: 'text',
    },
    multiple: {
      description: 'Permite seleção de múltiplos arquivos.',
      control: 'boolean',
    },
    maxFiles: {
      description: 'Número máximo de arquivos permitidos.',
      control: 'number',
    },
    language: {
      description: 'Idioma da interface.',
      control: 'select',
      options: ['pt-br', 'en'],
    },
    error: {
      description: 'Define se o campo está em estado de erro.',
      control: 'boolean',
    },
    id: {
      table: { disable: true },
    },
    name: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    filesState: {
      table: { disable: true },
    },
    customLocale: {
      table: { disable: true },
    },
    validation: {
      table: { disable: true },
    },
    onAdd: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
    onReloadFile: {
      table: { disable: true },
    },
    onRemoveFile: {
      table: { disable: true },
    },
    reloadTooltip: {
      table: { disable: true },
    },
    removeTooltip: {
      table: { disable: true },
    },
    disabled: {
      table: { disable: true },
    },
    title: {
      table: { disable: true },
    },
    callToAction: {
      table: { disable: true },
    },
    callToActionMobile: {
      table: { disable: true },
    },
    subtitle: {
      table: { disable: true },
    },
    maxSize: {
      table: { disable: true },
    },
    minSize: {
      table: { disable: true },
    },
    maxLength: {
      table: { disable: true },
    },
    accept: {
      table: { disable: true },
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
          <h3 id="basico">Básico</h3>
          <Basic />
          <h3 id="estados">Estados</h3>
          <StatesDescription />
          <States />
          <h3 id="validacao">Validação</h3>
          <ValidationDescription />
          <Validation />
          <h3 id="controlado">Modo Controlado</h3>
          <ControlledDescription />
          <Controlled />
          <h3 id="auto-upload">Auto Upload</h3>
          <AutoUploadDescription />
          <AutoUpload />
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

type Story = StoryObj<typeof FileUploader>;

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Componente para upload de arquivos com suporte a drag-and-drop, validação
      personalizada e múltiplos estados de upload.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O FileUploader oferece uma interface intuitiva para upload de arquivos com
      recursos avançados como validação em tempo real, estados visuais de
      progresso, suporte a múltiplos arquivos e integração com formulários. É
      perfeito para cenários que exigem uma experiência de upload robusta e
      acessível.
    </DocBlock.Markdown>
    <h3>Principais Características</h3>
    <ul>
      <li>
        <strong>Drag-and-Drop</strong>: Interface intuitiva para arrastar e
        soltar arquivos
      </li>
      <li>
        <strong>Validação Flexível</strong>: Suporte a validação customizada de
        tipo, tamanho e nome
      </li>
      <li>
        <strong>Estados Visuais</strong>: Indicadores claros de progresso,
        sucesso e erro
      </li>
      <li>
        <strong>Múltiplos Arquivos</strong>: Suporte configurável para upload de
        múltiplos arquivos
      </li>
      <li>
        <strong>Multilíngue</strong>: Suporte nativo a português e inglês
      </li>
      <li>
        <strong>Integração com Formulários</strong>: Funciona perfeitamente com
        bibliotecas como Formik
      </li>
    </ul>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { FileUploader } from '@useblu/ocean-react';`}
    />
  </>
);

const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Upload básico
<FileUploader
  label="Upload de arquivos"
  name="files"
  accept="image/*"
  maxFiles={5}
  multiple
  language="pt-br"
/>

// Upload com validação
<FileUploader
  label="Upload de documentos"
  name="documents"
  accept=".pdf,.doc,.docx"
  maxSize={20971520} // 20MB
  maxFiles={3}
  language="pt-br"
  validation={(file) => {
    if (file.name.includes('temp')) {
      return { code: 'invalid-name', message: 'Nome não permitido' };
    }
    return null;
  }}
/>

// Upload controlado com estados
const [files, setFiles] = useState<File[]>([]);
const [filesState, setFilesState] = useState<FileState[]>([]);

<FileUploader
  label="Upload com progresso"
  name="files"
  value={files}
  filesState={filesState}
  language="pt-br"
  onChange={(e) => setFiles(e.target.value)}
  onAdd={(e) => {
    // Iniciar upload para cada arquivo
    e.target.value.forEach(uploadFile);
  }}
/>`}
    />
  </>
);

const StatesDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      O FileUploader suporta diferentes estados visuais para cada arquivo:
    </DocBlock.Markdown>
    <ul>
      <li>
        <code>idle</code>: Estado inicial após seleção do arquivo
      </li>
      <li>
        <code>loading</code>: Arquivo sendo processado ou enviado
      </li>
      <li>
        <code>success</code>: Upload concluído com sucesso
      </li>
      <li>
        <code>error</code>: Erro durante o upload (permite retry)
      </li>
      <li>
        <code>warning</code>: Arquivo rejeitado por validação
      </li>
    </ul>
  </>
);

const ValidationDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Exemplo de validação customizada com diferentes regras:
    </DocBlock.Markdown>
  </>
);

const ControlledDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Exemplo de uso com Formik para controle completo do estado:
    </DocBlock.Markdown>
  </>
);

const AutoUploadDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Exemplo de upload automático que processa arquivos assim que são
      adicionados:
    </DocBlock.Markdown>
  </>
);

export const Usage: Story = {
  args: {
    label: 'Upload de arquivos',
    name: 'files',
    accept: 'application/pdf',
    maxFiles: 5,
    multiple: true,
    language: 'pt-br',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={{ minWidth: '400px', maxWidth: '600px' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

const Basic = (): JSX.Element => (
  <div style={{ maxWidth: '600px' }}>
    <FileUploader
      label="Upload básico"
      name="basic"
      accept="image/*,application/pdf"
      maxFiles={3}
      multiple
      language="pt-br"
    />
  </div>
);

const States = (): JSX.Element => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [filesState, setFilesState] = React.useState<FileState[]>([]);

  const handleFileAdd = (e: FileChangeEvent) => {
    const newFiles = e.target.value;
    setFilesState((prev) => [
      ...prev,
      ...newFiles.map((file) => ({ file, state: 'idle' as const })),
    ]);

    // Simular diferentes estados após 1 segundo
    setTimeout(() => {
      setFilesState((prev) =>
        prev.map((state, index) => {
          if (newFiles.includes(state.file)) {
            const states = ['loading', 'success', 'error', 'warning'];
            return {
              ...state,
              state: states[index % states.length] as any,
              message: state.state === 'error' ? 'Erro no upload' : undefined,
            };
          }
          return state;
        })
      );
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <FileUploader
        label="Estados dos arquivos"
        name="states"
        value={files}
        filesState={filesState}
        onChange={(e) => setFiles(e.target.value)}
        onAdd={handleFileAdd}
        multiple
        language="pt-br"
      />
    </div>
  );
};

const Validation = (): JSX.Element => (
  <div style={{ maxWidth: '600px' }}>
    <FileUploader
      label="Upload com validação"
      name="validation"
      accept="image/*"
      maxFiles={2}
      maxSize={1048576} // 1MB
      minSize={1024} // 1KB
      maxLength={50}
      multiple
      language="pt-br"
      validation={(file) => {
        if (file.name.toLowerCase().includes('test')) {
          return {
            code: 'invalid-name',
            message: 'Arquivos de teste não são permitidos',
          };
        }
        return null;
      }}
    />
  </div>
);

const Controlled = (): JSX.Element => (
  <div style={{ maxWidth: '600px' }}>
    <FileUploaderControlled />
  </div>
);

const AutoUpload = (): JSX.Element => (
  <div style={{ maxWidth: '600px' }}>
    <FileUploaderAuto />
  </div>
);

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Upload de Imagens</h3>
    <DocBlock.Source
      dark
      code={`<FileUploader
  label="Fotos do produto"
  name="productImages"
  accept="image/jpeg,image/png,image/webp"
  maxSize={5242880} // 5MB
  maxFiles={10}
  multiple
  language="pt-br"
  title="Arraste suas fotos aqui"
  subtitle="Formatos aceitos: JPG, PNG, WEBP. Máximo 5MB por arquivo."
/>`}
    />

    <h3>Upload de Documentos</h3>
    <DocBlock.Source
      dark
      code={`<FileUploader
  label="Documentos"
  name="documents"
  accept=".pdf,.doc,.docx"
  maxSize={20971520} // 20MB
  maxFiles={5}
  multiple
  language="pt-br"
  title="Envie seus documentos"
  subtitle="Formatos aceitos: PDF, DOC, DOCX. Máximo 20MB por arquivo."
/>`}
    />

    <h3>Upload Único com Validação</h3>
    <DocBlock.Source
      dark
      code={`<FileUploader
  label="Avatar"
  name="avatar"
  accept="image/*"
  maxSize={2097152} // 2MB
  maxFiles={1}
  multiple={false}
  language="pt-br"
  validation={(file) => {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      return { code: 'invalid-type', message: 'Apenas JPG e PNG são aceitos' };
    }
    return null;
  }}
/>`}
    />

    <h3>Upload com Estados Customizados</h3>
    <DocBlock.Source
      dark
      code={`const [files, setFiles] = useState<File[]>([]);
const [filesState, setFilesState] = useState<FileState[]>([]);

const uploadFile = async (file: File) => {
  // Atualizar estado para loading
  setFilesState(prev => 
    prev.map(state => 
      state.file === file 
        ? { ...state, state: 'loading' }
        : state
    )
  );

  try {
    await api.uploadFile(file);
    // Sucesso
    setFilesState(prev => 
      prev.map(state => 
        state.file === file 
          ? { ...state, state: 'success' }
          : state
      )
    );
  } catch (error) {
    // Erro
    setFilesState(prev => 
      prev.map(state => 
        state.file === file 
          ? { ...state, state: 'error', message: 'Erro no upload' }
          : state
      )
    );
  }
};

<FileUploader
  label="Upload com progresso"
  name="files"
  value={files}
  filesState={filesState}
  language="pt-br"
  onChange={(e) => setFiles(e.target.value)}
  onAdd={(e) => {
    e.target.value.forEach(uploadFile);
  }}
  onReloadFile={uploadFile}
/>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Validação de Arquivos</h3>
    <ul>
      <li>
        Use <code>accept</code> para especificar tipos de arquivo aceitos
      </li>
      <li>
        Defina <code>maxSize</code> e <code>minSize</code> apropriados
      </li>
      <li>Implemente validação customizada para regras específicas</li>
      <li>Forneça mensagens de erro claras e úteis</li>
    </ul>

    <h3>2. Experiência do Usuário</h3>
    <ul>
      <li>Use títulos e subtítulos descritivos</li>
      <li>Indique claramente os formatos aceitos e limites</li>
      <li>Forneça feedback visual para todos os estados</li>
      <li>Permita retry para uploads que falharam</li>
    </ul>

    <h3>3. Performance</h3>
    <ul>
      <li>
        Defina limites apropriados para <code>maxFiles</code> e{' '}
        <code>maxSize</code>
      </li>
      <li>Use compressão de imagem quando necessário</li>
      <li>Implemente upload em chunks para arquivos grandes</li>
      <li>Considere usar lazy loading para previsões de arquivo</li>
    </ul>

    <h3>4. Acessibilidade</h3>
    <ul>
      <li>
        Sempre forneça um <code>label</code> descritivo
      </li>
      <li>Use tooltips informativos para ações</li>
      <li>Certifique-se de que o componente funciona apenas com teclado</li>
      <li>Forneça feedback adequado para leitores de tela</li>
    </ul>

    <h3>5. Integração com Formulários</h3>
    <ul>
      <li>
        Use <code>name</code> para integração com bibliotecas de formulário
      </li>
      <li>Implemente validação no nível do formulário</li>
      <li>Considere usar modo controlado para controle total</li>
      <li>Gerencie estados de loading durante submissão</li>
    </ul>
  </>
);

const CssClasses = (): JSX.Element => (
  <>
    <DocBlock.Heading>Classes CSS</DocBlock.Heading>
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Classe</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.ods-file-uploader</code>
          </td>
          <td>Estilos aplicados ao elemento raiz.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader--error</code>
          </td>
          <td>Estilos aplicados quando error=true.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__dropzone</code>
          </td>
          <td>Área de drop para arquivos.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__trigger</code>
          </td>
          <td>Área clicável para seleção de arquivos.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__trigger--drag</code>
          </td>
          <td>Estilos aplicados durante drag over.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__trigger-icon</code>
          </td>
          <td>Ícone de upload na área trigger.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__title</code>
          </td>
          <td>Título principal da área de upload.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__title--mobile</code>
          </td>
          <td>Título específico para dispositivos móveis.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__subtitle</code>
          </td>
          <td>Subtítulo com informações adicionais.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__file</code>
          </td>
          <td>Container para cada arquivo listado.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__file--&#123;state&#125;</code>
          </td>
          <td>Estilos específicos para cada estado do arquivo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__file-status</code>
          </td>
          <td>Área do ícone de status do arquivo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__file-name</code>
          </td>
          <td>Nome do arquivo exibido.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__file-actions</code>
          </td>
          <td>Área de ações (remover, recarregar) do arquivo.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__file-loading</code>
          </td>
          <td>Container para indicador de progresso.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__warning_message</code>
          </td>
          <td>Mensagem de aviso para arquivos rejeitados.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__error_message</code>
          </td>
          <td>Mensagem de erro para falhas de upload.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-file-uploader__success_message</code>
          </td>
          <td>Mensagem de sucesso para uploads concluídos.</td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O FileUploader aceita todas as propriedades padrão de elementos de
      formulário, além das propriedades específicas listadas abaixo.
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
          <td>Rótulo do campo de upload exibido acima do componente.</td>
        </tr>
        <tr>
          <td>title</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Título personalizado exibido na área de upload. Se não fornecido,
            usa o texto padrão baseado no idioma.
          </td>
        </tr>
        <tr>
          <td>callToAction</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Texto do link de call-to-action para seleção de arquivos. Se não
            fornecido, usa o texto padrão.
          </td>
        </tr>
        <tr>
          <td>callToActionMobile</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Texto do call-to-action específico para dispositivos móveis.</td>
        </tr>
        <tr>
          <td>subtitle</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Subtítulo com informações sobre formatos aceitos, tamanhos máximos,
            etc.
          </td>
        </tr>
        <tr>
          <td>multiple</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>true</code>
          </td>
          <td>Permite a seleção de múltiplos arquivos quando true.</td>
        </tr>
        <tr>
          <td>maxFiles</td>
          <td>
            <code>number</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Número máximo de arquivos que podem ser selecionados
            simultaneamente.
          </td>
        </tr>
        <tr>
          <td>maxSize</td>
          <td>
            <code>number</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Tamanho máximo em bytes permitido para cada arquivo.</td>
        </tr>
        <tr>
          <td>minSize</td>
          <td>
            <code>number</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Tamanho mínimo em bytes necessário para cada arquivo.</td>
        </tr>
        <tr>
          <td>maxLength</td>
          <td>
            <code>number</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Comprimento máximo permitido para o nome do arquivo.</td>
        </tr>
        <tr>
          <td>accept</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Tipos de arquivo aceitos no formato MIME (ex: &quot;image/*&quot;,
            &quot;.pdf,.doc&quot;).
          </td>
        </tr>
        <tr>
          <td>language</td>
          <td>
            <code>&quot;pt-br&quot; | &quot;en&quot;</code>
          </td>
          <td>
            <code>&quot;en&quot;</code>
          </td>
          <td>
            Idioma da interface do usuário. Afeta textos padrão e mensagens de
            validação.
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
          <td>Quando true, aplica estilos de erro ao componente.</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>
            <code>boolean</code>
          </td>
          <td>
            <code>false</code>
          </td>
          <td>Quando true, desabilita o componente impedindo interação.</td>
        </tr>
        <tr>
          <td>value</td>
          <td>
            <code>File[]</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Array de arquivos para modo controlado. Use com onChange para
            controle completo.
          </td>
        </tr>
        <tr>
          <td>filesState</td>
          <td>
            <code>FileState[]</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Array de estados para cada arquivo (idle, loading, success, error,
            warning).
          </td>
        </tr>
        <tr>
          <td>customLocale</td>
          <td>
            <code>object</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Objeto com textos personalizados para substituir os padrões do
            idioma.
          </td>
        </tr>
        <tr>
          <td>validation</td>
          <td>
            <code>(file: File) =&gt; FileError | null</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Função de validação customizada executada para cada arquivo.</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>
            <code>(event: FileChangeEvent) =&gt; void</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Callback executado quando a lista de arquivos é alterada.</td>
        </tr>
        <tr>
          <td>onAdd</td>
          <td>
            <code>(event: FileChangeEvent) =&gt; void</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Callback executado quando novos arquivos são adicionados.</td>
        </tr>
        <tr>
          <td>onReloadFile</td>
          <td>
            <code>(file: File) =&gt; void</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Callback executado quando o usuário clica para recarregar um arquivo
            com erro.
          </td>
        </tr>
        <tr>
          <td>onRemoveFile</td>
          <td>
            <code>(file: File) =&gt; void</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Callback executado quando o usuário remove um arquivo da lista.
          </td>
        </tr>
        <tr>
          <td>reloadTooltip</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Texto do tooltip para o botão de recarregar arquivo.</td>
        </tr>
        <tr>
          <td>removeTooltip</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Texto do tooltip para o botão de remover arquivo.</td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento input interno. Qualquer outra prop
      fornecida será passada para o elemento input.
    </DocBlock.Markdown>
  </>
);
