import { PropsWithChildren } from 'react';
import { CSSProperties } from 'styled-components';
import { StyledButton } from './Button.styled';

export type ButtonProps = {
  bg?: CSSProperties['backgroundColor'];
  onClick?: () => void;
  className?: string;
  props?: HTMLButtonElement;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

const Button = ({ type, bg = 'bg1', className, onClick, children, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton type={type} bg={bg} className={className} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
