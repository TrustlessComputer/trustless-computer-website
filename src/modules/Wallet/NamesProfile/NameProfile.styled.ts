import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  padding-top: 40px;

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
  }

  .list {
    min-height: 60vh;
    width: 100%;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    margin-top: 32px;
  }

  .item {
    /* padding: 6px 12px !important; */
  }

  .card {
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
    }

    .card-subTitle {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 28px;
      color: #898989;
    }
  }
`;

export { Container };
