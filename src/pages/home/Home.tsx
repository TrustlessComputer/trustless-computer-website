import copy from 'copy-to-clipboard';
import { useState } from 'react';

import { DocumentData, FaqData } from './Data';
import {
  Container,
  CopyContainer,
  FAQContainer,
  LeftContainer,
  RightContainer,
  StyledFAQItem,
  TitleDoc,
} from './Home.styled';
import IcChevronDown from '@/assets/icons/ic-chevron-down.svg';
import IcChevronRight from '@/assets/icons/ic-chevron-right.svg';
import IcCopy from '@/assets/icons/ic-copy.svg';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickFAQ = () => {
    if (window.document) {
      window.document.getElementById('faq')?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const onClickCopy = (text: string) => {
    copy(text);
  };

  return (
    <Container>
      <div className="wrap-container">
        <div className="wrap-content">
          <LeftContainer>
            <div className="header">
              <div className="headerTitle">
                {DocumentData.map((data, index) => {
                  return (
                    <TitleDoc
                      key={index.toString()}
                      isSelected={currentIndex === index}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <p className="text">{data.title}</p>
                    </TitleDoc>
                  );
                })}
              </div>
              <CopyContainer>
                <pre className="pre">
                  <code className="code">{DocumentData[currentIndex].code}</code>
                  <div className="icCopy" onClick={() => onClickCopy(DocumentData[currentIndex].code)}>
                    <img alt="ic-copy" src={IcCopy}></img>
                  </div>
                </pre>
              </CopyContainer>
            </div>
          </LeftContainer>

          <RightContainer>
            <p className="title">TRUSTLESS COMPUTER</p>
            <p className="subTitle">Build dapps on Bitcoin.</p>
            <a href="https://docs.trustless.computer" target="_blank">
              <div className="button">
                <p className="text">{`Let's build`}</p>
              </div>
            </a>
          </RightContainer>
        </div>
        <div className="btnFaq" onClick={onClickFAQ}>
          <p className="text">Learn more</p>
          <img alt="icon" className="icon" src={IcChevronDown} />
        </div>
      </div>

      <FAQContainer id="faq">
        <p className="title"></p>
        <div className="faqContent">
          {FaqData.map((data, index) => {
            const initOpen = index === 0;
            return <FAQItem key={index.toString()} answer={data.answer} initOpen={initOpen} question={data.question} />;
          })}
        </div>
      </FAQContainer>
    </Container>
  );
};

const FAQItem = ({ initOpen, question, answer }: { initOpen: boolean; question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(initOpen);
  return (
    <StyledFAQItem isSelected={isOpen}>
      <div className="header" onClick={() => setIsOpen(!isOpen)}>
        <p className="question">{question}</p>
        <img alt="icon" className="icon" src={IcChevronRight} />
      </div>
      {isOpen && <p className="answer">{answer}</p>}
    </StyledFAQItem>
  );
};

export default Home;
