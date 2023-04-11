import { FC } from 'react';
import SVG from 'react-inlinesvg';
import { StyledIconSVG } from './IconSVG.styled';

export type IconSVGProps = {
  src: string;
  className?: string;
  maxWidth?: string;
  type?: string;
  color?: string;
  onClick?: () => void;
};

const IconSVG: FC<IconSVGProps> = ({ src, className = '', maxWidth = '', type = '', color = '', onClick }) => {
  return (
    <StyledIconSVG className={className} maxWidth={maxWidth} type={type} color={color} onClick={onClick}>
      <SVG src={src}></SVG>
    </StyledIconSVG>
  );
};

export default IconSVG;
