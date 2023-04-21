import SuccessIcon from '@/components/IconSVG/SuccessIcon';
import { ICollection } from '@/interfaces/api/collection';
import { Modal } from 'react-bootstrap';
import { StyledModal, Title } from './Modal.style';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/route-path';

export const Container = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .space {
    height: 20px;
  }

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 34px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #1c1c1c;
  }

  .desc {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;

    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.01em;

    color: #898989;
  }

  .doneBtn {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px 24px;
    gap: 10px;
    background: #1c1c1c;
    border-radius: 2px;
    color: white;
  }

  .viewDetail {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;

    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.01em;
    color: #1c1c1c;
    text-decoration: underline;

    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;

type Props = {
  collection?: ICollection;
  show?: boolean;
  handleClose?: () => void;
  onUpdateSuccess?: () => void;
};

const ModalDeployStatus = (props: Props) => {
  const { show = false, handleClose } = props;
  const navigate = useNavigate();

  return (
    <StyledModal show={show} onHide={handleClose} centered>
      {/* <Modal.Header>
        <IconSVG className="cursor-pointer" onClick={handleClose} src={IcCloseModal} maxWidth={'22px'} />
      </Modal.Header> */}
      <Modal.Body>
        <Container>
          <SuccessIcon />
          <div className="space" />
          <p className="title">Success!</p>
          <div className="space" />
          <p className="desc">Your contract has been deployed successfully on Trustless Computer.</p>
          <div className="space" />
          <button className="doneBtn" onClick={handleClose}>
            Done
          </button>
          <div className="space" />
          <p
            className="viewDetail"
            onClick={() => {
              navigate(`${ROUTE_PATH.WALLET}?tab=transactions`);
            }}
          >
            To see all transactions. Click here
          </p>
        </Container>
      </Modal.Body>
      <Modal.Footer>{/* <Button onClick={handleClose}>Save Changes</Button> */}</Modal.Footer>
    </StyledModal>
  );
};

export default ModalDeployStatus;
