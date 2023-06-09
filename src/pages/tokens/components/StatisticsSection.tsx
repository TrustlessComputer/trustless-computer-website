import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';

export const Container = styled.div`
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
      font-size: 60px;
      font-weight: 600;
      line-height: 90px;
      letter-spacing: 0em;
      text-align: left;

      text-align: center;
    }

    .description {
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
      text-align: center;

      color: #b6b6b6;
    }
  }
`;

// const formatPrice = (amount?: number) => {
//   if (!amount) return '0.0';
//   return amount.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
// };

const StatisticsSection = () => {
  const price = 12;
  // const circulatingSupply = 0;
  // const totalSupply = 100000000;
  const totalSupply = '100,000,000';
  return (
    <Container>
      <div className="column">
        <h5 className="title">{`$${price}`}</h5>
        <p className="description">Price</p>
      </div>

      {/* <div className="column">
        <h5 className="title">{`${circulatingSupply}`}</h5>
        <p className="description">Circulating supply</p>
      </div> */}

      <div className="column">
        <h5 className="title">{`${totalSupply}`}</h5>
        <p className="description">Total supply</p>
      </div>
    </Container>
  );
};

export default StatisticsSection;
