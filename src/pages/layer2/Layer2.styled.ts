import { MediaQueryBuilder } from '@/theme';
import px2rem from '@/utils/px2rem';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .header-container {
    padding-top: ${px2rem(88)};
    padding-bottom: ${px2rem(40)};
    background-color: #4185ec;

    ${MediaQueryBuilder(
      'md',
      css`
        padding-top: ${px2rem(68)};
      `,
    )}
  }

  .text-layer {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: ${px2rem(24)};
    line-height: ${px2rem(34)};
    font-weight: 500;
    margin-bottom: ${px2rem(16)};
    color: white;
  }

  .header {
    font-size: ${px2rem(44)};
    line-height: ${px2rem(54)};
    font-weight: 700;
    max-width: 48ch;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-family: 'IBMPlexMono';
    letter-spacing: -0.02em !important;
    color: white;

    ${MediaQueryBuilder(
      'lg',
      css`
        max-width: 80vw;
        font-size: ${px2rem(34)};
        line-height: ${px2rem(44)};
      `,
    )}
  }

  .header-desc {
    font-weight: 400;
    font-size: ${px2rem(18)};
    line-height: ${px2rem(28)};

    margin-left: auto;
    margin-right: auto;
    text-align: center;
    letter-spacing: -0.01em;
    max-width: 960px;
    margin-top: ${px2rem(16)};
    color: #e5e5e5;
  }

  .header-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: ${px2rem(24)};
    margin-top: ${px2rem(40)};
    margin-bottom: ${px2rem(68)};

    ${MediaQueryBuilder(
      'md',
      css`
        flex-direction: column;
        margin-top: ${px2rem(24)};
        gap: ${px2rem(16)};
        margin-bottom: ${px2rem(28)};
      `,
    )}

    .submitBtn {
      padding: ${px2rem(15)} ${px2rem(24)};
      gap: ${px2rem(10)};
      max-height: 56px;

      border-radius: 8px;
      text-decoration: none !important;
      width: fit-content;
      display: flex;
      flex-direction: row;
      align-items: center;

      background: rgba(255, 255, 255, 0.1);
      cursor: pointer;

      p {
        font-weight: 500;
        font-size: ${px2rem(16)};
        line-height: ${px2rem(26)};
        text-align: center;
        letter-spacing: 0.01em;
        font-family: 'IBMPlexMono';
      }

      :hover {
        opacity: 0.8;
      }
    }
  }
`;
