import IcCloseModal from '@/assets/icons/ic-close.svg';
import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import { StyledModalUpload, WrapInput } from './ModalCreate.styled';
import { BFS_ADDRESS } from '@/configs';

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

  const handleSubmit = async (values: IFormValue): Promise<void> => {};

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered>
      <Modal.Header>
        <IconSVG className="cursor-pointer" onClick={handleClose} src={IcCloseModal} maxWidth={'22px'} />
      </Modal.Header>
      <Modal.Body>
        <h5 className="font-medium">Create BRC-721</h5>
        <Formik
          key="create"
          initialValues={{
            name: '',
            symbol: '',
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
                  placeholder={`Enter name`}
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

              <div className="upload-fee">
                <Text size="regular">Fee create</Text>
                {/* TODO: Update to correct price */}
                <Text size="regular" fontWeight="semibold">
                  0.000214 BTC + 0.000214 TC
                </Text>
              </div>
              <Button type="submit" className="confirm-btn">
                <Text size="medium" fontWeight="medium" className="confirm-text">
                  Create
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
