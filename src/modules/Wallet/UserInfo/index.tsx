import IcCopy from '@/assets/icons/ic-copy-outline.svg';
import IcPenguin from '@/assets/icons/ic-penguin.svg';
import IcBitcoin from '@/assets/icons/ic-btc.svg';
import { getUserSelector } from '@/state/user/selector';
import { formatLongAddress, shortenAddress } from '@/utils';
import { useWeb3React } from '@web3-react/core';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StyledUserInfo } from './UserInfo.styled';
import Text from '@/components/Text';
import IconSVG from '@/components/IconSVG';
import { useContext } from 'react';
import { AssetsContext } from '@/contexts/assets-context';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';

type Props = {
  className?: string;
};

const UserInfo = ({ className }: Props) => {
  const user = useSelector(getUserSelector);
  const { account } = useWeb3React();
  const { btcBalance, juiceBalance } = useContext(AssetsContext);

  if (!user) return null;

  const profileWallet = account || '';

  // const profileWallet = user.walletAddress || '';
  const profileBtcWallet = user.walletAddressBtcTaproot || '';

  const onClickCopy = (text: string) => {
    copy(text);
    toast.success('Copied');
  };

  return (
    <StyledUserInfo className={className}>
      <div className="info">
        <div className="avatar">
          <div className="desktop">
            <Jazzicon diameter={200} seed={jsNumberForAddress(profileWallet)} />
          </div>
        </div>
        <div className="address">
          <div>
            <Text color="text2">TC address: </Text>
            <div className="wallet-address">
              <h5> {shortenAddress(profileWallet, 4)}</h5>
              <div className="icCopy" onClick={() => onClickCopy(profileWallet)}>
                <img alt="ic-copy" src={IcCopy}></img>
              </div>
            </div>
          </div>
          {profileBtcWallet && (
            <div className="btc-address">
              <Text color="text2">BTC address: </Text>
              <div className="wallet-address">
                <h5> {formatLongAddress(profileBtcWallet)}</h5>
                <div className="icCopy" onClick={() => onClickCopy(profileWallet)}>
                  <img alt="ic-copy" src={IcCopy}></img>
                </div>
              </div>
            </div>
            // <div className="eth_address">
            //   <h5>BTC address: {formatLongAddress(profileBtcWallet)} </h5>
            //   <div className="icCopy" onClick={() => onClickCopy(profileBtcWallet)}>
            //     <img alt="ic-copy" src={IcCopy}></img>
            //   </div>
            // </div>
          )}
        </div>
        <div className="divider mb-24"></div>
        <Text size="medium" color="text2" className="mb-16">
          Active Networks{' '}
        </Text>
        <div className="balance">
          <div className="balance-item mb-16">
            <IconSVG src={IcPenguin} maxWidth="32" />
            <div className="balance-content">
              <h6>Trustless Computer</h6>
              <Text size="medium" color="text2">
                {formatEthPrice(juiceBalance)}
              </Text>
            </div>
          </div>
          <div className="balance-item ">
            <IconSVG src={IcBitcoin} maxWidth="32" />
            <div className="balance-content">
              <h6>Bitcoin</h6>
              <Text size="medium" color="text2">
                {formatBTCPrice(btcBalance)}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="options"></div>
    </StyledUserInfo>
  );
};

export default UserInfo;
