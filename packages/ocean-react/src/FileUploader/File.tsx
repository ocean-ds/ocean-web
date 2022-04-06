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
  status: 'idle' | 'loading' | 'error' | 'success' | 'warning';
  file: File;
  reloadTooltip?: string;
  removeTooltip?: string;
  className?: string;
  onRemove?: (file: File) => void;
  onReload?: (file: File) => void;
};

const File: React.FunctionComponent<FileProps> = ({
  status,
  file,
  reloadTooltip,
  removeTooltip,
  className,
  onRemove,
  onReload,
}: FileProps) => {
  const statusIcon = React.useMemo(() => {
    return {
      loading: (
        <div className="ods-file-uploader__file-loading">
          <Progress size="sm" />
        </div>
      ),
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
        `ods-file-uploader__file--${status}`,
        className
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
