import React from 'react';
import Typography from '../../Typography';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import FileUploader from '../FileUploader';
import { Col, Row } from '../../Grid';
import Button from '../../Button';

const FileUploaderControlled: React.FC = (props) => {
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
    onSubmit: (values: any) => {
      alert(values.files);
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
        width: '480px',
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
