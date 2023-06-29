import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import IcTokenHeart from '@/assets/icons/ic_token_heart.svg';
import IcTokenChart from '@/assets/icons/ic_token_chart.svg';
import IcTokenBlockchain from '@/assets/icons/ic_token_blockchain.svg';

export const Container = styled.div`
  margin-top: ${px2rem(80)};
  padding: ${px2rem(0)} 6%;
  display: flex;
  flex-direction: row;

  gap: ${px2rem(60)};

  ${MediaQueryBuilder(
    'xl',
    css`
      flex-direction: column;
    `,
  )}

  .column {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: ${px2rem(16)};

    img {
      width: ${px2rem(60)};
      height: ${px2rem(60)};
    }

    .title {
      font-size: ${px2rem(24)};
      font-weight: 600;
      line-height: ${px2rem(24)};
      letter-spacing: 0em;
      text-align: left;
    }

    .description {
      font-size: ${px2rem(16)};
      font-weight: 400;
      line-height: ${px2rem(26)};
      letter-spacing: 0em;
      text-align: left;

      color: ${({ theme }) => theme.text3};
    }
  }
`;

const IntroduceSectionSection = () => {
  return (
    <Container>
      <div className="column">
        <img alt="heart" src={IcTokenHeart} />
        <h5 className="title">The lifeblood of Bitcoin dapps</h5>
        <p className="description">
          TC fuels Bitcoin dapps, facilitating the payment of transaction fees for all dapp activities on Bitcoin.
        </p>
      </div>

      <div className="column">
        <img alt="chart" src={IcTokenChart} />
        <h5 className="title">Uses for TC grow every day</h5>
        <p className="description">
          As Trustless Computer enables programmability on Bitcoin, developers have the free to utilize TC in numerous
          ways, such as DeFi, GameFi, DEX, DAO, and more.
        </p>
      </div>

      <div className="column">
        <img alt="blockchain" src={IcTokenBlockchain} />
        <h5 className="title">Run a node and earn TC</h5>
        <p className="description">
          Nodes play a crucial role in validating and recording Trustless Computer transactions, ensuring the seamless
          functioning of Bitcoin dapps. In return, nodes receive the transaction fees collected in TC during this
          process.
        </p>
      </div>
    </Container>
  );
};

export default IntroduceSectionSection;
