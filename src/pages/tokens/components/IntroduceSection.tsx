import px2rem from '@/utils/px2rem';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink.styled';
import IconSVG from '@/components/IconSVG';
import IcTrustlessHola from '@/assets/icons/ic-trustlest-hola.svg';

import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';

export const Container = styled.div`
  padding: ${px2rem(45)};
  display: flex;
  flex-direction: row;

  background-color: ${({ theme }) => theme.primary['2e']};
  border-radius: 5px;

  gap: ${px2rem(30)};

  ${MediaQueryBuilder(
    'xl',
    css`
      flex-direction: column;
    `,
  )}

  .left-view {
    display: flex;
    flex-direction: column;
    flex: 3;
    margin-right: 30px;
    gap: ${px2rem(10)};

    ${MediaQueryBuilder(
      'xl',
      css`
        flex: 1;
      `,
    )}

    .title {
      font-size: 34px;
      font-weight: 700;
      line-height: 58px;
      text-align: left;
      max-width: 20ch;

      ${MediaQueryBuilder(
        'xl',
        css`
          text-align: center;
          max-width: 40ch;
        `,
      )}
    }

    .desc {
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      text-align: left;
      padding-top: ${px2rem(10)};
      padding-bottom: ${px2rem(10)};
      color: ${({ theme }) => theme.text3};

      ${MediaQueryBuilder(
        'xl',
        css`
          text-align: center;
        `,
      )}
    }

    .get-tc-btn {
      min-width: 200px;
      display: flex;
      justify-content: center;

      ${MediaQueryBuilder(
        'xl',
        css`
          align-self: center;
        `,
      )}
    }
  }

  .right-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img {
      ${MediaQueryBuilder(
        'xl',
        css`
          scale: 0.8;
        `,
      )}
      ${MediaQueryBuilder(
        'md',
        css`
          scale: 0.6;
        `,
      )}
    }
  }
`;

const IntroduceSection = () => {
  return (
    <Container>
      <div className="left-view">
        <h2 className="title">What is TC?</h2>
        <h6 className="desc">
          TC is the native cryptocurrency of Trustless Computer. When you use a Bitcoin dapp powered by Trustless
          Computer, you’ll pay a transaction fee in TC.
        </h6>
        <ButtonLink className="button-solid get-tc-btn" href="https://tcgasstation.com/" target="_blank">
          <p className="button-link-text">{`Get TC`}</p>
        </ButtonLink>
      </div>

      <div className="right-view">
        <IconSVG src={IcTrustlessHola} maxWidth="380" className="img" />
      </div>
    </Container>
  );
};

export default IntroduceSection;
