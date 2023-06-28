import IcArrow from '@/assets/icons/ic-arrow-right-2.svg';
import IcNosLayers from '@/assets/icons/ic-dapp-layer2.png';
import { ButtonArrowLink } from '@/components/ButtonLink/ButtonLink.styled';
import Text from '@/components/Text';
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
    .content {
      display: flex;
      flex-direction: column;
      gap: ${px2rem(12)};
    }
  }

  .right-view {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      max-width: 450px;
    }
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
        <h4 className="title">Explore dapps on L2.</h4>
        <h6 className="desc">
          L2 is perfect for dapps that need speed. Discover the first dapps on Bitcoin. Here are some of our favorites.
        </h6>

        <div className="content">
          <ButtonArrowLink href="https://dgames.gg/" target="_blank" color="#4185EC">
            <Text className="text" size="medium" fontWeight="semibold">
              Gaming: Satoshi’s Gambit
            </Text>
            <img alt="icon" className="icon" src={IcArrow} />
          </ButtonArrowLink>
        </div>
      </div>

      <div className="right-view">
        <img src={IcNosLayers} />
      </div>
    </Container>
  );
};

export default MeetNOSSection;
