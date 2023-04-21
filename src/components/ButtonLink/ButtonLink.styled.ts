import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

export const ButtonLink = styled.a<{ disabled?: boolean }>`
  padding: ${px2rem(14)} ${px2rem(24)};
  gap: ${px2rem(10)};
  background: linear-gradient(90deg, #ff8008 0%, #ffc837 100%);
  border-radius: 8px;
  text-decoration: none !important;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: ${({ disabled }: { disabled?: boolean }) => (disabled ? 0.5 : 1)};

  .button-link-text {
    font-weight: 500;
    font-size: ${px2rem(18)};
    line-height: ${px2rem(26)};
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

export const ButtonLinkSolid = styled.a`
  padding: ${px2rem(12)} ${px2rem(24)};
  gap: ${px2rem(10)};
  border-radius: 8px;
  border: 1px solid #ffc008;
  min-width: ${px2rem(206)};
  text-decoration: none !important;
  width: fit-content;

  .button-solid-text {
    font-weight: 500;
    font-size: ${px2rem(18)};
    line-height: ${px2rem(26)};
    text-align: center;
    letter-spacing: 0.01em;
    color: #f9d03f;
    font-family: 'IBMPlexMono' !important;
  }

  :hover {
    opacity: 0.8;
  }
`;
