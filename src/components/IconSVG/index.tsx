import { FC } from 'react';
import SVG from 'react-inlinesvg';
import { StyledIconSVG } from './IconSVG.styled';

export type IconSVGProps = {
  src: string;
  url?: string;
  className?: string;
  maxWidth?: string;
  maxHeight?: string;
  type?: string;
  color?: string;
  onClick?: () => void;
};

const IconSVG: FC<IconSVGProps> = ({
  src,
  url,
  className = '',
  maxWidth = '',
  maxHeight = '',
  type = '',
  color = '',
  onClick,
}) => {
  return (
    <StyledIconSVG
      className={className}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      type={type}
      color={color}
      onClick={onClick}
    >
      <SVG src={url || src}></SVG>
    </StyledIconSVG>
  );
};

export default IconSVG;
