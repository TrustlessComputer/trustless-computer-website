import styled, { DefaultTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 40px;

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 52px;

    .title {
      font-style: normal;
      font-weight: 500;
      font-size: 34px;
      line-height: 44px;
      color: #ffffff;
      padding: 0px 10px;
    }

    .list {
      margin-top: 50px;
      min-height: 60vh;

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none;

      ::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
      }
    }

    .loading {
      display: flex;
      justify-content: center;
      margin-top: 32px;
    }

    .item {
      padding: 6px 12px !important;
    }

    .card {
      width: 100%;
      height: auto;
      text-decoration: none;
      --bs-card-bg: none;
    }

    .card-content {
      background: #2e2e2e;
      border: 1px solid transparent;

      :hover {
        border: 1px solid #d9d9d9;
      }
    }

    .card-image {
      background: #5b5b5b;
      .image {
        width: 100%;
        min-height: 100px;
        aspect-ratio: 1 / 1;
        height: auto;
        object-fit: cover;
        padding: 32px;
      }
    }

    .card-info {
      padding: 16px 24px;

      .card-title {
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        height: 30px;
        letter-spacing: -0.01em;
        color: #ffffff;
      }

      .card-subTitle {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 28px;
        color: #898989;
      }
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    .content {
      width: 85%;

      .card-image {
        .image {
          padding: 24px;
        }
      }

      .card-info {
        .card-title {
          
        }
  
        .card-subTitle {
          
        }
      }
    }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToExtraSmall`
    .content {
      width: 95%;
      margin-top: 28px;

      .list {
        margin-top: 20px;
      }
    }
  `}
`;

export { Container };
