import { Loader, Modal, TextMedium } from "lib/components";
import styled from "styled-components";

interface IProps {
  isOpen: boolean;
  title: string;
}

const WrapContent = styled.div`
  width: 100%;
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .title-label {
    margin: auto;
  }
`;

const TransactionLoader = ({ isOpen, title }: IProps) => {
  return (
    <Modal isOpen={isOpen} onDismiss={() => {}}>
      <WrapContent>
        <Loader size="30px" />
        <TextMedium className="title-label">{title}</TextMedium>
      </WrapContent>
    </Modal>
  );
};

export default TransactionLoader;
