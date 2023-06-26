import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 120px;
  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    flex-direction: column;
    gap: 40px;
  `}
`;

const Image = styled.img`
  height: 450px;
  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    height: 350px;
  `}
`;

const Content = styled.div`
  flex: 1;
  .lbl-title {
    font-size: ${px2rem(48)};
  }
  .lbl-content {
    margin-top: ${px2rem(18)};
  }
  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
   .lbl-title {
      font-size: ${px2rem(38)};
    }
  `}
`;

export { Container, Image, Content };
