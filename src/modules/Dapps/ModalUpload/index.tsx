import Button from '@/components/Button';
import { Modal } from 'react-bootstrap';
import { StyledModalUpload } from './ModalUpload.styled';
import icCloseModal from '@/assets/icons/ic-close-circle.svg';
import IconSVG from '@/components/IconSVG';

type Props = {
  show: boolean;
  handleClose: () => void;
};

const ModalUpload = (props: Props) => {
  const { show = false, handleClose } = props;

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered>
      <Modal.Header>
        <IconSVG className="cursor-pointer" onClick={handleClose} src={icCloseModal} maxWidth={'22px'} />
      </Modal.Header>
      <Modal.Body>
        <h5 className="font-medium">Upload file</h5>
      </Modal.Body>
      <Modal.Footer>{/* <Button onClick={handleClose}>Save Changes</Button> */}</Modal.Footer>
    </StyledModalUpload>
  );
};

export default ModalUpload;
