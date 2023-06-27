import { ButtonLink } from '@/components/ButtonLink/ButtonLink.styled';
import IconSVG from '@/components/IconSVG';
import px2rem from '@/utils/px2rem';
import IcNosLayers from '@/assets/icons/ic-nos-layers.svg';
import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';

export const Container = styled.div`
  padding: ${px2rem(45)};
  padding-left: ${px2rem(75)};
  display: flex;
  flex-direction: row;
  align-items: center;

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
      font-size: 34px;
      font-weight: 700;
      line-height: 44px;
      text-align: left;
      max-width: 20ch;

      ${MediaQueryBuilder(
        'lg',
        css`
          text-align: center;
          max-width: 30ch;
        `,
      )}
    }

    .desc {
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      letter-spacing: -0.01em;
      text-align: left;
      max-width: 50ch;
      padding-top: ${px2rem(10)};
      padding-bottom: ${px2rem(10)};
      color: ${({ theme }) => theme.text3};

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
  }

  .btn {
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
        <h4 className="title">Need speed? Meet NOS, 2-second block time.</h4>
        <h6 className="desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </h6>
        <ButtonLink className="button-solid btn" href="" target="_blank">
          <p className="button-link-text">{`Build a crowdsale → `}</p>
        </ButtonLink>
      </div>

      <div className="right-view">
        <IconSVG src={IcNosLayers} maxWidth="450" />
      </div>
    </Container>
  );
};

export default MeetNOSSection;
