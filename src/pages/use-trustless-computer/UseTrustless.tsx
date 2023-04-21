import { ButtonLink } from '@/components/ButtonLink/ButtonLink.styled';
import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { WalletContext } from '@/contexts/wallet-context';
import { useWeb3React } from '@web3-react/core';
import { useContext } from 'react';
import { Container, WrapContainer, StepContainer, LeftStep, RightStep, Button } from './UseTrustless.styled';

const UseTrustless = () => {
  const { account } = useWeb3React();
  const { onConnect } = useContext(WalletContext);

  const steps = [
    {
      name: 'Step 1',
      title: 'Setup a wallet',
      content: 'A wallet lets you connect to Trustless Computer and manage your funds.',
      element: <Button onClick={() => !account && onConnect()}>Setup a wallet</Button>,
      image: '/images/use-trustless-banner-1.png',
    },
    {
      name: 'Step 2',
      title: 'Get TC',
      content: 'TC is the currency of Trustless Computer — you can use it in Bitcoin dapps.',
      element: (
        <ButtonLink href={ROUTE_PATH.FAUCET}>
          <p className="button-link-text">Get TC</p>
        </ButtonLink>
      ),
      image: '/images/use-trustless-banner-2.png',
    },
    {
      name: 'Step 3',
      title: 'Send BTC to your wallet',
      content:
        'Go to Wallet, tap the copy icon to copy and paste your BTC address to the address field on the platform you intend to withdraw BTC from. Make a transfer from there and BTC will be credited to your wallet.',
      element: (
        <ButtonLink href={ROUTE_PATH.WALLET}>
          <p className="button-link-text">Go to wallet</p>
        </ButtonLink>
      ),
      image: '/images/use-trustless-banner-4.png',
    },
    {
      name: 'Step 4',
      title: 'Use a Bitcoin dapp',
      content: 'Bitcoin dapps are applications powered by Trustless Computer. Choose a Bitcoin dapp to try out.',
      element: (
        <ButtonLink href={ROUTE_PATH.DAPPS}>
          <p className="button-link-text">Explore Dapp Store</p>
        </ButtonLink>
      ),
      image: '/images/use-trustless-banner-3.png',
    },
  ];

  return (
    <Container>
      <p className="title">Welcome to Trustless Computer</p>
      <p className="subTitle">
        Trustless Computer is an open-source protocol that powers decentralized applications<br></br> on Bitcoin.
      </p>
      <WrapContainer>
        {steps.map((step, index) => {
          return (
            <StepContainer key={index.toString()} isRevert={index % 2 === 0}>
              <LeftStep alt={step.name} src={CDN_URL + step.image} />
              <RightStep>
                <p className="name">{step.name}</p>
                <p className="text">{step.title}</p>
                <p className="desc">{step.content}</p>
                {step.element}
              </RightStep>
            </StepContainer>
          );
        })}
      </WrapContainer>
    </Container>
  );
};

export default UseTrustless;
