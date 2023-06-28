import { Container } from './Protocol.styled';
import { ButtonLink, ButtonLinkSolid } from '@/components/ButtonLink/ButtonLink.styled';

import SmartContractOnBitcoin from './components/SmartContractOnBitcoin';
import MeetNOS from './components/MeetNOS';
import BitcoinDappStore from './components/BitcoinDappStore';

const ProtocolPage = () => {
  return (
    <Container>
      <div className="header-container">
        <h2 className="header">
          NOS is a low-cost and lightning-fast Bitcoin L2 blockchain powered by Trustless Computer.
        </h2>
        <div className="header-actions">
          <ButtonLink
            href="https://docs.trustless.computer/"
            background="linear-gradient(148.5deg, #D0D0D0 18.37%, #FFFFFF 52.8%, #D0D0D0 84.47%)"
            target="_blank"
            className="header-actions-btn"
          >
            <p className="button-link-text">NOS Developer Guides</p>
          </ButtonLink>
          <ButtonLinkSolid href={'https://tcgasstation.com/'} color="#ffffff" target="_blank">
            <p className="button-solid-text">Bridge to NOS</p>
          </ButtonLinkSolid>
        </div>
      </div>
      <MeetNOS />
      <BitcoinDappStore />
      <SmartContractOnBitcoin />
    </Container>
  );
};

export default ProtocolPage;
