import copy from "copy-to-clipboard";
import { useState } from "react";

import { DocumentData, FaqData } from "./Data";
import {
  Container,
  CopyContainer,
  FAQContainer,
  FAQItem,
  LeftContainer,
  RightContainer,
  TitleDoc,
} from "./Home.styled";
import IcChevronDown from "./icons/ic-chevron-down.svg";
import IcChevronRight from "./icons/ic-chevron-right.svg";
import IcCopy from "./icons/ic-copy.svg";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentIndexFaq, setCurrentIndexFaq] = useState(0);

  const onClickFAQ = () => {
    if (window.document) {
      window.document.getElementById("faq")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const onClickCopy = (text: string) => {
    copy(text);
  };

  return (
    <Container>
      <div className="container">
        <div className="content">
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
                  <code className="code">
                    {DocumentData[currentIndex].code}
                  </code>
                  <div
                    className="icCopy"
                    onClick={() => onClickCopy(DocumentData[currentIndex].code)}
                  >
                    <img alt="ic-copy" src={IcCopy}></img>
                  </div>
                </pre>
              </CopyContainer>
            </div>
          </LeftContainer>

          <RightContainer>
            <p className="title">TRUSTLESS COMPUTER</p>
            <p className="subTitle">Build dapps on Bitcoin.</p>
            <a className="button" href="https://docs.trustless.computer">
              <p className="text">{`Let's build`}</p>
            </a>
          </RightContainer>
        </div>
        <div className="btnFaq" onClick={onClickFAQ}>
          <p className="text">FAQ</p>
          <img alt="icon" className="icon" src={IcChevronDown} />
        </div>
      </div>

      <FAQContainer id="faq">
        <p className="title"></p>
        <div className="faqContent">
          {FaqData.map((data, index) => {
            const isOpen = currentIndexFaq === index;
            return (
              <FAQItem key={index.toString()} isSelected={isOpen}>
                <div
                  className="header"
                  onClick={() => setCurrentIndexFaq(index)}
                >
                  <p className="question">{data.question}</p>
                  <img alt="icon" className="icon" src={IcChevronRight} />
                </div>
                {isOpen && <p className="answer">{data.answer}</p>}
              </FAQItem>
            );
          })}
        </div>
      </FAQContainer>
    </Container>
  );
};

export default Home;
