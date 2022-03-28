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
  reloadTooltip?: string;
  removeTooltip?: string;
  onRemove?: (file: File) => void;
  onReload?: (file: File) => void;
};

const File: React.FunctionComponent<FileProps> = ({
  status = 'idle',
  file,
  reloadTooltip,
  removeTooltip,
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
            aria-label={reloadTooltip}
            className="ods-tooltip"
            data-tooltip-pos="up"
            onClick={() => {
              if (onReload) onReload(file);
            }}
          >
            <Refresh />
          </IconButton>
        )}
        <IconButton
          size="sm"
          aria-label={removeTooltip}
          className="ods-tooltip"
          data-tooltip-pos="up"
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
