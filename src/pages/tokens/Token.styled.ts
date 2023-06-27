import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  padding: ${px2rem(45)};
  padding-top: ${px2rem(95)};
  padding-bottom: 0;

  .content-wrapper {
    flex: 1;
    max-width: 85%;

    .lineBreak {
      margin-top: ${px2rem(40)};
      margin-bottom: ${px2rem(40)};
      height: 1px;
      background-color: #898989;
    }
  }
`;
