import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { MINT_TOOL_MAX_FILE_SIZE } from '@/constants/config';
import { prettyPrintBytes } from '@/utils/units';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import { StyledModalUpload } from './ModalUpload.styled';
import DefaultUploadImage from '@/assets/img/default-upload-img.png';
import IcCheck from '@/assets/icons/ic-check.svg';
import IcCloseModal from '@/assets/icons/ic-close.svg';
import Button from '@/components/Button';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import usePreserveChunks, { IPreserveChunkParams } from '@/hooks/contract-operations/artifacts/usePreserveChunks';
import { useWeb3React } from '@web3-react/core';
import { readFileAsBuffer } from '@/utils';
import { WalletContext } from '@/contexts/wallet-context';
import MediaPreview from '@/components/ThumbnailPreview/MediaPreview';

type Props = {
  show: boolean;
  handleClose: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
};

const ModalUpload = (props: Props) => {
  const { account } = useWeb3React();
  const { show = false, handleClose, file, setFile } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { run } = useContractOperation<IPreserveChunkParams, string | null>({
    operation: usePreserveChunks,
  });

  const handleUploadFile = async () => {
    if (!account || !file) return;

    const fileBuffer = await readFileAsBuffer(file);

    run({
      address: account,
      chunks: fileBuffer,
    });
  };

  const onChangeFile = (file: File): void => {
    setFile(file);
    setError('');
    // onChange(file);
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

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered>
      <Modal.Header>
        <IconSVG className="cursor-pointer" onClick={handleClose} src={IcCloseModal} maxWidth={'22px'} />
      </Modal.Header>
      <Modal.Body>
        <h5 className="font-medium">Upload file</h5>
        <FileUploader
          handleChange={onChangeFile}
          name={'fileUploader'}
          maxSize={0.35}
          onSizeError={onSizeError}
          // onTypeError={onTypeError}
          // fileOrFiles={fileOrFiles}
          classes={'dropZone'}
          // types={fileTypes}
        >
          <>
            {file && (
              <div className="preview-wrapper">
                {preview ? (
                  // <img src={preview} alt="thumbnail preview" />
                  <div className="thumbnail-wrapper">
                    <MediaPreview previewExt={file?.name?.split('.')?.pop() || ''} previewUrl={preview} />
                  </div>
                ) : (
                  <img src={DefaultUploadImage} alt="default upload image"></img>
                )}
                <div className="file-upload-name">
                  <Text size={'regular'} color="bg1">{`${file.name} (${prettyPrintBytes(file.size)})`}</Text>
                  {!error && <IconSVG src={IcCheck} maxWidth={'20px'} color="#00AA6C" />}
                </div>
              </div>
            )}

            {error && <p className={'error-text'}>{error}</p>}
          </>
        </FileUploader>
        {file && !error && (
          <>
            <div className="upload-fee">
              <Text size="regular">Fee upload</Text>
              {/* TODO: Update to correct price */}
              <Text size="regular" fontWeight="semibold">
                0.000214 BTC + 0.000214 Juice
              </Text>
            </div>
            <Button className="confirm-btn" onClick={handleUploadFile}>
              <Text size="medium" fontWeight="medium" className="confirm-text">
                Confirm
              </Text>
            </Button>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>{/* <Button onClick={handleClose}>Save Changes</Button> */}</Modal.Footer>
    </StyledModalUpload>
  );
};

export default ModalUpload;
