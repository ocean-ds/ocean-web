import React from 'react';
import { render } from '@testing-library/react';

import FileUploader from '../FileUploader';

jest.mock('@useblu/ocean-icons-react', () => ({
  UploadOutline: function UploadOutlineMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>mock-icon</div>;
  },
  X: function XMock(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>mock-icon</div>;
  },
  Refresh: function RefreshMock(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>mock-icon</div>;
  },
  XCircle: function XCircleMock(props: React.HTMLAttributes<HTMLDivElement>) {
    return <div {...props}>mock-icon</div>;
  },
  ExclamationCircle: function ExclamationCircleMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>mock-icon</div>;
  },
  DocumentText: function DocumentTextMock(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    return <div {...props}>mock-icon</div>;
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
                <a>
                  select from computer
                </a>
              </div>
              <div
                class="ods-file-uploader__title--mobile"
              >
                <a>
                  Select one or more files
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
