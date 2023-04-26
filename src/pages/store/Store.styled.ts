import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledDappStore = styled.div`
  padding-top: ${px2rem(58)};
  display: flex;
  flex-direction: column;

  * {
    color: ${({ theme }) => theme.white};
  }

  h2 {
    font-size: ${px2rem(48)};
    line-height: (58 / 48);
    font-weight: 500;
    max-width: 25ch;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    /* margin-bottom: ${px2rem(60)}; */
    letter-spacing: -0.05em;

    @media screen and (max-width: 426px) {
      font-size: ${px2rem(40)};
    }
  }

  .desc {
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

    gap: ${px2rem(10)};
    margin-top: ${px2rem(24)};
    margin-bottom: ${px2rem(68)};

    .submitBtn {
      padding: ${px2rem(14)} ${px2rem(32)};
      gap: ${px2rem(10)};
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

  h6 {
    font-family: 'Bandeins Strange Variable' !important;
    max-width: ${px2rem(930)};
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-bottom: ${px2rem(68)};

    @media screen and (max-width: 426px) {
      font-size: ${px2rem(16)};
    }
  }

  .app-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${px2rem(385)}, 1fr));
    gap: ${px2rem(32)};

    @media screen and (max-width: 426px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .app-item {
    background-color: #17171a;
    padding: ${px2rem(28)};
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: block;
    text-decoration: none;
    transition: border 0.2s ease-in-out;
    border-radius: 16px;

    &:hover {
      border-color: rgba(255, 255, 255, 0.8);
    }

    &.app-disabled {
      cursor: auto;
      pointer-events: none;

      .app-item__image,
      .app-item__content {
        opacity: 0.3;
      }
    }
  }

  .app-item__image {
    max-width: ${px2rem(80)};
    margin-bottom: ${px2rem(28)};

    img {
      object-fit: cover;
      width: ${px2rem(80)};
      height: ${px2rem(80)};
    }
  }

  .creator {
    display: flex;
    align-items: center;
    gap: ${px2rem(8)};
    margin-bottom: ${px2rem(12)};
  }

  .app-name {
    font-size: ${px2rem(28)};
    line-height: ${px2rem(34)};
    margin-bottom: ${px2rem(4)};
  }

  .app-creator {
    font-size: ${px2rem(18)};
    line-height: ${px2rem(22)};
    color: ${({ theme }) => theme.bg4};
    font-weight: 500;
    opacity: 0.7;
  }

  .app-desc {
    color: ${({ theme }) => theme.white};
    opacity: 0.7;
  }
`;
