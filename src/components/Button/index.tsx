import { PropsWithChildren } from 'react';
import { CSSProperties } from 'styled-components';
import { StyledButton } from './Button.styled';

export type ButtonProps = {
  bg?: CSSProperties['backgroundColor'];
  gradient?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  props?: HTMLButtonElement;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

const Button = ({
  type,
  bg = 'bg1',
  gradient = false,
  className,
  onClick,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton
      type={type}
      bg={bg}
      background={gradient ? 'linear-gradient(90deg, #ff8008 0%, #ffc837 100%)' : undefined}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
