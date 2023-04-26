import IcCheck from '@/assets/icons/ic-check.svg';
import IcCloseModal from '@/assets/icons/ic-close.svg';
import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { CREATE_DAPP_MAX_FILE_SIZE } from '@/constants/config';
import { uploadFile } from '@/services/file';
import { createDappStore } from '@/services/store';
import { isValidHttpUrl, prettyPrintBytes } from '@/utils';
import { Formik } from 'formik';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import toast from 'react-hot-toast';
import { StyledModalUpload, Title, WrapInput, WrapBody } from './ModalCreateDapp.styled';

interface IFormValue {
  name: string;
  creator: string;
  desc: string;
  url: string;
}

type Props = {
  show: boolean;
  handleClose: () => void;
  handleCreateSuccess: () => void;
};

const ModalCreateDapp = (props: Props) => {
  const { show = false, handleClose, handleCreateSuccess } = props;
  const [isProcessing, setIsProcessing] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const onChangeFile = (file: File): void => {
    setFile(file);
  };

  const onSizeError = (): void => {
    toast.error(`File size error, maximum file size is ${CREATE_DAPP_MAX_FILE_SIZE * 1000}KB.`);
  };

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.name) {
      errors.name = 'Name is required.';
    }
    if (!values.creator) {
      errors.creator = 'Creator is required.';
    }
    if (!values.desc) {
      errors.desc = 'Description is required.';
    }
    if (!values.url) {
      errors.url = 'URL is required.';
    } else if (!isValidHttpUrl(values.url)) {
      errors.url = 'URL is invalid.';
    }

    return errors;
  };

  const handleSubmit = async (values: IFormValue): Promise<void> => {
    const { name, creator, desc, url: link } = values;
    if (file) {
      try {
        setIsProcessing(true);

        const data = await uploadFile({ file });
        if (data && data.url) {
          await createDappStore({ name, creator, desc, link, image: data.url });
          toast.success('Submission successful!. Your dapp is ready to go.');
        } else {
          toast.error('Failed to submit a Bitcoin dapp');
        }
        handleCreateSuccess();
        handleClose();
      } catch (err) {
        toast.error((err as Error).message);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered>
      <Modal.Header>
        <IconSVG className="cursor-pointer" onClick={handleClose} src={IcCloseModal} maxWidth={'22px'} />
      </Modal.Header>
      <Modal.Body>
        <Title>Submit your dapp on Bitcoin</Title>
        <Formik
          key="create"
          initialValues={{
            name: '',
            creator: '',
            desc: '',
            url: '',
          }}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <WrapBody>
                <div className="row-inputs">
                  <WrapInput>
                    <p className="title-input">Dapp name</p>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className="input"
                      placeholder={`Enter dapp name`}
                    />
                    {errors.name && touched.name && <p className="error">{errors.name}</p>}
                  </WrapInput>

                  <WrapInput>
                    <p className="title-input">Creator name</p>
                    <input
                      id="creator"
                      type="text"
                      name="creator"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.creator}
                      className="input"
                      placeholder={`Enter creator name`}
                    />
                    {errors.creator && touched.creator && <p className="error">{errors.creator}</p>}
                  </WrapInput>
                </div>

                <WrapInput>
                  <p className="title-input">Description</p>
                  <input
                    id="desc"
                    type="text"
                    name="desc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.desc}
                    className="input"
                    placeholder={`A description of your app, detailing features and functionality.`}
                  />
                  {errors.desc && touched.desc && <p className="error">{errors.desc}</p>}
                </WrapInput>

                <WrapInput>
                  <p className="title-input">URL</p>
                  <input
                    id="url"
                    type="text"
                    name="url"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.url}
                    className="input"
                    placeholder={`Enter URL`}
                  />
                  {errors.url && touched.url && <p className="error">{errors.url}</p>}
                </WrapInput>

                <FileUploader
                  handleChange={onChangeFile}
                  name={'fileUploader'}
                  maxSize={CREATE_DAPP_MAX_FILE_SIZE}
                  onSizeError={onSizeError}
                  classes={'dropZone'}
                  types={['png', 'jpeg', 'jpg']}
                >
                  <>
                    {file && (
                      <div className="upload-wrapper">
                        <p>{`${file.name} (${prettyPrintBytes(file.size)})`}</p>
                        <IconSVG src={IcCheck} maxWidth={'18px'} color="#00AA6C" />
                      </div>
                    )}
                    {!file && (
                      <div className="upload-wrapper">
                        <p>Dapp icon (PNG or JPG)</p>
                      </div>
                    )}
                  </>
                </FileUploader>

                <Button disabled={isProcessing || file === null} type="submit" className="confirm-btn">
                  <Text size="medium" fontWeight="medium" className="confirm-text">
                    {isProcessing ? 'Submiting...' : 'Submit'}
                  </Text>
                </Button>
              </WrapBody>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </StyledModalUpload>
  );
};

export default ModalCreateDapp;
