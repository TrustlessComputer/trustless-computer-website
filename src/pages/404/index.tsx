// import { useNavigate } from "react-router-dom";
import { Container } from './404.styled';

const Page404 = () => {
  // const navigate = useNavigate();
  // const handleBackToHome = () => navigate("/");
  return (
    <Container>
      <p className="title">Page not found</p>
    </Container>
  );
};

export default Page404;
