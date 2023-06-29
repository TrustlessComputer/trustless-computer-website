import { ButtonLink, ButtonLinkSolid } from '@/components/ButtonLink/ButtonLink.styled';
import ContentItem from './components/ContentItem';
import { Contents } from './constant';
import { Container } from './Layer1.styled';

const Layer1Page = () => {
  return (
    <Container>
      <div className="header-container">
        <p className="text-layer">LAYER 1</p>
        <h2 className="header">Launch your decentralized applications (dapps) on Bitcoin.</h2>
        <div className="header-actions">
          <ButtonLink href="https://docs.trustless.computer/" target="_blank" className="header-actions-btn">
            <p className="button-link-text">TC Developer Guides</p>
          </ButtonLink>
          <ButtonLinkSolid href={'https://tcgasstation.com/'} target="_blank">
            <p className="button-solid-text">Get TC</p>
          </ButtonLinkSolid>
        </div>
      </div>
      {Contents.map((content, index) => (
        <ContentItem item={content} index={index} />
      ))}
    </Container>
  );
};

export default Layer1Page;
