import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';

export const Container = styled.div<{ isLeftSide: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(16)};
  background-color: ${({ isLeftSide }) => (!isLeftSide ? '#fafafa' : 'transparent')};
  padding: ${px2rem(60)} ${({ isLeftSide }) => (isLeftSide ? px2rem(75) : px2rem(48))};

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
          min-width: 75vw;
          font-size: ${px2rem(24)};
        `,
      )}
    }

    .desc {
      p {
        font-size: ${px2rem(18)};
        font-weight: 500;
        line-height: ${px2rem(28)};
        letter-spacing: -0.01em;
        text-align: left;
        max-width: 50ch;
        color: #5b5b5b;
      }

      display: flex;
      flex-direction: column;
      margin-bottom: ${px2rem(12)};
      gap: ${px2rem(8)};

      ${MediaQueryBuilder(
        'lg',
        css`
          p {
            max-width: 100ch;
            font-size: ${px2rem(16)};
          }
        `,
      )}
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: ${px2rem(12)};
    }
  }

  .right-view {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    img {
      max-width: 520px;
    }

    ${MediaQueryBuilder(
      'lg',
      css`
        svg {
          max-width: 440px;
        }
        img {
          max-width: 440px;
        }
      `,
    )}

    ${MediaQueryBuilder(
      'md',
      css`
        svg {
          max-width: 340px;
        }
        img {
          max-width: 340px;
        }
      `,
    )}
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
`;
