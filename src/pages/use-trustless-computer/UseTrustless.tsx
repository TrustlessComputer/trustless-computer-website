import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { Container, WrapContainer, StepContainer, LeftStep, RightStep, Button, Link } from './UseTrustless.styled';

const UseTrustless = () => {
  const steps = [
    {
      name: 'Step 1',
      title: 'Setup a wallet',
      content: 'A wallet lets you connect to Trustless Computer and manage your funds.',
      element: (
        <Link href="https://trustlesswallet.io/" target="_blank">
          Setup a wallet
        </Link>
      ),
      image: '/images/use-trustless-banner-1.png',
    },
    {
      name: 'Step 2',
      title: 'Get TC',
      content: 'TC is the currency of Trustless Computer — you can use it in Bitcoin dapps.',
      element: <Link href={ROUTE_PATH.FAUCET}>Get TC</Link>,
      image: '/images/use-trustless-banner-2.png',
    },
    {
      name: 'Step 3',
      title: 'Send BTC to your wallet',
      content:
        'Go to Wallet, tap the copy icon to copy and paste your BTC address to the address field on the platform you intend to withdraw BTC from. Make a transfer from there and BTC will be credited to your wallet.',
      element: (
        <Link href="https://trustlesswallet.io/" target="_blank">
          Go to wallet
        </Link>
      ),
      image: '/images/use-trustless-banner-4.png',
    },
    {
      name: 'Step 4',
      title: 'Use a Bitcoin dapp',
      content: 'Bitcoin dapps are applications powered by Trustless Computer. Choose a Bitcoin dapp to try out.',
      element: <Link href={ROUTE_PATH.STORE}>Explore Dapp Store</Link>,
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
