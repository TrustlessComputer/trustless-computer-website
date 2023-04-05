import styled, { DefaultTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 40px;

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 80%;
    margin-top: 42px;

    .header {
      display: flex;
      flex-direction: row;
      padding: 0px 10px;
      /* align-items: center; */

      .infor {
        display: flex;
        flex-direction: row;
        gap: 6vw;
        height: 160px;
      }

      .infor-left {
        display: flex;
        flex-direction: row;
        width: 65%;

        .image {
          width: 160px;
          height: 160px;
          margin-right: 20px;
        }
      }

      .infor-right {
        width: 35%;
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-top: 16px;

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

        .row {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 32%;
        }
      }

      .title {
        font-style: normal;
        font-weight: 600;
        font-size: 34px;
        line-height: 44px;
        color: #ffffff;
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
    }

    .list {
      margin-top: 64px;
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
        min-height: 100px;
        width: 100%;
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
        line-height: 30px;
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

      .header {
        .image {
          width: 120px;
          height: 120px;
        }
  
        .infor {
          margin-left: 16px;
          flex-direction: column;
          gap: 12px;
        }

        .infor-left {
          width: 100%;
        }

        .infor-right {
          width: 100%;
          gap: 16px;

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
      }

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

      .list {
        margin-top: 184px;
      } 
    }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToExtraSmall`
    .content {
      width: 95%;
      margin-top: 28px;

      .header {
  
        .card-title {
          
        }
  
        .card-subTitle {

        }
      }
    }
  `}
`;

export { Container };
