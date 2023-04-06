import { Wrapper } from './Header.styled';
import IcDiscord from '@/assets/icons/ic_discord.svg';
import IcTwitter from '@/assets/icons/ic_twitter.svg';
import IcLogo from '@/assets/icons/logo.svg';
import Button from '@/components/Button';
import styled from 'styled-components';
import px2rem from '@/utils/px2rem';
import { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet-context';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '@/utils';

const ConnectWalletButton = styled(Button)`
  background: #4f43e2;
  padding: ${px2rem(4)} ${px2rem(12)};
  color: #fff;
  font-size: ${px2rem(14)};
  line-height: ${px2rem(24)};
`;

const WalletAddress = styled.span`
  font-size: ${px2rem(14)};
  line-height: ${px2rem(24)};
  color: #fff;
`;

const Header = ({ height }: { height: number }) => {
  const { account } = useWeb3React();
  const { onConnect, generateBitcoinKey } = useContext(WalletContext);
  const isAuthenticated = !!account;

  const handleConnect = async () => {
    const address = await onConnect();
    const taproot = await generateBitcoinKey();
    console.log(address, taproot);
  };

  return (
    <Wrapper style={{ height }}>
      <a href="/">
        <img alt="logo" src={IcLogo} />
      </a>
      <div className="rowLink">
        <a className="networkText" href="https://nft.trustless.computer/">
          NFTs
        </a>
        <a className="networkText" href="https://explorer.trustless.computer/">
          Explorer
        </a>
        {/* <a className="networkText" href="/dapps">
          Bitcoin Dapps
        </a> */}
        <a className="networkText" href="/faucet">
          Faucet
        </a>
        <a className="iconContainer" href="https://discord.gg/tscNGxEw2s">
          <img alt="icon" className="icon" src={IcDiscord} />
        </a>
        <a className="iconContainer" href="https://twitter.com/DappsOnBitcoin">
          <img alt="icon" className="icon" src={IcTwitter} />
        </a>

        {isAuthenticated ? (
          <WalletAddress>{shortenAddress(account, 4, 4)}</WalletAddress>
        ) : (
          <ConnectWalletButton onClick={onConnect}>Connect Wallet</ConnectWalletButton>
        )}
      </div>
    </Wrapper>
  );
};

export default Header;
