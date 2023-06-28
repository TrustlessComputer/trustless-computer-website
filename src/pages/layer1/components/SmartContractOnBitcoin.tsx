import IcArrow from '@/assets/icons/ic-arrow-right.svg';
import IcBitcoinNetwork from '@/assets/icons/ic-btc-network.svg';
import { ButtonArrowLink } from '@/components/ButtonLink/ButtonLink.styled';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: ${px2rem(60)} ${px2rem(48)};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(16)};

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
      color: ${({ theme }) => theme.text3};
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
        <IconSVG src={IcBitcoinNetwork} maxWidth="450" />
      </div>
      <div className="right-view">
        <h4 className="title">Write smart contract on Bitcoin</h4>
        <h6 className="desc">
          Trustless Computer is a layer-1 protocol that broadens the utility of Bitcoin beyond a cryptocurrency.
          Allowing you to create a DAO, DEX, NFT, token, auction lending, data storage, and so much more.
        </h6>
        <div className="content">
          <ButtonArrowLink
            href="https://docs.trustless.computer/contracts-tokens/brc-20-fungible-tokens"
            target="_blank"
          >
            <Text className="text" size="medium" fontWeight="semibold">
              Issue your own token on Bitcoin
            </Text>
            <img alt="icon" className="icon" src={IcArrow} />
          </ButtonArrowLink>
          <ButtonArrowLink href="https://docs.trustless.computer/contracts-finance/crowdsale" target="_blank">
            <Text className="text" size="medium" fontWeight="semibold">
              Kickstart a project with a crowdsale
            </Text>
            <img alt="icon" className="icon" src={IcArrow} />
          </ButtonArrowLink>
          <ButtonArrowLink href="https://docs.trustless.computer/contracts-tokens/brc-721-nfts" target="_blank">
            <Text className="text" size="medium" fontWeight="semibold">
              Issue NFTs
            </Text>
            <img alt="icon" className="icon" src={IcArrow} />
          </ButtonArrowLink>
          <ButtonArrowLink href="https://docs.trustless.computer/contracts-finance/auction" target="_blank">
            <Text className="text" size="medium" fontWeight="semibold">
              Run an auction
            </Text>
            <img alt="icon" className="icon" src={IcArrow} />
          </ButtonArrowLink>
          <ButtonArrowLink href="https://docs.trustless.computer/contracts-governance/dao" target="_blank">
            <Text className="text" size="medium" fontWeight="semibold">
              Build a DAO
            </Text>
            <img alt="icon" className="icon" src={IcArrow} />
          </ButtonArrowLink>
        </div>
      </div>
    </Container>
  );
};

export default SmartContractOnBitcoinSection;
