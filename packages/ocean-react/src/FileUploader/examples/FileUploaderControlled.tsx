import React from 'react';
import Typography from '../../Typography';
import { Formik, ErrorMessage, FormikValues } from 'formik';
import * as yup from 'yup';
import FileUploader from '../FileUploader';
import { Col, Row } from '../../Grid';
import Button from '../../Button';

export type FilesState = {
  file: File;
  state: 'idle' | 'loading' | 'error' | 'success' | 'warning';
};

const FileUploaderControlled: React.FC = (props) => {
  const [filesState, setfilesState] = React.useState<FilesState[]>([]);

  const formik = {
    initialValues: {
      files: [],
      novo: '',
    },
    validationSchema: yup.object({
      files: yup
        .array()
        .min(
          1,
          'A file is require (this is a form level validation, not in the input)'
        ),
    }),
    onSubmit: (values: FormikValues) => {
      setfilesState(
        values.files.map((e: File) => ({
          file: e,
          state: 'loading',
        }))
      );

      setTimeout(() => {
        if (
          confirm(
            `This alert simulates the server side code, if you press 'yes' it will accept the file, if you cancel, it will set a error to the file upload: 
          \n
          files to upload: ${values.files.length}`
          ) == true
        ) {
          setfilesState(
            values.files.map((e: File) => ({
              file: e,
              state: 'success',
            }))
          );
        } else {
          setfilesState(
            values.files.map((e: File) => ({
              file: e,
              state: 'error',
              message: 'Message from server with error.',
            }))
          );
        }
      }, 1000);
    },
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
      <Col
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <Formik {...formik}>
          {({ errors, touched, values, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <Row style={{ margin: '16px 0px' }}>
                <FileUploader
                  id="input-with-icon"
                  name="files"
                  filesState={filesState}
                  error={!!(errors.files && touched.files)}
                  {...props}
                  value={values.files}
                  onChange={(e) => {
                    handleChange(e);
                    console.log(e);
                  }}
                />
                <ErrorMessage
                  name="files"
                  render={(msg) => (
                    <Typography
                      variant="caption"
                      style={{ color: '#f5456e', margin: '16px 0' }}
                    >
                      {msg}
                    </Typography>
                  )}
                />
              </Row>

              <Row style={{ margin: '16px 0px' }}>
                <Button variant="secondary" blocked tabIndex={-1}>
                  Send
                </Button>
              </Row>
            </form>
          )}
        </Formik>
      </Col>
    </div>
  );
};

export default FileUploaderControlled;
