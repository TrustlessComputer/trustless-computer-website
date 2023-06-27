import IcBitcoinNetwork from '@/assets/icons/ic-btc-network.svg';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink.styled';
import IconSVG from '@/components/IconSVG';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';

export const Container = styled.div`
  padding: ${px2rem(45)};
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.primary['2e']};

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
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .right-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${px2rem(10)};

    .title {
      font-size: 34px;
      font-weight: 700;
      line-height: 44px;
      text-align: left;
      max-width: 20ch;

      ${MediaQueryBuilder(
        'lg',
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
      letter-spacing: -0.01em;
      text-align: left;
      max-width: 50ch;
      padding-top: ${px2rem(10)};
      padding-bottom: ${px2rem(10)};
      color: ${({ theme }) => theme.text3};

      ${MediaQueryBuilder(
        'lg',
        css`
          text-align: center;
          max-width: 100ch;
        `,
      )}
    }

    .btn {
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
        <IconSVG src={IcBitcoinNetwork} maxWidth="350" />
      </div>
      <div className="right-view">
        <h4 className="title">Write smart contract on bitcoin</h4>
        <h6 className="desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </h6>

        <ButtonLink className="button-solid btn" href="" target="_blank">
          <p className="button-link-text">{`Issue your BRC-20 token → `}</p>
        </ButtonLink>
      </div>
    </Container>
  );
};

export default SmartContractOnBitcoinSection;
