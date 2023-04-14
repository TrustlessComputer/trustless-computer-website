import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { StyledModalUpload, WrapInput, Title } from './TransferModal.styled';
import IcCloseModal from '@/assets/icons/ic-close.svg';
import Button from '@/components/Button';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import toast from 'react-hot-toast';
import { Formik } from 'formik';
import useTransferERC20Token from '@/hooks/contract-operations/token/useTransferERC20Token';
import isNumber from 'lodash/isNumber';

type Props = {
  show: boolean;
  handleClose: () => void;
  erc20TokenAddress?: string;
};

interface IFormValue {
  toAddress: string;
  amount: string;
}

const TransferModal = (props: Props) => {
  const { show = false, handleClose, erc20TokenAddress } = props;
  const { run } = useContractOperation({
    operation: useTransferERC20Token,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.toAddress) {
      errors.toAddress = 'Receiver wallet address is required.';
    }

    if (!values.amount) {
      errors.amount = 'Amount is required.';
    } else if (!isNumber(values.amount)) {
      errors.amount = 'Invalid amount. Amount must be a number.';
    } else if (parseFloat(values.amount) <= 0) {
      errors.amount = 'Invalid amount. Amount must be greater than 0.';
    }

    return errors;
  };

  const handleSubmit = async (values: IFormValue): Promise<void> => {
    if (!erc20TokenAddress) {
      toast.error('Token information not found');
      setIsProcessing(false);
      return;
    }

    const { toAddress, amount } = values;
    try {
      setIsProcessing(true);
      await run({
        amount: amount.toString(),
        to: toAddress,
        erc20TokenAddress: erc20TokenAddress,
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
        <Title>Transfer NFT</Title>

        <Formik
          key="create"
          initialValues={{
            toAddress: '',
            amount: '',
          }}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <WrapInput>
                <label htmlFor="toAddress" className="title-input">
                  TRANSFER NFT TO
                </label>
                <input
                  id="toAddress"
                  type="text"
                  name="toAddress"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.toAddress}
                  className="input"
                  placeholder={`Paste TC wallet address here`}
                />
                {errors.toAddress && touched.toAddress && <p className="error">{errors.toAddress}</p>}
              </WrapInput>

              <WrapInput>
                <label htmlFor="amount" className="title-input">
                  AMOUNT
                </label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                  className="input"
                  placeholder={`Enter the amount`}
                />
                {errors.amount && touched.amount && <p className="error">{errors.amount}</p>}
              </WrapInput>

              <Button disabled={isProcessing} type="submit" className="confirm-btn">
                <Text size="medium" fontWeight="medium" className="confirm-text">
                  {isProcessing ? 'Processing...' : 'Transfer'}
                </Text>
              </Button>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </StyledModalUpload>
  );
};

export default TransferModal;
