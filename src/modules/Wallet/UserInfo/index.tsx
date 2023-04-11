import IcCopy from '@/assets/icons/ic-copy.svg';
import { getUserSelector } from '@/state/user/selector';
import { formatLongAddress, shortenAddress } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import { StyledUserInfo } from './UserInfo.styled';

type Props = {};

const UserInfo = (props: Props) => {
  const user = useSelector(getUserSelector);
  const { account } = useWeb3React();

  if (!user) return null;

  const profileWallet = account || '';

  // const profileWallet = user.walletAddress || '';
  const profileBtcWallet = user.walletAddressBtcTaproot || '';

  const onClickCopy = (text: string) => {
    copy(text);
    toast.success('Copied');
  };

  return (
    <StyledUserInfo>
      <div className="info">
        <div className="avatar">
          <Jazzicon diameter={100} seed={jsNumberForAddress(profileWallet)} />
        </div>
        <div className="address">
          <div className="eth_address">
            <h5>TC address: {shortenAddress(profileWallet, 4)}</h5>
            <div className="icCopy" onClick={() => onClickCopy(profileWallet)}>
              <img alt="ic-copy" src={IcCopy}></img>
            </div>
          </div>
          {profileBtcWallet && (
            <div className="eth_address">
              <h5>BTC address: {formatLongAddress(profileBtcWallet)} </h5>
              <div className="icCopy" onClick={() => onClickCopy(profileBtcWallet)}>
                <img alt="ic-copy" src={IcCopy}></img>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="options"></div>
    </StyledUserInfo>
  );
};

export default UserInfo;
