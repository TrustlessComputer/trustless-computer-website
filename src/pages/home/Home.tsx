import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import {
  Container,
  LeftStep,
  ButtonLink,
  RightStep,
  StepContainer,
  WrapContainer,
  ButtonLinkSolid,
} from './Home.styled';

const Home = () => {
  const steps = [
    {
      title: 'Issue your own token on Bitcoin',
      content:
        'BRC-20 is the standard for fungible tokens on Bitcoin. Easily utilized to represent anything on Bitcoin such as cryptocurrency, a company share, voting rights in a DAO, or an ounce of gold—just to name a few.',
      element: (
        <ButtonLink href="https://docs.trustless.computer/bitcoin-dapp-examples/tokens-brc-20" target="_blank">
          <p className="button-link-text">Issue your BRC-20 token</p>
          <img className="icon" src={CDN_URL + '/icons/ic-arrow-right.svg'} />
        </ButtonLink>
      ),
      image: '/images/home-banner-1.png',
    },
    {
      title: 'Kickstart a project with a trustless crowdsale on Bitcoin',
      content:
        'Using your custom token, you can create a crowdsale contract to raise funds to bring your project to life.',
      element: (
        <ButtonLink href="https://docs.trustless.computer/bitcoin-dapp-examples/crowsale" target="_blank">
          <p className="button-link-text">Build a crowdsale</p>
          <img className="icon" src={CDN_URL + '/icons/ic-arrow-right.svg'} />
        </ButtonLink>
      ),
      image: '/images/home-banner-2.png',
    },
    {
      title: 'Issue NFTs on Bitcoin',
      content:
        'BRC-721 is the standard for non-fungible tokens (NFT) on Bitcoin. Ideal for memberships, collectibles, in-game items and more.',
      element: (
        <ButtonLink href="https://docs.trustless.computer/bitcoin-dapp-examples/nfts-brc-721" target="_blank">
          <p className="button-link-text">Issue your BRC-721 NFT collection</p>
          <img className="icon" src={CDN_URL + '/icons/ic-arrow-right.svg'} />
        </ButtonLink>
      ),
      image: '/images/home-banner-3.png',
    },
    {
      title: 'Run a trustless auction for your NFTs on Bitcoin',
      content: 'You can make an auction contract to sell your NFTs.',
      element: (
        <ButtonLink href="https://docs.trustless.computer/bitcoin-dapp-examples/auction" target="_blank">
          <p className="button-link-text">Start an auction</p>
          <img className="icon" src={CDN_URL + '/icons/ic-arrow-right.svg'} />
        </ButtonLink>
      ),
      image: '/images/home-banner-4.png',
    },
    {
      title: 'Build a DAO on Bitcoin',
      content:
        'Build a decentralized autonomous organization for your community where people can submit and then vote on proposals.',
      element: (
        <ButtonLink href="https://docs.trustless.computer/bitcoin-dapp-examples/dao" target="_blank">
          <p className="button-link-text">Build a DAO</p>
          <img className="icon" src={CDN_URL + '/icons/ic-arrow-right.svg'} />
        </ButtonLink>
      ),
      image: '/images/home-banner-5.png',
    },
  ];

  return (
    <Container>
      <p className="title">Write smart contracts on Bitcoin</p>
      <p className="subTitle">
        Trustless Computer is a layer-1 protocol that broadens the utility of Bitcoin beyond a <br /> cryptocurrency.
        Allowing you to create a DAO, DEX, NFT, token, auction lending, data storage,
        <br /> and so much more.
      </p>
      <div className="row-actions">
        <ButtonLink className="button-solid" href="https://docs.trustless.computer" target="_blank">
          <p className="button-link-text">Developer Guides</p>
        </ButtonLink>
        {/* <ButtonLinkSolid href={ROUTE_PATH.FAUCET}>
          <p className="button-solid-text">Faucet</p>
        </ButtonLinkSolid> */}

        <ButtonLinkSolid href={ROUTE_PATH.DEPLOY}>
          <p className="button-solid-text">Deploy a dApp</p>
        </ButtonLinkSolid>
      </div>
      <WrapContainer>
        {steps.map((step, index) => {
          return (
            <StepContainer key={index.toString()} isRevert={index % 2 !== 0}>
              <LeftStep alt={step.image} src={CDN_URL + step.image} />
              <RightStep>
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

export default Home;
