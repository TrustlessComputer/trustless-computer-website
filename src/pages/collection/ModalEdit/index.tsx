import Button from '@/components/Button';
import Text from '@/components/Text';
import { ICollection } from '@/interfaces/api/collection';
import { Title, WrapInput } from '@/modules/Dapps/Collections/ModalCreate/ModalCreate.styled';
import { Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import { StyledModalUpload } from './ModalMint.styled';

type Props = {
  collection: ICollection;
  show: boolean;
  handleClose: () => void;
};

interface IFormValue {
  name: string;
  description: string;
}

const ModalEdit = (props: Props) => {
  const { show = false, handleClose, collection } = props;

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.name) {
      errors.name = 'Name is required.';
    }
    if (!values.description) {
      errors.description = 'Description is required.';
    }

    return errors;
  };

  const handleSubmit = async (values: IFormValue): Promise<void> => {
    const { name, description } = values;
  };

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered>
      {/* <Modal.Header>
        <IconSVG className="cursor-pointer" onClick={handleClose} src={IcCloseModal} maxWidth={'22px'} />
      </Modal.Header> */}
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
                <p className="title-input">Enter name</p>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="input"
                  placeholder={`Enter collection name`}
                />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
              </WrapInput>

              <WrapInput>
                <p className="title-input">Enter description</p>
                <input
                  id="symbol"
                  type="text"
                  name="symbol"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  className="input"
                  placeholder={`Enter collection description`}
                />
                {errors.description && touched.description && <p className="error">{errors.description}</p>}
              </WrapInput>

              <div>
                <Button className="confirm-btn">
                  <Text size="medium" fontWeight="medium" className="confirm-text">
                    Cancel
                  </Text>
                </Button>
                <Button className="confirm-btn">
                  <Text size="medium" fontWeight="medium" className="confirm-text">
                    Confirm
                  </Text>
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>{/* <Button onClick={handleClose}>Save Changes</Button> */}</Modal.Footer>
    </StyledModalUpload>
  );
};

export default ModalEdit;
