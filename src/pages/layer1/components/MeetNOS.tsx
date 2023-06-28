import IconSVG from '@/components/IconSVG';
import px2rem from '@/utils/px2rem';
import IcNosLayers from '@/assets/icons/ic-how-layer1.svg';
import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import { ButtonArrowLink } from '@/components/ButtonLink/ButtonLink.styled';
import IcArrow from '@/assets/icons/ic-arrow-right.svg';
import Text from '@/components/Text';

export const Container = styled.div`
  padding: ${px2rem(60)} ${px2rem(48)};
  padding-left: ${px2rem(75)};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(16)};

  background-color: ${({ theme }) => theme.primary.brand};

  ${MediaQueryBuilder(
    'lg',
    css`
      flex-direction: column;
    `,
  )}

  ${MediaQueryBuilder(
    'md',
    css`
      flex-direction: column;
    `,
  )}
  
  .left-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${px2rem(10)};

    .title {
      font-size: ${px2rem(30)};
      font-weight: 700;
      line-height: ${px2rem(38)};
      text-align: left;
      max-width: 32ch;
      font-family: 'IBMPlexMono';
      letter-spacing: -0.01em !important;

      ${MediaQueryBuilder(
        'lg',
        css`
          text-align: center;
          max-width: 40ch;
        `,
      )}
    }

    .desc {
      font-size: ${px2rem(18)};
      font-weight: 500;
      line-height: ${px2rem(28)};
      letter-spacing: -0.01em;
      text-align: left;
      max-width: 50ch;
      color: ${({ theme }) => theme.text3};
      margin-bottom: ${px2rem(12)};

      ${MediaQueryBuilder(
        'lg',
        css`
          text-align: center;
          max-width: 100ch;
        `,
      )}
    }
  }

  .right-view {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    ${MediaQueryBuilder(
      'md',
      css`
        svg {
          margin-top: 16px;
          max-width: 340px;
        }
      `,
    )}
  }

  .btn {
    margin-top: ${px2rem(16)};
    ${MediaQueryBuilder(
      'lg',
      css`
        align-self: center;
      `,
    )}
  }
`;

const MeetNOSSection = () => {
  return (
    <Container>
      <div className="left-view">
        <h4 className="title">How does it work?</h4>
        <h6 className="desc">
          Trustless Computer is a state machine similar to Ethereum-VM that utilizes the Bitcoin blockchain as a data
          layer to achieve transaction-level consensus. This approach allows Trustless Computer to function as a
          general-purpose state machine while taking advantage of the Bitcoin blockchain’s security and data
          availability without requiring additional modules, such as network or consensus protocols.
        </h6>

        <ButtonArrowLink
          href="https://docs.trustless.computer/trustless-computer/layer-1-trustless-computer"
          target="_blank"
        >
          <Text className="text" size="medium" fontWeight="semibold">
            Learn more
          </Text>
          <img alt="icon" className="icon" src={IcArrow} />
        </ButtonArrowLink>
      </div>

      <div className="right-view">
        <IconSVG src={IcNosLayers} maxWidth="450" />
      </div>
    </Container>
  );
};

export default MeetNOSSection;
