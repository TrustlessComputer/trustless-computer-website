import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledDappStore = styled.div`
  padding-top: ${px2rem(68)};

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
    margin-bottom: ${px2rem(24)};

    @media screen and (max-width: 426px) {
      font-size: ${px2rem(40)};
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

    &:last-of-type {
      cursor: auto;
      pointer-events: none;

      .app-item__image {
        opacity: 0.3;
      }
    }
  }

  .app-item__image {
    max-width: ${px2rem(80)};
    margin-bottom: ${px2rem(28)};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .app-name {
    font-size: ${px2rem(28)};
    line-height: 34/28;
  }

  .app-desc {
    color: ${({ theme }) => theme.white};
    opacity: 0.7;
  }
`;
