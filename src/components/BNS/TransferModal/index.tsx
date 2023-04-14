import { Modal } from 'react-bootstrap';
import { StyledTransferModal } from './TransferModal.styled';
import IconSVG from '@/components/IconSVG';
import IcCloseModal from '@/assets/icons/ic-close.svg';
import { WrapInput } from '@/pages/collection/ModalEdit/ModalMint.styled';
import { Formik } from 'formik';
import Text from '@/components/Text';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useTransferName from '@/hooks/contract-operations/bns/useTransferName';
import Button from '@/components/Button';

type Props = {
  show: boolean;
  handleClose: () => void;
  name: string;
};

type IFormValue = {
  address: string;
};

const BNSTransferModal = (props: Props) => {
  const { show, handleClose, name } = props;
  const [isProcessing, setIsProcessing] = useState(false);
  const { run } = useContractOperation({
    operation: useTransferName,
  });

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.address) {
      errors.name = 'TC address is required.';
    }

    return errors;
  };

  const handleSubmit = async (values: IFormValue): Promise<void> => {
    const { address } = values;
    try {
      setIsProcessing(true);
      await run({
        to: address,
        name: name,
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
    <StyledTransferModal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <IconSVG className="cursor-pointer" onClick={handleClose} src={IcCloseModal} maxWidth={'22px'} />
      </Modal.Header>
      <Modal.Body>
        <h5 className="font-medium mb-24">Transfer Name</h5>
        <Formik
          key="transfer"
          initialValues={{
            address: '',
          }}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <WrapInput>
                <label htmlFor="address" className="label">
                  TRANSFER NAME TO
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className="input"
                  placeholder={`Paste TC wallet address here`}
                />
                {errors.address && touched.address && <p className="error">{errors.address}</p>}
              </WrapInput>
              {/* <div className="divider"></div>
              <div className="est-fee">
                <Text size="large" fontWeight="medium" className="est-fee-text" color="bg1">
                  Estimated fee
                </Text>
                <div className="est-fee-value">
                  <div className="icCopy" onClick={() => onClickCopy(feeEsitmate)}>
                    <IconSVG src={IcCopy} color="bg2" type="stroke"></IconSVG>
                  </div>
                  <Text size="large" fontWeight="medium" color="bg2">
                    {feeEsitmate} TC
                  </Text>
                </div>
              </div> */}
              <Button disabled={isProcessing} type="submit" className="transfer-btn">
                <Text size="medium" fontWeight="medium" className="transfer-text">
                  {isProcessing ? 'Processing...' : 'Transfer'}
                </Text>
              </Button>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </StyledTransferModal>
  );
};

export default BNSTransferModal;
