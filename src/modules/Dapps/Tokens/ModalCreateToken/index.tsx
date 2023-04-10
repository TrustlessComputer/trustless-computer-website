import IcCloseModal from '@/assets/icons/ic-close.svg';
import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import { StyledModalUpload, Title, WrapInput } from '../../Collections/ModalCreate/ModalCreate.styled';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useCreateToken, { ICreateTokenParams } from '@/hooks/contract-operations/token/useCreateToken';
import { DeployContractResponse } from '@/interfaces/contract-operation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  show: boolean;
  handleClose: () => void;
};

interface IFormValue {
  name: string;
  symbol: string;
  supply: string;
}

const ModalCreateToken: React.FC<Props> = (props: Props) => {
  const { show, handleClose } = props;
  const [isProcessing, setIsProcessing] = useState(false);
  const { run } = useContractOperation<ICreateTokenParams, Promise<DeployContractResponse | null>>({
    operation: useCreateToken,
  });

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.name) {
      errors.name = 'Name is required.';
    }
    if (!values.symbol) {
      errors.symbol = 'Symbol is required.';
    }

    if (!values.supply) {
      errors.supply = 'Max supply is required.';
    }

    return errors;
  };

  const handleSubmit = async (values: IFormValue): Promise<void> => {
    const { name, symbol, supply } = values;

    try {
      setIsProcessing(true);
      await run({
        name,
        symbol,
        maxSupply: Number(supply),
      });
      toast.success('Transaction has been created. Please wait for minutes.');
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
        <Title className="font-medium">Create BRC-20</Title>
        <Formik
          key="create"
          initialValues={{
            name: '',
            symbol: '',
            supply: '',
          }}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
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
                  placeholder={`Enter token name`}
                />
                {errors.name && <p className="error">{errors.name}</p>}
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
                {errors.symbol && <p className="error">{errors.symbol}</p>}
              </WrapInput>

              <WrapInput>
                <input
                  id="supply"
                  type="text"
                  name="supply"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.supply}
                  className="input"
                  placeholder={`Enter max supply`}
                />
                {errors.supply && <p className="error">{errors.supply}</p>}
              </WrapInput>

              {/* <div className="upload-fee">
                <Text size="regular">Fee create</Text>
                <Text size="regular" fontWeight="semibold">
                  0.000214 BTC + 0.000214 TC
                </Text>
              </div> */}
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

export default ModalCreateToken;
