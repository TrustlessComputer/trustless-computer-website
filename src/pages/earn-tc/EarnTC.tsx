import { ROUTE_PATH } from '@/constants/route-path';
import { WalletContext } from '@/contexts/wallet-context';
import { useWeb3React } from '@web3-react/core';
import { useContext, useEffect, useState } from 'react';
import { Container, WrapContainer, StepContainer, Button } from './EarnTC.styled';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink.styled';
import { CDN_URL } from '@/configs';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { IEarnFaucetStatus } from '@/interfaces/api/faucet';
import { requestGetEarnStatus } from '@/services/faucet';

const EarnTC = () => {
  const { account } = useWeb3React();
  const { onConnect } = useContext(WalletContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);

  const isConnectWallet = !!account && isAuthenticated;

  const [earnStatus, setEarnStatus] = useState<IEarnFaucetStatus>({
    normal: 'Pending',
    bns: 'Follow-up',
    artifact: 'Follow-up',
  });

  useEffect(() => {
    getEarnStatus();
  }, [isConnectWallet]);

  const getEarnStatus = async () => {
    if (isConnectWallet && account) {
      try {
        const data = await requestGetEarnStatus(account);
        setEarnStatus({
          normal: data.normal,
          bns: !isConnectWallet || data.normal !== 'Success' ? 'Follow-up' : data.bns || 'Normal',
          artifact: !isConnectWallet || data.bns !== 'Success' ? 'Follow-up' : data.artifact || 'Normal',
        });
      } catch (error) {}
    } else {
      setEarnStatus({
        normal: 'Follow-up',
        bns: 'Follow-up',
        artifact: 'Follow-up',
      });
    }
  };

  const renderSuccessStep = () => <img src={`${CDN_URL}/images/earn-success.svg`} />;

  const renderWaitingStep = () => (
    <ButtonLink disabled>
      <p className="button-link-text">Waiting for receive your TC</p>
    </ButtonLink>
  );

  const renderFollowupStep = () => (
    <ButtonLink disabled>
      <p className="button-link-text">Finish step above to start this step</p>
    </ButtonLink>
  );

  const steps = [
    {
      name: 'Step 1',
      title: 'Connect a wallet',
      content: 'Install Metamask and log in to connect your wallet.',
      element: (
        <>{!isConnectWallet ? <Button onClick={() => onConnect()}>Connect a wallet</Button> : renderSuccessStep()}</>
      ),
    },
    {
      name: 'Step 2',
      title: 'Faucet - Get 0.1 TC',
      content: 'Post a tweet and copy-paste the URL into the input box and submit request button.',
      element: (
        <>
          {earnStatus.normal === 'Follow-up' && renderFollowupStep()}
          {earnStatus.normal === 'Normal' && (
            <ButtonLink href="https://trustlessfaucet.io">
              <p className="button-link-text">Go to Faucet</p>
            </ButtonLink>
          )}
          {(earnStatus.normal === 'Pending' || earnStatus.normal === 'Processing') && renderWaitingStep()}
          {earnStatus.normal === 'Success' && renderSuccessStep()}
        </>
      ),
    },
    {
      name: 'Step 3',
      title: 'Create a BNS - Get 0.15 TC',
      content:
        'Create your BNS (Bitcoin Name System) name to receive any token and NFT. No more copying and pasting long addresses.',
      element: (
        <>
          {earnStatus.bns === 'Follow-up' && renderFollowupStep()}
          {earnStatus.bns === 'Normal' && (
            <div className="normal-step">
              <ButtonLink className="button-link" href="https://trustless.domains" target="_blank">
                <p className="button-link-text">Go to BNS Dapp</p>
              </ButtonLink>

              <a href="https://trustlessfaucet.io" className="share-link" target="_blank">
                Share your BNS to Twitter via Faucet
              </a>
            </div>
          )}
          {(earnStatus.bns === 'Processing' || earnStatus.bns === 'Pending') && renderWaitingStep()}
          {earnStatus.bns === 'Success' && renderSuccessStep()}
        </>
      ),
    },
    {
      name: 'Step 4',
      title: 'Create a Artifact - Get 0.1 TC',
      content: 'Preserve files on Bitcoin forever. Cheap. Immutable. Fully on-chain.',
      element: (
        <>
          {earnStatus.artifact === 'Follow-up' && renderFollowupStep()}
          {earnStatus.artifact === 'Normal' && (
            <div className="normal-step">
              <ButtonLink className="button-link" href={ROUTE_PATH.HOME} target="_blank">
                <p className="button-link-text">Go to Artifact Dapp</p>
              </ButtonLink>

              <a href="https://trustlessfaucet.io" className="share-link" target="_blank">
                Share your Artifact to Twitter via Faucet
              </a>
            </div>
          )}
          {(earnStatus.artifact === 'Processing' || earnStatus.artifact === 'Pending') && renderWaitingStep()}
          {earnStatus.artifact === 'Success' && renderSuccessStep()}
        </>
      ),
    },
  ];

  return (
    <Container>
      <p className="title">How to claim TC</p>
      <p className="subTitle">
        Making transactions on Trustless Computer incurs fees that are paid to the <br /> network in TC, the network’s
        native token. You must have some TC in your <br /> wallet to execute transactions on Trustless Computer.
      </p>
      <WrapContainer>
        {steps.map((step, index) => {
          return (
            <StepContainer key={index.toString()} isRevert={index % 2 === 0}>
              <div className="left-content">
                <div className="name">{step.name}</div>
                <div>
                  <p className="text">{step.title}</p>
                  <p className="desc">{step.content}</p>
                </div>
              </div>

              {step.element}
            </StepContainer>
          );
        })}
        {isConnectWallet && earnStatus.artifact === 'Success' && (
          <p className="congra">Congratulations! You have claimed the maximum amount of TC possible.</p>
        )}
      </WrapContainer>
    </Container>
  );
};

export default EarnTC;
