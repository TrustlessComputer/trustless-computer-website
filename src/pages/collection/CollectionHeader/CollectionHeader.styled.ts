import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */

  .infor {
    display: flex;
    flex-direction: row;
    gap: 6vw;
    height: 160px;
    width: 100%;
  }

  .infor-left {
    display: flex;
    flex-direction: row;
    width: 65%;

    .image {
      width: 168px;
      height: 168px;
      margin-right: 24px;
      object-fit: cover;
    }
  }

  .infor-right {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: ${px2rem(14)};

    .social {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${px2rem(24)};
      margin-bottom: ${px2rem(8)};
    }

    .owner {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      color: #898989;
    }

    .address {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 28px;
      letter-spacing: -0.01em;
      color: #ffffff;
    }

    .link {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 28px;
      letter-spacing: -0.01em;
      text-decoration: none;
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};

      :hover {
        color: ${({ theme }: { theme: DefaultTheme }) => theme.purple.b};
      }
    }

    .row-bottom {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 22%;
    }
  }

  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 34px;
    line-height: 64px;
    color: #ffffff;
    font-family: 'IBMPlexMono' !important;
  }

  .subTitle {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #ffffff;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* number of lines to show */
    line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    .image {
      width: 120px;
      height: 120px;
    }

    .infor {
      flex-direction: column;
      gap: 12px;
    }

    .infor-left {
      width: 100%;
    }

    .infor-right {
      width: 100%;

      .row {
        display: flex;
        flex-direction: row;
        gap: 30%;
      }
    }

    .title {
      font-size: 28px;
      line-height: 32px;
    }

    .subTitle {
      margin-top: 6px;
    }
  `}
`;

export { Container };
