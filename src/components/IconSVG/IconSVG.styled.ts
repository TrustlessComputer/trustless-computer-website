import px2rem from '@/utils/px2rem';
import { IconSVGProps } from './index';
import styled, { css } from 'styled-components';

export const StyledIconSVG = styled.div<any>`
  font-size: 0;
  svg {
    display: inline-block;
    vertical-align: middle;
    width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '100%')};
    height: ${props => (props.maxHeight ? `${props.maxHeight}px` : '100%')};
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
