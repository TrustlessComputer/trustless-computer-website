import Button from '@/components/Button';
import Text from '@/components/Text';
import { ICollection } from '@/interfaces/api/collection';
import { Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import { StyledModalUpload, Title, WrapInput } from './ModalMint.styled';
import IconSVG from '@/components/IconSVG';
import IcCloseModal from '@/assets/icons/ic-close.svg';
import { useState, useEffect } from 'react';
import { MINT_TOOL_MAX_FILE_SIZE } from '@/constants/config';
import { FileUploader } from 'react-drag-drop-files';
import DefaultUploadImage from '@/assets/img/default-upload-img.png';
import MediaPreview from '@/components/ThumbnailPreview/MediaPreview';
import IcUpload from '@/assets/icons/ic_upload_image.svg';
import toast from 'react-hot-toast';
import { readFileAsBuffer } from '@/utils/file';

type Props = {
  collection: ICollection;
  show: boolean;
  handleClose: () => void;
  onUpdateSuccess: () => void;
};

interface IFormValue {
  name: string;
  description: string;
}

const ModalEdit = (props: Props) => {
  const { show = false, handleClose, collection, onUpdateSuccess } = props;

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const onChangeFile = (file: File): void => {
    setFile(file);
    setError('');
  };

  const onSizeError = (): void => {
    setError(`File size error, maximum file size is ${MINT_TOOL_MAX_FILE_SIZE * 1000}KB.`);
    setPreview(null);
  };

  useEffect(() => {
    if (file) {
      const fileSizeInKb = file.size / 1024;
      if (fileSizeInKb > MINT_TOOL_MAX_FILE_SIZE * 1000) {
        onSizeError();
      } else {
        setPreview(URL.createObjectURL(file));
      }
    }
  }, [file]);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.name) {
      errors.name = 'Name is required.';
    }
    // if (!values.description) {
    //   errors.description = 'Description is required.';
    // }

    return errors;
  };

  const handleSubmit = async (values: IFormValue): Promise<void> => {
    const { name, description } = values;
    try {
      setIsProcessing(true);
      let fileBuffer;
      if (file) {
        fileBuffer = await readFileAsBuffer(file);
      }

      // onUpdateSuccess();
      // toast.success('Your collection has been updated successfully');
    } catch (error) {
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered>
      <Modal.Header>
        <IconSVG className="cursor-pointer" onClick={handleClose} src={IcCloseModal} maxWidth={'22px'} />
      </Modal.Header>
      <Modal.Body>
        <Title className="font-medium">Edit project: {collection.name}</Title>
        <Formik
          key="create"
          initialValues={{
            name: collection.name,
            description: collection.description,
          }}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <WrapInput>
                <p className="title-input">Collection name</p>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="input"
                  placeholder={`Enter collection name`}
                  disabled={isProcessing}
                />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
              </WrapInput>

              <WrapInput>
                <p className="title-input">Description</p>
                <textarea
                  id="description"
                  // type="text"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  className="input"
                  placeholder={`Enter description`}
                  disabled={isProcessing}
                />
                {errors.description && touched.description && <p className="error">{errors.description}</p>}
              </WrapInput>

              <div>
                <div className="preview-wrapper">
                  {preview ? (
                    <div className="thumbnail-wrapper">
                      <MediaPreview previewExt={file?.name?.split('.')?.pop() || ''} previewUrl={preview} />
                    </div>
                  ) : (
                    <img src={collection.thumbnail || DefaultUploadImage} alt="default upload image"></img>
                  )}
                </div>

                <FileUploader
                  handleChange={onChangeFile}
                  name={'fileUploader'}
                  maxSize={0.35}
                  onSizeError={onSizeError}
                  classes={'dropZone'}
                  types={['png', 'jpeg', 'jpg']}
                  disabled={isProcessing}
                >
                  <div className="upload-btn">
                    <IconSVG src={IcUpload} maxWidth={'22px'} />
                    <p className="upload-text">Upload thumbnail</p>
                  </div>
                </FileUploader>

                {error && <p className={'error-text'}>{error}</p>}
              </div>

              <Button type="submit" className="confirm-btn" disabled={isProcessing}>
                <Text size="medium" fontWeight="medium" className="confirm-text">
                  {isProcessing ? 'Updating...' : 'Update'}
                </Text>
              </Button>
            </form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>{/* <Button onClick={handleClose}>Save Changes</Button> */}</Modal.Footer>
    </StyledModalUpload>
  );
};

export default ModalEdit;
