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
      image: '/images/use-trustless-banner-1.jpg',
    },
    {
      name: 'Step 2',
      title: 'Get TC',
      content: 'TC is the currency of Trustless Computer — you can use it in Bitcoin dapps.',
      element: (
        <Button>
          <a href={ROUTE_PATH.FAUCET}>Get TC</a>
        </Button>
      ),
      image: '/images/use-trustless-banner-2.jpg',
    },
    {
      name: 'Step 3',
      title: 'Use a Bitcoin dapp',
      content: 'Bitcoin dapps are applications powered by Trustless Computer. Choose a Bitcoin dapp to try out.',
      element: (
        <Button>
          <a href={ROUTE_PATH.DAPPS}>Explore Dapp Store</a>
        </Button>
      ),
      image: '/images/use-trustless-banner-3.jpg',
    },
  ];

  return (
    <Container>
      <p className="title">Welcome to Trustless Computer</p>
      <p className="subTitle">
        Trustless Computer is an open-source protocol that powers decentralized applications on Bitcoin.
      </p>
      <WrapContainer>
        {steps.map((step, index) => {
          return (
            <StepContainer key={index.toString()}>
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
