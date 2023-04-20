import IcCloseModal from '@/assets/icons/ic-close.svg';
import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import { StyledModalUpload, Title, WrapInput } from './ModalCreate.styled';
import { useState } from 'react';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useCreateNFTCollection, {
  ICreateNFTCollectionParams,
} from '@/hooks/contract-operations/nft/useCreateNFTCollection';
import { DeployContractResponse } from '@/interfaces/contract-operation';
import toast from 'react-hot-toast';
import { FileUploader } from 'react-drag-drop-files';
import { MINT_TOOL_MAX_FILE_SIZE } from '@/constants/config';
import IcCheck from '@/assets/icons/ic-check.svg';
import {
  fileToBase64,
  getFileExtensionByFileName,
  isERC721SupportedExt,
  prettyPrintBytes,
  readFileAsBuffer,
  unzipFile,
} from '@/utils';
import { BLOCK_CHAIN_FILE_LIMIT, ZIP_EXTENSION } from '@/constants/file';
import { Buffer } from 'buffer';

interface IFormValue {
  name: string;
}

type Props = {
  show: boolean;
  handleClose: () => void;
};

const ModalCreate = (props: Props) => {
  const { show = false, handleClose } = props;
  const [isProcessing, setIsProcessing] = useState(false);
  const { run } = useContractOperation<ICreateNFTCollectionParams, DeployContractResponse | null>({
    operation: useCreateNFTCollection,
  });
  const [file, setFile] = useState<File | null>(null);

  const onChangeFile = (file: File): void => {
    setFile(file);
  };

  const onSizeError = (): void => {
    toast.error(`File size error, maximum file size is ${MINT_TOOL_MAX_FILE_SIZE * 1000}KB.`);
  };

  const handleSingleFile = async (file: File): Promise<Array<Array<Buffer>>> => {
    const obj = {
      image: await fileToBase64(file),
    };
    console.log('json', JSON.stringify(obj));
    const chunks = Buffer.from(JSON.stringify(obj));
    const chunkItem = [chunks];
    return [chunkItem];
  };

  const handleZipFile = async (file: File): Promise<Array<Array<Buffer>>> => {
    const files: Record<string, Blob> = await unzipFile(file);
    let listOfChunks: Array<Array<Buffer>> = [];
    let currentChunks: Array<Buffer> = [];
    let currentBatchSize = 0;

    // Create batch of chunks
    for (const fileName in files) {
      const blob = files[fileName];
      const obj = {
        image: await fileToBase64(blob),
      };
      const chunks = Buffer.from(JSON.stringify(obj));
      const chunksSizeInKb = Buffer.byteLength(chunks) / 1000;
      if (chunksSizeInKb > BLOCK_CHAIN_FILE_LIMIT * 1000) {
        throw Error(`File size error, maximum file size is ${BLOCK_CHAIN_FILE_LIMIT * 1000}kb.`);
      }
      if (currentBatchSize + chunksSizeInKb >= BLOCK_CHAIN_FILE_LIMIT * 1000) {
        // Split chunks and reset counter
        listOfChunks.push([...currentChunks]);
        currentChunks = [];
        currentBatchSize = 0;
        console.log('batch number', listOfChunks.length);
      }
      currentBatchSize += chunksSizeInKb;
      currentChunks.push(chunks);
      console.log('currentBatchSize', currentBatchSize);
    }

    console.log('batch number', listOfChunks.length);
    listOfChunks.push([...currentChunks]);
    console.log('listOfChunks', listOfChunks);

    return listOfChunks;
  };

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.name) {
      errors.name = 'Name is required.';
    }

    return errors;
  };

  const handleSubmit = async (values: IFormValue): Promise<void> => {
    const { name } = values;

    try {
      let listOfChunks: Array<Array<Buffer>> = [];
      setIsProcessing(true);
      if (file) {
        const fileName = file.name;
        const fileExt = getFileExtensionByFileName(fileName);
        if (!isERC721SupportedExt(fileExt)) {
          toast.error('Unsupported file extension.');
          return;
        }

        if (fileExt === ZIP_EXTENSION) {
          listOfChunks = await handleZipFile(file);
        } else {
          listOfChunks = await handleSingleFile(file);
        }
      }

      await run({
        name,
        listOfChunks,
      });
      toast.success('Transaction has been created. Please wait for few minutes.');
      handleClose();
    } catch (err) {
      toast.error((err as Error).message);
      console.log(err);
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
        <Title className="font-medium">Create BRC-721</Title>
        <Formik
          key="create"
          initialValues={{
            name: '',
            symbol: '',
          }}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <WrapInput>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="input"
                  placeholder={`Enter name`}
                />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
              </WrapInput>

              <FileUploader
                handleChange={onChangeFile}
                name={'fileUploader'}
                maxSize={MINT_TOOL_MAX_FILE_SIZE}
                onSizeError={onSizeError}
                classes={'dropZone'}
                types={['png', 'jpeg', 'jpg', 'zip']}
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
                      <p>Choose a file to mint (optional)</p>
                    </div>
                  )}
                </>
              </FileUploader>

              <Button disabled={isProcessing} type="submit" className="confirm-btn">
                <Text size="medium" fontWeight="medium" className="confirm-text">
                  {isProcessing ? 'Processing...' : 'Create'}
                </Text>
              </Button>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </StyledModalUpload>
  );
};

export default ModalCreate;
