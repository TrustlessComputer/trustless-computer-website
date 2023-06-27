import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  padding: ${px2rem(45)};

  .content-wrapper {
    flex: 1;
    max-width: 85%;
    height: 100px;

    .lineBreak {
      margin-top: ${px2rem(40)};
      margin-bottom: ${px2rem(40)};
      height: 1px;
      background-color: #898989;
    }
  }
`;
