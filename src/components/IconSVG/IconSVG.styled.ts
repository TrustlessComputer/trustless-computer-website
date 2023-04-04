import { IconSVGProps } from './index';
import styled, { css } from 'styled-components';

export const StyledIconSVG = styled.div<IconSVGProps>`
  font-size: 0;
  svg {
    display: inline-block;
    vertical-align: middle;
    width: ${props => props.maxWidth || '100%'};
    pointer-events: none;
  }
  ${props => {
    return (
      props.type === 'fill' &&
      css`
        svg path,
        svg rect {
          fill: ${(props: IconSVGProps) => props.color || 'currentColor'};
        }
      `
    );
  }};
  ${props =>
    props.type === 'stroke' &&
    css`
      svg path,
      svg rect {
        stroke: ${(props: IconSVGProps) => props.color || 'currentColor'};
      }
    `};
`;
