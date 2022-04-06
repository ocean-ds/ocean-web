import React from 'react';
import classNames from 'classnames';

import { pull, uniqBy, find } from 'lodash';

import { useDropzone, FileRejection, FileError } from 'react-dropzone';

import { UploadOutline } from '@useblu/ocean-icons-react';

import FormControl from '../FormControl';

import File from './File';
import Link from '../Link';
import i18nPtBr from './locales/pt-br.json';
import i18nEn from './locales/en.json';

export type FileState = {
  file: File;
  state: 'idle' | 'loading' | 'error' | 'success' | 'warning';
  message?: string;
};

export type FileChangeEvent = {
  target: {
    name: string | undefined;
    value: File[];
  };
};

export type FileUploaderProps = {
  title?: string;
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  callToAction?: string;
  callToActionMobile?: string;
  subtitle?: string;
  reloadTooltip?: string;
  removeTooltip?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxLength?: number;
  minSize?: number;
  maxSize?: number;
  accept?: string;
  filesState?: FileState[];
  language?: 'pt-br' | 'en';
  error?: boolean;
  disabled?: boolean;
  value?: File[];
  customLocale?: {
    [key: string]: string;
  };
  onAdd?: (e: FileChangeEvent) => void;
  onChange?: (e: FileChangeEvent) => void;
  onReloadFile?: (files: File) => void;
  onRemoveFile?: (files: File) => void;
  validation?: (files: File) => FileError | null;
};

const FileUploader: React.FunctionComponent<FileUploaderProps> = ({
  label,
  id,
  name,
  disabled,
  title,
  callToAction,
  callToActionMobile,
  subtitle,
  multiple = true,
  error = false,
  language = 'en',
  reloadTooltip,
  removeTooltip,
  customLocale,
  className,
  onChange,
  onAdd,
  onReloadFile,
  onRemoveFile,
  value,
  minSize,
  maxSize,
  filesState,
  validation,
  maxFiles,
  maxLength,
  accept,
}) => {
  const [isDrag, setDrag] = React.useState<boolean>(false);
  const [animationState, updateAnimationState] = React.useState<{
    [key: string]: string;
  }>({});
  const [rejectedFiles, setRejectedFiles] = React.useState<FileRejection[]>([]);
  const [files, setFiles] = React.useState<File[]>(value || []);

  const locale = customLocale || language === 'pt-br' ? i18nPtBr : i18nEn;

  React.useEffect(() => {
    const event: FileChangeEvent = {
      target: {
        name,
        value: files,
      },
    };
    if (onChange) onChange(event);

    // eslint-disable-next-line
  }, [files]);

  const erroMessage = (code: string) => {
    const codeToParam: { [key: string]: string } = {
      'file-invalid-type': `${accept}`,
      'file-too-large': `${maxSize}`,
      'file-too-small': `${minSize}`,
      'too-many-files': `${maxFiles}`,
      'name-too-large': `${maxLength}`,
      'already-added': '',
    };

    const validations = locale.validations as { [key: string]: string };
    return validations[code].replace('${param}', codeToParam[code]);
  };

  const getFileState = (file: File) => {
    const state = find(filesState, { file });
    return state || { state: 'idle', file };
  };

  const customValidator = (file: File): FileError | null => {
    if (find(files, { name: file.name })) {
      return {
        code: 'already-added',
        message: 'File already added',
      };
    }

    if (maxLength && file.name.length > maxLength) {
      return {
        code: 'name-too-large',
        message: `Name is larger than ${maxLength} characters`,
      };
    }

    if (validation) return validation(file);

    return null;
  };

  const { getInputProps, getRootProps } = useDropzone({
    multiple,
    maxFiles,
    minSize,
    maxSize,
    accept,
    validator: customValidator,
    onDragEnter: () => {
      setDrag(true);
    },
    onDragLeave: () => {
      setDrag(false);
    },
    onDropRejected: (dropedFiles: FileRejection[]) => {
      setDrag(false);
      setRejectedFiles((oldRejection: FileRejection[]) =>
        uniqBy(
          [
            ...(oldRejection as FileRejection[]),
            ...(dropedFiles as FileRejection[]),
          ],
          'file.name'
        )
      );
    },
    onDropAccepted: (dropedFiles) => {
      setDrag(false);
      setFiles((oldFiles: File[]) => [
        ...(oldFiles as File[]),
        ...(dropedFiles as File[]),
      ]);

      const event: FileChangeEvent = {
        target: {
          name,
          value: dropedFiles,
        },
      };
      if (onAdd) onAdd(event);
    },
  });

  return (
    <FormControl label={label} htmlFor={id} disabled={disabled}>
      <div
        className={classNames('ods-file-uploader', className, {
          'ods-file-uploader--error': error,
        })}
      >
        <div
          {...getRootProps({
            className: 'ods-file-uploader__dropzone',
          })}
          data-testid="ods-file-uploader-dropzone"
        >
          <div
            className={classNames('ods-file-uploader__trigger', {
              'ods-file-uploader__trigger--drag': isDrag,
            })}
          >
            <UploadOutline className="ods-file-uploader__trigger-icon" />
            <div className="ods-file-uploader__title">
              <span>{title || locale.title}</span>
              <Link>{callToAction || locale['call-to-action']}</Link>
            </div>
            <div className="ods-file-uploader__title--mobile">
              <Link>
                {callToActionMobile || locale['call-to-action-mobile']}
              </Link>
            </div>
            <div className="ods-file-uploader__subtitle">
              {subtitle || locale.subtitle}
            </div>
            <input type={'file'} {...getInputProps()} />
          </div>
        </div>

        {rejectedFiles.map((rejection) => (
          <>
            <File
              key={rejection.file.name}
              file={rejection.file}
              status="warning"
              reloadTooltip={reloadTooltip || locale['reload-tooltip']}
              removeTooltip={removeTooltip || locale['remove-tooltip']}
              className={animationState[rejection.file.name]}
              onRemove={() => {
                updateAnimationState((e) => ({
                  ...e,
                  [rejection.file.name]: 'removed',
                }));

                setTimeout(() => {
                  setRejectedFiles((oldRejections) => [
                    ...pull(oldRejections, rejection),
                  ]);
                }, 200);
              }}
            />

            {rejection.errors.map((e) => (
              <div className="ods-file-uploader__warning_message" key={e.code}>
                {erroMessage(e.code)}
              </div>
            ))}
          </>
        ))}

        {files.map((file) => {
          const fileState = getFileState(file);

          return (
            <>
              <File
                status={fileState.state}
                key={file.name}
                file={file}
                className={animationState[file.name]}
                reloadTooltip={reloadTooltip || locale['reload-tooltip']}
                removeTooltip={removeTooltip || locale['remove-tooltip']}
                onRemove={(f) => {
                  updateAnimationState((e) => ({
                    ...e,
                    [f.name]: 'removed',
                  }));
                  setTimeout(() => {
                    setFiles((oldFiles) => [...pull(oldFiles, file)]);
                  }, 200);

                  if (onRemoveFile) onRemoveFile(f);
                }}
                onReload={(f) => {
                  if (onReloadFile) onReloadFile(f);
                }}
              />

              {fileState.message && (
                <div
                  className={classNames(
                    `ods-file-uploader__${fileState.state}_message`
                  )}
                >
                  {fileState.message}
                </div>
              )}
            </>
          );
        })}
      </div>
    </FormControl>
  );
};

export default FileUploader;
