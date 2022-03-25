import React from 'react';
import classNames from 'classnames';

import {
  X,
  Refresh,
  XCircle,
  ExclamationCircle,
  CheckCircle,
  DocumentText,
} from '@useblu/ocean-icons-react';

import Progress from '../Progress';
import IconButton from '../IconButton';

export type FileProps = {
  status?: 'idle' | 'loading' | 'error' | 'success' | 'warning';
  file: File;
  onRemove?: (file: File) => void;
  onReload?: (file: File) => void;
};

const File: React.FunctionComponent<FileProps> = ({
  status = 'idle',
  file,
  onRemove,
  onReload,
}: FileProps) => {
  const statusIcon = React.useMemo(() => {
    return {
      loading: <Progress size="sm" />,
      success: <CheckCircle />,
      error: <XCircle />,
      warning: <ExclamationCircle />,
      idle: <DocumentText />,
    }[status];
  }, [status]);

  return (
    <div
      className={classNames(
        'ods-file-uploader__file',
        `ods-file-uploader__file--${status}`
      )}
    >
      <div className="ods-file-uploader__file-status">{statusIcon}</div>
      <div className="ods-file-uploader__file-name">{file.name}</div>
      <div className="ods-file-uploader__file-actions">
        {status === 'error' && (
          <IconButton
            size="sm"
            onClick={() => {
              if (onReload) onReload(file);
            }}
          >
            <Refresh />
          </IconButton>
        )}
        <IconButton
          size="sm"
          onClick={() => {
            if (onRemove) onRemove(file);
          }}
        >
          <X />
        </IconButton>
      </div>
    </div>
  );
};

export default File;
