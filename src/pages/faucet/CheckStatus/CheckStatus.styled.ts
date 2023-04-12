import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const PostStep = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${px2rem(8)};
  gap: ${px2rem(16)};

  .postBtn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${px2rem(11)} ${px2rem(14)};
    gap: 6px;

    min-width: 98px;

    background: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    border-radius: 2px;

    :hover {
      background: ${({ theme }: { theme: DefaultTheme }) => theme.bg4};
    }

    :disabled {
      background: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    }

    .text {
      font-weight: 500;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(26)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text7};
    }

    .loading {
      padding: ${px2rem(11)};
    }
  }

  .inputContainer {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border3};
    border-radius: 2px;

    .input {
      padding: ${px2rem(11)} ${px2rem(14)};

      font-weight: 400;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(26)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
      width: 100%;
    }
  }
`;

const Styled = styled.div``;

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${px2rem(48)};
  gap: ${px2rem(36)};
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border2};
  border-radius: 4px;

  margin-top: ${px2rem(60)};

  align-self: center;

  .error {
    font-weight: 400;
    font-size: ${px2rem(14)};
    line-height: ${px2rem(24)};
    margin-top: ${px2rem(8)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text6};
  }

  .table {
    td:nth-child(2),
    td:nth-child(2),
    th:nth-child(3),
    td:nth-child(3) {
      /* text-align: right; */
    }

    td {
      padding-top: ${px2rem(26)};
      padding-bottom: ${px2rem(26)};
      min-width: ${px2rem(90)};
    }

    td:nth-child(1) {
      max-width: ${px2rem(250)};
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;

export { Styled, PostStep, StyledTable };
