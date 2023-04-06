import { PropsWithChildren } from 'react';
import { CSSProperties } from 'styled-components';
import { StyledButton } from './Button.styled';

export type ButtonProps = {
  bg?: CSSProperties['backgroundColor'];
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  props?: HTMLButtonElement;
};

const Button = ({ bg = 'bg1', className, onClick, children, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton bg={bg} className={className} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
