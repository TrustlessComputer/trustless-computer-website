import IcDappGroup from '@/assets/icons/ic-how-layer2.svg';
import IconSVG from '@/components/IconSVG';
import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: ${px2rem(60)} ${px2rem(48)};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(16)};

  ${MediaQueryBuilder(
    'lg',
    css`
      flex-direction: column;
    `,
  )}

  ${MediaQueryBuilder(
    'md',
    css`
      margin-top: ${px2rem(0)};
      flex-direction: column;
    `,
  )}

  .left-view {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    ${MediaQueryBuilder(
      'md',
      css`
        svg {
          margin-bottom: 16px;
          max-width: 340px;
        }
      `,
    )}
  }

  .right-view {
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
      display: flex;
      flex-direction: column;
      max-width: 50ch;
      margin-bottom: ${px2rem(12)};
      gap: ${px2rem(8)};

      ${MediaQueryBuilder(
        'lg',
        css`
          text-align: center;
          max-width: 100ch;
        `,
      )}
    }

    .text {
      font-size: ${px2rem(18)};
      font-weight: 500;
      line-height: ${px2rem(28)};
      letter-spacing: -0.01em;
      text-align: left;
      color: #5b5b5b;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: ${px2rem(12)};
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
  }
`;

const SmartContractOnBitcoinSection = () => {
  return (
    <Container>
      <div className="left-view">
        <IconSVG src={IcDappGroup} maxWidth="450" />
      </div>
      <div className="right-view">
        <h4 className="title">How does it work?</h4>
        <h6 className="desc">
          <p className="text">
            NOS reuses the battle-tested Optimism codebase. It is a modified version of the OP Stack that adds support
            for Bitcoin.
          </p>
          <p className="text">
            Like Optimism, NOS uses Optimistic Rollup, a fancy way of describing a blockchain that piggybacks off the
            security of another blockchain.
          </p>
          <p className="text">
            In this case, NOS takes advantage of the consensus mechanism of Bitcoin instead of its own. This is possible
            thanks to the Trustless Computer protocol, which brings smart contract capability to Bitcoin.
          </p>
        </h6>
      </div>
    </Container>
  );
};

export default SmartContractOnBitcoinSection;
