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

interface IFormValue {
  name: string;
  symbol: string;
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

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.name) {
      errors.name = 'Name is required.';
    }
    if (!values.symbol) {
      errors.symbol = 'Symbol is required.';
    }

    return errors;
  };

  const handleSubmit = async (values: IFormValue): Promise<void> => {
    const { name, symbol } = values;

    try {
      setIsProcessing(true);
      await run({
        name,
        symbol,
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

              <WrapInput>
                <input
                  id="symbol"
                  type="text"
                  name="symbol"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.symbol}
                  className="input"
                  placeholder={`Enter symbol`}
                />
                {errors.symbol && touched.symbol && <p className="error">{errors.symbol}</p>}
              </WrapInput>

              {/* <div className="upload-fee">
                <Text size="regular">Fee create</Text>
                <Text size="regular" fontWeight="semibold">
                  0.000214 BTC + 0.000214 TC
                </Text>
              </div> */}
              <Button type="submit" className="confirm-btn">
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
