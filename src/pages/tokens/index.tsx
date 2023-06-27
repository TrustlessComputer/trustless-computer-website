import { Container } from './Token.styled';

import IntroduceSection from './components/IntroduceSection';
import DescriptionSection from './components/DescriptionSection';
import StatisticsSection from './components/StatisticsSection';

const TokensPage = () => {
  return (
    <Container>
      <div className="content-wrapper">
        <IntroduceSection />
        <DescriptionSection />
        <div className="lineBreak" />
        <StatisticsSection />
      </div>
    </Container>
  );
};

export default TokensPage;
