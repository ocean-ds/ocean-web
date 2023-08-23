import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUploader from '../FileUploader';

jest.mock('@useblu/ocean-icons-react', () => ({
  UploadOutline: function UploadOutlineMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>mock-icon</div>;
  },
  X: function XMock(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>mock-icon-remove</div>;
  },
  Refresh: function RefreshMock(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>mock-icon-reload</div>;
  },
  XCircle: function XCircleMock(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>mock-icon</div>;
  },
  ExclamationCircle: function ExclamationCircleMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>mock-icon-warning</div>;
  },
  DocumentText: function DocumentTextMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>mock-icon-idle</div>;
  },
  CheckCircle: function CheckCircleMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>mock-icon</div>;
  },
}));

test('renders element properly', () => {
  const { container } = render(
    <FileUploader data-testid="upload-test" className="custom-class" />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <div
        class="ods-form-control__element"
      >
        <div
          class="ods-file-uploader custom-class"
        >
          <div
            class="ods-file-uploader__dropzone"
            data-testid="ods-file-uploader-dropzone"
            role="button"
            tabindex="0"
          >
            <div
              class="ods-file-uploader__trigger"
            >
              <div
                class="ods-file-uploader__trigger-icon"
              >
                mock-icon
              </div>
              <div
                class="ods-file-uploader__title"
              >
                <span>
                  Drop your files here or
                </span>
                <a
                  class="ods-link ods-link--md ods-link--primary"
                >
                  <span
                    class="ods-link__content"
                  >
                    select from computer
                  </span>
                </a>
              </div>
              <div
                class="ods-file-uploader__title--mobile"
              >
                <a
                  class="ods-link ods-link--md ods-link--primary"
                >
                  <span
                    class="ods-link__content"
                  >
                    Select one or more files
                  </span>
                </a>
              </div>
              <div
                class="ods-file-uploader__subtitle"
              >
                File type and size description.
              </div>
              <input
                autocomplete="off"
                multiple=""
                style="display: none;"
                tabindex="-1"
                type="file"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

test('renders element properly in pt-br', () => {
  const { container } = render(
    <FileUploader
      data-testid="upload-test"
      language="pt-br"
      className="custom-class"
    />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <div
        class="ods-form-control__element"
      >
        <div
          class="ods-file-uploader custom-class"
        >
          <div
            class="ods-file-uploader__dropzone"
            data-testid="ods-file-uploader-dropzone"
            role="button"
            tabindex="0"
          >
            <div
              class="ods-file-uploader__trigger"
            >
              <div
                class="ods-file-uploader__trigger-icon"
              >
                mock-icon
              </div>
              <div
                class="ods-file-uploader__title"
              >
                <span>
                  Arraste e solte o arquivo aqui ou
                </span>
                <a
                  class="ods-link ods-link--md ods-link--primary"
                >
                  <span
                    class="ods-link__content"
                  >
                    selecione do computador
                  </span>
                </a>
              </div>
              <div
                class="ods-file-uploader__title--mobile"
              >
                <a
                  class="ods-link ods-link--md ods-link--primary"
                >
                  <span
                    class="ods-link__content"
                  >
                    Selecione um ou mais arquivos
                  </span>
                </a>
              </div>
              <div
                class="ods-file-uploader__subtitle"
              >
                Formato PDF. Tamanho máximo de 20MB.
              </div>
              <input
                autocomplete="off"
                multiple=""
                style="display: none;"
                tabindex="-1"
                type="file"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

test('renders accept a droped file', async () => {
  const mockOnAdd = jest.fn();
  render(
    <FileUploader
      data-testid="upload-test"
      onAdd={mockOnAdd}
      className="custom-class"
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });
  fireEvent.drop(inputEl);
  expect(await screen.findByText('ping.json')).toBeInTheDocument();
  expect(await screen.findByText('mock-icon-idle')).toBeInTheDocument();
  expect(mockOnAdd).toBeCalled();
});

test('renders accept custom validation', async () => {
  const mockValidation = jest.fn();
  render(
    <FileUploader
      data-testid="upload-test"
      validation={mockValidation}
      className="custom-class"
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });
  fireEvent.drop(inputEl);
  expect(await screen.findByText('ping.json')).toBeInTheDocument();
  expect(await screen.findByText('mock-icon-idle')).toBeInTheDocument();
  expect(mockValidation).toBeCalled();
});

test('delete file after added it', async () => {
  const mockonRemoveFile = jest.fn();
  render(
    <FileUploader
      data-testid="upload-test"
      className="custom-class"
      onRemoveFile={mockonRemoveFile}
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });
  fireEvent.drop(inputEl);
  expect(await screen.findByText('ping.json')).toBeInTheDocument();
  expect(await screen.findByText('mock-icon-idle')).toBeInTheDocument();

  fireEvent.click(screen.getByText('mock-icon-remove'));

  await new Promise((r) => setTimeout(r, 300));

  expect(screen.queryAllByText('ping.json').length).toBe(0);
  expect(screen.queryAllByText('mock-icon-idle').length).toBe(0);
  expect(mockonRemoveFile).toBeCalled();
});

test('delete file after reject it', async () => {
  render(
    <FileUploader
      data-testid="upload-test"
      className="custom-class"
      accept="image/*"
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });
  fireEvent.drop(inputEl);
  expect(await screen.findByText('ping.json')).toBeInTheDocument();

  fireEvent.click(screen.getByText('mock-icon-remove'));

  await new Promise((r) => setTimeout(r, 300));

  expect(screen.queryAllByText('ping.json').length).toBe(0);
});

test('reload file after added it', async () => {
  const mockonAdd = jest.fn().mockResolvedValue(43);
  const mockonReloadFile = jest.fn();
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });

  render(
    <FileUploader
      data-testid="upload-test"
      className="custom-class"
      value={[file]}
      filesState={[
        {
          file,
          state: 'error',
          message: 'message from server with error',
        },
      ]}
      onReloadFile={mockonReloadFile}
      onAdd={mockonAdd}
    />
  );

  fireEvent.click(screen.getByText('mock-icon-reload'));
  expect(mockonReloadFile).toBeCalled();
});

