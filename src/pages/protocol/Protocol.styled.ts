import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const Container = styled.div`
  padding-top: ${px2rem(58)};
  display: flex;
  flex-direction: column;

  .header {
    font-size: ${px2rem(48)};
    line-height: (58 / 48);
    font-weight: 700;
    max-width: 25ch;
    margin-left: auto;
    margin-right: auto;
    text-align: center;

    @media screen and (max-width: 426px) {
      font-size: ${px2rem(40)};
    }
  }

  .header-desc {
    font-weight: 400;
    font-size: ${px2rem(20)};
    line-height: ${px2rem(30)};

    margin-left: auto;
    margin-right: auto;
    text-align: center;
    letter-spacing: -0.01em;
    max-width: 960px;
    margin-top: ${px2rem(16)};
  }

  .header-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: ${px2rem(30)};
    margin-top: ${px2rem(24)};
    margin-bottom: ${px2rem(68)};

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
