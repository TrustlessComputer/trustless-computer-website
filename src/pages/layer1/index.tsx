import { Container } from './Protocol.styled';
import { ButtonLink, ButtonLinkSolid } from '@/components/ButtonLink/ButtonLink.styled';

import SmartContractOnBitcoin from './components/SmartContractOnBitcoin';
import MeetNOS from './components/MeetNOS';
import BitcoinDappStore from './components/BitcoinDappStore';

const ProtocolPage = () => {
  return (
    <Container>
      <div className="header-container">
        <p className="text-layer">LAYER 1</p>
        <h2 className="header">Launch your decentralized applications (dapps) on Bitcoin.</h2>
        {/* <h6 className="header-desc">
          Trustless Computer is a layer-1 protocol that broadens the utility of Bitcoin beyond a cryptocurrency.
          Allowing you to create a DAO, DEX, NFT, token, auction lending, data storage, and so much more.
        </h6> */}
        <div className="header-actions">
          <ButtonLink href="https://docs.trustless.computer/" target="_blank" className="header-actions-btn">
            <p className="button-link-text">Developer Guides</p>
          </ButtonLink>
          <ButtonLinkSolid href={'https://tcgasstation.com/'} target="_blank">
            <p className="button-solid-text">Get TC</p>
          </ButtonLinkSolid>
        </div>
      </div>

      <SmartContractOnBitcoin />
      <MeetNOS />
      <BitcoinDappStore />
    </Container>
  );
};

export default ProtocolPage;
