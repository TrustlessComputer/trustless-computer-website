import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';

export const Container = styled.div`
  margin-top: ${px2rem(80)};
  display: flex;
  flex-direction: row;

  gap: ${px2rem(30)};

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
    gap: ${px2rem(10)};

    .title {
      font-size: 24px;
      font-weight: 600;
      line-height: 34px;
      letter-spacing: 0em;
      text-align: left;
    }

    .description {
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
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
        <h5 className="title">Bitcoin dapps fuel</h5>
        <p className="description">
          TC serves as the lifeblood of Trustless Computer, facilitating the payment of transaction fees for all dapp
          activities on the Bitcoin network.
        </p>
      </div>

      <div className="column">
        <h5 className="title">Uses for TC grow every day</h5>
        <p className="description">
          As Trustless Computer enables programmability on Bitcoin, developers have the freedom to utilize TC in
          numerous ways, such as streaming TC, token swapping, earning interest, obtaining stablecoins, and making
          in-game purchases, among others.
        </p>
      </div>

      <div className="column">
        <h5 className="title">Rewards for Trustless Computer nodes</h5>
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
