import React from 'react';

import FileUploader, { FileChangeEvent, FileState } from '../FileUploader';

const FileUploaderAuto: React.FC = (props) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [filesState, setfilesState] = React.useState<FileState[]>([]);

  const changeFileState = (newState: FileState) => {
    setfilesState((states: FileState[]) =>
      states.map((state: FileState) => {
        if (newState.file === state.file) return newState;
        return state;
      })
    );
  };

  const sendFile = (file: File) => {
    changeFileState({
      file: file,
      state: 'loading',
    });

    setTimeout(() => {
      if (
        confirm(
          `This alert simulates the server side code, if you press 'yes' it will accept the file, if you cancel, it will set a error to the file upload: 
        \n
        file to upload: ${file.name}`
        )
      ) {
        changeFileState({
          file: file,
          state: 'success',
        });
      } else {
        changeFileState({
          file: file,
          state: 'error',
          message: 'message from server with error',
        });
      }
    }, 1000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        margin: '16px 0px',
        maxWidth: '480px',
        width: '100%',
      }}
    >
      <FileUploader
        id="input-with-icon"
        name="files"
        value={files}
        filesState={filesState}
        onAdd={(e: FileChangeEvent) => {
          setfilesState((o) => {
            return [
              ...o,
              ...e.target.value.map(
                (f) => ({ file: f, state: 'loading' } as FileState)
              ),
            ];
          });
          e.target.value.forEach(sendFile);
        }}
        onRemoveFile={(file: File) => {
          alert(file.name + ' removed');
        }}
        onReloadFile={(file: File) => {
          sendFile(file);
        }}
        onChange={(e) => {
          setFiles(e.target.value);
        }}
        {...props}
      />
    </div>
  );
};

export default FileUploaderAuto;