test('renders reject by invalid type a droped file', async () => {
  render(
    <FileUploader
      data-testid="upload-test"
      className="custom-class"
      accept="image/*"
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });
  fireEvent.drop(inputEl);
  expect(await screen.findByText('ping.json')).toBeInTheDocument();
  expect(await screen.findByText('mock-icon-warning')).toBeInTheDocument();
});

test('prevents to send same file twice', async () => {
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });

  render(
    <FileUploader
      data-testid="upload-test"
      value={[file]}
      className="custom-class"
      maxFiles={1}
    />
  );

  const inputEl = screen.queryAllByRole('button')[0];

  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });

  fireEvent.drop(inputEl);

  expect(await screen.findByText('ping.json')).toBeInTheDocument();
  expect(await screen.queryAllByText('mock-icon-warning').length).toBe(1);
});

test('renders reject by max files a droped file', async () => {
  render(
    <FileUploader
      data-testid="upload-test"
      className="custom-class"
      maxFiles={1}
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  const file2 = new File(['file'], 'pong.json', {
    type: 'application/json',
  });

  Object.defineProperty(inputEl, 'files', {
    value: [file, file2],
  });

  fireEvent.drop(inputEl);

  expect(await screen.findByText('ping.json')).toBeInTheDocument();
  expect(await screen.queryAllByText('mock-icon-warning').length).toBe(2);
});

test('renders changes drag start and end event', async () => {
  render(
    <FileUploader
      data-testid="upload-test"
      className="custom-class"
      maxFiles={1}
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  const file2 = new File(['file'], 'pong.json', {
    type: 'application/json',
  });

  Object.defineProperty(inputEl, 'files', {
    value: [file, file2],
  });

  function dispatchEvt(node: Element, type: string, data: File[]) {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, data);
    fireEvent(node, event);
  }

  dispatchEvt(inputEl, 'dragenter', [file, file2]);

  dispatchEvt(inputEl, 'dragleave', [file, file2]);

  fireEvent.drop(inputEl);

  expect(await screen.findByText('ping.json')).toBeInTheDocument();
  expect(await screen.queryAllByText('mock-icon-warning').length).toBe(2);
});

test('renders reject by max size a droped file', async () => {
  render(
    <FileUploader
      data-testid="upload-test"
      className="custom-class"
      maxSize={100}
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1 });

  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });

  fireEvent.drop(inputEl);

  expect(await screen.findByText('ping.json')).toBeInTheDocument();
  expect(await screen.findByText('mock-icon-warning')).toBeInTheDocument();
});

test('renders reject by min size a droped file', async () => {
  render(
    <FileUploader
      data-testid="upload-test"
      className="custom-class"
      minSize={100000}
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  Object.defineProperty(file, 'size', { value: 1024 });

  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });

  fireEvent.drop(inputEl);

  expect(await screen.findByText('ping.json')).toBeInTheDocument();
  expect(await screen.findByText('mock-icon-warning')).toBeInTheDocument();
});

test('renders reject by name length a droped file', async () => {
  render(
    <FileUploader
      data-testid="upload-test"
      className="custom-class"
      maxLength={5}
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'toolongtouploadtoolongtoupload.json', {
    type: 'application/json',
  });

  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });

  fireEvent.drop(inputEl);

  expect(
    await screen.findByText('toolongtouploadtoolongtoupload.json')
  ).toBeInTheDocument();
  expect(await screen.findByText('mock-icon-warning')).toBeInTheDocument();
});

test('executes changes after  droped file', async () => {
  const mockedChange = jest.fn();

  render(
    <FileUploader
      data-testid="upload-test"
      className="custom-class"
      name="test-upload"
      onChange={mockedChange}
    />
  );

  const inputEl = screen.getByRole('button');
  const file = new File(['file'], 'ping.json', {
    type: 'application/json',
  });
  Object.defineProperty(inputEl, 'files', {
    value: [file],
  });
  fireEvent.drop(inputEl);

  expect(mockedChange).toBeCalledWith({
    target: {
      name: 'test-upload',
      value: [],
    },
  });
});
