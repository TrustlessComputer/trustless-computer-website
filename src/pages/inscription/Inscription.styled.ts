import styled, { DefaultTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  .content {
    display: flex;
    flex-direction: row;
    gap: 60px;
    margin-top: 60px;
    width: 100%;
  }

  .left-container {
    width: 40%;

    .thumbnail {
      width: 100%;
      aspect-ratio: 1 / 1;
    }
  }

  .right-container {
    width: 60%;

    .header {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      text-decoration: none;

      .title {
        font-style: normal;
        font-weight: 600;
        font-size: 34px;
        line-height: 44px;
        color: #ffffff;
      }

      .subTitle {
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 34px;
        color: #b6b6b6;
      }
    }

    .tag {
      text-decoration: none;

      .tag-title {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: #898989;
      }

      .subTitle {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        color: #c6c7f8;
      }
    }

    .list-container {
      padding-top: 16px;
      padding-bottom: 8px;
      max-width: 700px;

      .list-name {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: #898989;
        margin-bottom: 12px;
      }
    }

    .properties-item {
      background-color: #303030;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 88px;
    }

    .properties-trait-type {
      font-weight: 400;
      font-size: 13px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #1a73e8;
      text-align: center;
    }

    .properties-trait-value {
      font-weight: 500;
      font-size: 15px;
      line-height: 140%;
      margin-top: 4px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 90%;
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
      padding: 0px 0px;
      .content {
        flex-direction: column;
        gap: 40px;
      }

      .left-container {
        width: 100%;

        .thumbnail {
          width: 70%;
        }
      }

      .right-container {
        width: 100%;

        .header {

          .title {
            font-size: 28px;
            line-height: 28px;
          }

          .subTitle {
            font-size: 20px;
          }
        }

        .tag {          
          .tag-title {
          }

          .subTitle {
            font-size: 20px;
            line-height: 24px;
          }
        }
      }
  `}

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToExtraSmall`
      .content {
        gap: 28px;
      }

      .left-container {
        .thumbnail {
          width: 60%;
        }
      }

      .right-container {
        .header {
          .title {
            line-height: 24px;
            font-size: 24px;
          }
    
          .subTitle {
            font-size: 16px;
          }
        }
  
      }
  `}
`;

const Information = styled.div`
  margin-top: 40px;

  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 34px;
    line-height: 44px;
    color: #b6b6b6;
    padding-bottom: 8px;
    width: fit-content;
    border-bottom: 2px solid white;
    cursor: pointer;
  }

  .list {
    display: flex;
    flex-direction: column;
    margin-top: 16px;

    .item {
      padding-top: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #2e2e2e;
      max-width: 700px;

      .name {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: #898989;
      }

      .desc {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: #ffffff;
        word-break: break-all;
      }

      .link {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: #4185ec;
        text-decoration: none;
        word-break: break-all;
      }
    }
  }

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToExtraSmall`
      margin-top: 28px;
      .list {
        
      }
  `};
`;

export { Container, Information };
