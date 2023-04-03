import React, { CSSProperties, PropsWithChildren, useRef } from 'react';
import cs from 'classnames';
import { BaseText } from '@/components/Text/styled';
import { ColorsTheme } from '@/theme/colors';

type TText = {
  fontWeight?: 'bold' | 'semibold' | 'medium' | 'regular' | 'light';
  style?: CSSProperties;
  size?: 'extra-small' | 'small' | 'regular' | 'medium';
  align?: 'center' | 'left' | 'right' | 'unset';
  color?: keyof ColorsTheme;
  className?: string;
  onClick?: () => void;
};

const Text = ({
  children,
  fontWeight = 'regular',
  size = 'small',
  align = 'unset',
  style,
  color,
  className,
  onClick,
  ...props
}: PropsWithChildren<TText>) => {
  const comp = useRef<any>(null);
  return (
    <BaseText
      {...props}
      ref={comp}
      className={cs(`size-${size}`, `weight-${fontWeight}`, className)}
      color={color}
      align={align}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </BaseText>
  );
};

export default Text;
