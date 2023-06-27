import px2rem from '@/utils/px2rem';
import styled from 'styled-components';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink.styled';
import IconSVG from '@/components/IconSVG';
import IcTrustlessHola from '@/assets/icons/ic-trustlest-hola.svg';

export const Container = styled.div`
  padding: ${px2rem(45)};
  display: flex;
  flex-direction: row;

  background-color: ${({ theme }) => theme.primary['2e']};
  border-radius: 5px;

  .left-view {
    display: flex;
    flex-direction: column;
    flex: 3;
    margin-right: 30px;
    gap: ${px2rem(10)};

    .title {
      font-size: 34px;
      font-weight: 700;
      line-height: 58px;
      text-align: left;
      max-width: 20ch;
    }

    .desc {
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      text-align: left;
      padding-top: ${px2rem(10)};
      padding-bottom: ${px2rem(10)};
      color: ${({ theme }) => theme.text3};
    }

    .get-tc-btn {
      min-width: 200px;
      display: flex;
      justify-content: center;
    }
  }

  .right-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const IntroduceSection = () => {
  return (
    <Container>
      <div className="left-view">
        <h2 className="title">What is TC?</h2>
        <h6 className="desc">
          TC stands for Trustless Computer's native cryptocurrency, which is utilized for engaging in decentralized
          financial activities and participating in on-chain games on Bitcoin.
        </h6>
        <ButtonLink className="button-solid get-tc-btn" href="https://tcgasstation.com/" target="_blank">
          <p className="button-link-text get-tc-text">{`Get TC`}</p>
        </ButtonLink>
      </div>

      <div className="right-view">
        <IconSVG src={IcTrustlessHola} maxWidth="380" />
      </div>
    </Container>
  );
};

export default IntroduceSection;
