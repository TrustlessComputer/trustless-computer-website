import React from 'react';
import Text from '@/components/Text';
import Button from '@/components/Button';

import NamesList from './NamesList';
import { NamesContainer } from '../Dapps.styled';
import IcImgName from '@/assets/icons/ic-img-names.svg';

type Props = {};

const Names = (props: Props) => {
  return (
    <>
      <NamesContainer>
        <div className="upload_left">
          <img src={IcImgName} alt="upload file icon" />
          <div className="upload_content">
            <h3 className="upload_title">Bitcoin Name System</h3>
            <Text size="regular">
              BNS is the standard for naming on Bitcoin. No more copying and pasting long addresses. Use your BNS name
              to receive any token and NFT.
            </Text>
          </div>
        </div>
      </NamesContainer>
      <NamesList />
    </>
  );
};

export default Names;
