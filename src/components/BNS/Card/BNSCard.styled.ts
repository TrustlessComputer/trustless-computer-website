import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledBNSCard = styled.div`
  &.card {
    width: 100%;
    height: auto;
    text-decoration: none;
    --bs-card-bg: none;
  }

  .card-content {
    background: #2e2e2e;
    border: 1px solid transparent;
    :hover {
      border: 1px solid #d9d9d9;
    }
  }

  .card-image {
    background: #5b5b5b;
    .image {
      min-height: 100px;
      width: 100%;
      aspect-ratio: 1 / 1;
      height: auto;
      object-fit: cover;
      padding: 32px;
    }
  }

  .card-info {
    padding: 16px 24px;
    .card-title {
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: -0.01em;
      color: #ffffff;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .card-subTitle {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 28px;
      color: #898989;
    }
  }

  .transfer-btn {
    margin-top: ${px2rem(24)};
    width: 100%;
    padding-top: ${px2rem(5)};
    padding-bottom: ${px2rem(5)};
    font-size: ${px2rem(14)};
  }
`;
