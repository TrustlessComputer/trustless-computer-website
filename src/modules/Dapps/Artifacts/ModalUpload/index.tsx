import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { MINT_TOOL_MAX_FILE_SIZE } from '@/constants/config';
import { prettyPrintBytes } from '@/utils/units';
import { useEffect, useState } from 'react';
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
import MediaPreview from '@/components/ThumbnailPreview/MediaPreview';
import { Transaction } from 'ethers';
import toast from 'react-hot-toast';

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
  const { run } = useContractOperation<IPreserveChunkParams, Promise<Transaction | null>>({
    operation: usePreserveChunks,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUploadFile = async () => {
    if (!account || !file) return;
    try {
      setIsProcessing(true);
      const fileBuffer = await readFileAsBuffer(file);

      await run({
        address: account,
        chunks: fileBuffer,
      });
    } catch (err: unknown) {
      toast.error((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

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
          classes={'dropZone'}
        >
          <>
            {file && (
              <div className="preview-wrapper">
                {preview ? (
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
            {/* <div className="upload-fee">
              <Text size="regular">Fee upload</Text>
              <Text size="regular" fontWeight="semibold">
                0.000214 BTC + 0.000214 Juice
              </Text>
            </div> */}
            <Button disabled={isProcessing} className="confirm-btn" onClick={handleUploadFile}>
              <Text size="medium" fontWeight="medium" className="confirm-text">
                {isProcessing ? 'Processing...' : 'Confirm'}
              </Text>
            </Button>
          </>
        )}
      </Modal.Body>
    </StyledModalUpload>
  );
};

export default ModalUpload;
