import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { ButtonProps } from './index';

export const StyledButton = styled(Button)<ButtonProps>`
  --bg-color: ${({ bg, theme }) => (bg ? (theme as any)[bg] : theme.white)};

  border-radius: 2px !important;
  background-color: var(--bg-color);
  border: none;
  padding: 0;
  outline: none;

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