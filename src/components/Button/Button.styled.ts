import styled, { DefaultTheme } from 'styled-components';

export const StyledButton = styled.button<{ bg: string; background?: string }>`
  --bg-color: ${({ bg, theme }: { bg: string; theme: DefaultTheme }) => (theme as any)[bg] || theme.white};

  border-radius: 2px !important;
  background-color: var(--bg-color);
  border: none;
  padding: 0;
  outline: none;

  background: ${({ background }: { background?: string }) => background};

  &:disabled {
    background-color: var(--bg-color);
    opacity: 0.8;
    cursor: auto;
  }
  &:hover {
    background-color: var(--bg-color);
    opacity: 0.8;
  }

  &:active {
    background-color: var(--bg-color);
  }

  &.btn-primary {
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: var(--bg-color);
    --bs-btn-active-border-color: var(--bg-color);
    --bs-btn-disabled-bg: var(--bg-color);
    --bs-btn-disabled-border-color: var(--bg-color);
  }
`;
