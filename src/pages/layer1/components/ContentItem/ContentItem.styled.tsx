import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';

export const Container = styled.div<{ isLeftSide: boolean }>`
  padding: ${px2rem(60)} ${px2rem(48)};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(24)};

  background-color: ${({ theme, isLeftSide }) => (isLeftSide ? theme.primary['2e'] : 'transparent')};
  padding-left: ${({ isLeftSide }) => (isLeftSide ? px2rem(75) : px2rem(68))};

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
    `,
  )}

  .left-view {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    ${MediaQueryBuilder(
      'lg',
      css`
        max-width: 440px;
      `,
    )}

    ${MediaQueryBuilder(
      'md',
      css`
        svg {
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

      ${MediaQueryBuilder(
        'lg',
        css`
          text-align: center;
          max-width: 100ch;
          font-size: ${px2rem(24)};
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
          font-size: ${px2rem(16)};
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
