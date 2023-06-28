import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

export const ButtonLink = styled.a<{ disabled?: boolean; background?: string }>`
  padding: ${px2rem(14)} ${px2rem(24)};
  gap: ${px2rem(10)};

  background: ${({ background }: { background?: string }) =>
    background || 'linear-gradient(90deg, #ff8008 0%, #ffc837 100%)'};
  border-radius: 8px;
  text-decoration: none !important;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: ${({ disabled }: { disabled?: boolean }) => (disabled ? 0.5 : 1)};
  max-height: 56px;

  .button-link-text {
    font-weight: 500;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(24)};
    text-align: center;
    letter-spacing: 0.01em;
    color: #1c1c1c;
    font-family: 'IBMPlexMono' !important;
  }

  .icon {
    width: ${px2rem(20)};
    height: ${px2rem(26)};
  }

  :hover {
    opacity: ${({ disabled }: { disabled?: boolean }) => (disabled ? 0.5 : 0.8)};
  }
`;

export const ButtonLinkSolid = styled.a<{ color?: string }>`
  padding: ${px2rem(12)} ${px2rem(24)};
  gap: ${px2rem(10)};
  border-radius: 8px;
  border: 1px solid ${({ color }: { color?: string }) => color || '#ffc008'};
  min-width: ${px2rem(206)};
  text-decoration: none !important;
  width: fit-content;

  .button-solid-text {
    font-weight: 500;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(24)};
    text-align: center;
    letter-spacing: 0.01em;
    color: ${({ color }: { color?: string }) => color || '#f9d03f'};
    font-family: 'IBMPlexMono' !important;
  }

  :hover {
    opacity: 0.8;
  }
`;

export const ButtonArrowLink = styled.a<{ color?: string }>`
  display: flex;
  align-items: center;
  gap: ${px2rem(6)};

  .text {
    text-decoration: underline;
    font-weight: 500;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(24)};
    text-align: center;
    letter-spacing: 0.01em;
    color: ${({ color }: { color?: string }) => color || '#f9d03f'};
    font-family: 'IBMPlexMono' !important;
  }

  .icon {
    width: ${px2rem(20)};
    height: ${px2rem(20)};
    cursor: pointer;
  }
  :hover {
    opacity: 0.8;
  }
`;
