import IcDappGroup from '@/assets/icons/ic-dapp-group.svg';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink.styled';
import IconSVG from '@/components/IconSVG';
import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const Container = styled.div`
  padding: ${px2rem(45)};
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.primary['2e']};

  .left-view {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .right-view {
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
    }
  }
`;

const BitcoinDappStoreSection = () => {
  return (
    <Container>
      <div className="left-view">
        <IconSVG src={IcDappGroup} maxWidth="500" />
      </div>
      <div className="right-view">
        <h4 className="title">Bitcoin Dapp Store</h4>
        <h6 className="desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </h6>

        <ButtonLink className="button-solid" href="" target="_blank">
          <p className="button-link-text">{`Issue your BRC-721 NFT collection → `}</p>
        </ButtonLink>
      </div>
    </Container>
  );
};

export default BitcoinDappStoreSection;
