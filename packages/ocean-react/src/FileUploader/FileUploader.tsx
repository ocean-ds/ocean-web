import React from 'react';
import classNames from 'classnames';

import { pull, uniqBy, find } from 'lodash';

import {
  useDropzone,
  FileRejection,
  FileError,
  ErrorCode,
} from 'react-dropzone';

import { UploadOutline } from '@useblu/ocean-icons-react';

import FormControl from '../FormControl';

import File from './File';
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
  subtitle?: string;
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
  validation?: (files: File) => FileError | null;
};

const FileUploader: React.FunctionComponent<FileUploaderProps> = ({
  label,
  id,
  name,
  disabled,
  title,
  callToAction,
  subtitle,
  multiple = true,
  error = false,
  language = 'en',
  customLocale,
  className,
  onChange,
  onAdd,
  value,
  minSize,
  maxSize,
  filesState,
  validation,
  maxFiles,
  maxLength,
  accept,
}) => {
  const [isDrag, setDrag] = React.useState<Boolean>(false);
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
  }, [files]);

  const erroMessage = (code: string) => {
    if (accept && code === 'file-invalid-type')
      return locale.validations[code].replace('${param}', `${accept}`);
    if (code === 'file-too-large')
      return locale.validations[code].replace('${param}', `${maxSize}`);
    if (code === 'file-too-small')
      return locale.validations[code].replace('${param}', `${minSize}`);
    if (code === 'too-many-files')
      return locale.validations[code].replace('${param}', `${maxFiles}`);
    if (code === 'name-too-large')
      return locale.validations[code].replace('${param}', `${maxLength}`);
    if (code === 'already-added') return locale.validations[code];

    return '';
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

    if (maxFiles && files.length >= maxFiles) {
      return {
        code: ErrorCode.TooManyFiles,
        message: `Too many files, max is ${maxFiles}`,
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
        >
          <div
            className={classNames('ods-file-uploader__trigger', {
              'ods-file-uploader__trigger--drag': isDrag,
            })}
          >
            <UploadOutline className="ods-file-uploader__trigger-icon" />
            <div className="ods-file-uploader__title">
              <span>{title || locale.title}</span>
              <a>{callToAction || locale['call-to-action']}</a>
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
              onRemove={() => {
                setRejectedFiles((oldRejections) => [
                  ...pull(oldRejections, rejection),
                ]);
              }}
            />

            {rejection.errors.map((error) => (
              <div className="ods-file-uploader__warning_message">
                {erroMessage(error.code)}
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
                onRemove={() => {
                  setFiles((oldFiles) => [...pull(oldFiles, file)]);
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
