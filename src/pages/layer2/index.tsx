import { ButtonLink } from '@/components/ButtonLink/ButtonLink.styled';
import ContentItem from './components/ContentItem';
import { Contents } from './constant';
import { Container } from './Layer2.styled';

const Layer2Page = () => {
  return (
    <Container>
      <div className="header-container">
        <p className="text-layer">LAYER 2</p>
        <h2 className="header">
          NOS is a low-cost and lightning-fast Bitcoin L2 blockchain powered by Trustless Computer.
        </h2>
        <div className="header-actions">
          <ButtonLink
            href="https://docs.trustless.computer/trustless-computer/layer-2-nos"
            background="linear-gradient(148.5deg, #D0D0D0 18.37%, #FFFFFF 52.8%, #D0D0D0 84.47%)"
            target="_blank"
            className="header-actions-btn"
          >
            <p className="button-link-text">NOS Developer Guides</p>
          </ButtonLink>
          {/* <ButtonLinkSolid href={'https://trustlessbridge.io/'} color="#ffffff" target="_blank">
            <p className="button-solid-text">Bridge to NOS</p>
          </ButtonLinkSolid> */}
        </div>
      </div>
      {Contents.map((content, index) => (
        <ContentItem item={content} index={index} />
      ))}
    </Container>
  );
};

export default Layer2Page;
