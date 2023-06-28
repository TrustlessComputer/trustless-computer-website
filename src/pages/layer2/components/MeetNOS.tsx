import IcNosLayers from '@/assets/icons/ic-nos-scaling.svg';
import IconSVG from '@/components/IconSVG';
import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: ${px2rem(60)} ${px2rem(75)};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(16)};
  background-color: #fafafa;

  ${MediaQueryBuilder(
    'lg',
    css`
      flex-direction: column;
    `,
  )}

  ${MediaQueryBuilder(
    'md',
    css`
      flex-direction: column;
    `,
  )}
  
  .left-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${px2rem(10)};

    .title {
      font-size: ${px2rem(30)};
      font-weight: 700;
      line-height: ${px2rem(38)};
      text-align: left;
      max-width: 32ch;
      font-family: 'IBMPlexMono';
      letter-spacing: -0.01em !important;
      color: #1c1c1c;

      ${MediaQueryBuilder(
        'lg',
        css`
          text-align: center;
          max-width: 40ch;
        `,
      )}
    }

    .desc {
      font-size: ${px2rem(18)};
      font-weight: 500;
      line-height: ${px2rem(28)};
      letter-spacing: -0.01em;
      text-align: left;
      max-width: 50ch;
      color: #5b5b5b;
      margin-bottom: ${px2rem(12)};

      ${MediaQueryBuilder(
        'lg',
        css`
          text-align: center;
          max-width: 100ch;
        `,
      )}
    }
  }

  .right-view {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .btn {
    margin-top: ${px2rem(16)};
    ${MediaQueryBuilder(
      'lg',
      css`
        align-self: center;
      `,
    )}
  }
`;

const MeetNOSSection = () => {
  return (
    <Container>
      <div className="left-view">
        <h4 className="title">Secure scaling for Bitcoin.</h4>
        <h6 className="desc">
          NOS is a fast, stable, and scalable Bitcoin L2 blockchain. <br></br>
          <br></br> Increasing Bitcoin capability in terms of speed is fundamental to the mass adoption of decentralized
          applications on Bitcoin.<br></br>
          <br></br> The main goal of NOS (or “Nitrous Oxide”) is to turbocharge Bitcoin transactions (reduce transaction
          latency) without sacrificing decentralization or security.
        </h6>
      </div>

      <div className="right-view">
        <IconSVG src={IcNosLayers} maxWidth="450" />
      </div>
    </Container>
  );
};

export default MeetNOSSection;
