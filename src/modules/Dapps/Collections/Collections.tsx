/* eslint-disable jsx-a11y/anchor-is-valid */
import IcBitcoinCloud from '@/assets/icons/ic-bitcoin-721.svg';
import Button from '@/components/Button';
import Text from '@/components/Text';
import React, { useState } from 'react';
import { UploadFileContainer } from '../Dapps.styled';
import { Container } from './Collections.styled';
import List from './List';
import ModalCreate from './ModalCreate';

const Collections = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <UploadFileContainer>
        <div className="upload_left">
          {/* <img src={IcBitcoinCloud} alt="upload file icon" /> */}
          <div className="upload_content">
            <h3 className="upload_title">BRC-721 on Bitcoin</h3>
            <Text size="medium" maxWidth="100%">
              BRC-721 is the standard for Non-Fungible Tokens (NFT) on Bitcoin. You can use it for collectible items,
              memberships, in-game items, and more.
            </Text>
          </div>
        </div>
        <div className="upload_right">
          <Button gradient onClick={() => setShowModal(true)}>
            <Text size="medium" color="bg1" className="button-text" fontWeight="medium">
              Create BRC-721
            </Text>
          </Button>
        </div>
      </UploadFileContainer>
      <List />
      {showModal && <ModalCreate show={showModal} handleClose={() => setShowModal(false)} />}
    </Container>
  );
};

export default React.memo(Collections);
