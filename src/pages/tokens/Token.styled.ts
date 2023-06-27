import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  padding: ${px2rem(45)};
  padding-top: ${px2rem(95)};
  padding-bottom: 0;

  ${MediaQueryBuilder(
    'lg',
    css`
      padding: ${px2rem(25)};
      padding-top: ${px2rem(55)};
    `,
  )}

  ${MediaQueryBuilder(
    'md',
    css`
      padding: ${px2rem(25)};
      padding-top: ${px2rem(35)};
    `,
  )}
    
  .content-wrapper {
    flex: 1;
    max-width: 85%;

    ${MediaQueryBuilder(
      'lg',
      css`
        max-width: 90%;
      `,
    )}

    ${MediaQueryBuilder(
      'md',
      css`
        max-width: 100%;
      `,
    )}
  
    .lineBreak {
      margin-top: ${px2rem(40)};
      margin-bottom: ${px2rem(40)};
      height: 1px;
      background-color: #898989;
    }
  }
`;
