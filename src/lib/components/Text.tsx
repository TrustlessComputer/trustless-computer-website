import { Text, TextProps as TextPropsOriginal } from "rebass";
import styled from "styled-components";

const TextWrapper = styled(Text)<{ color: keyof string }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`;

const TextSuperSmall = (props: TextPropsOriginal) => (
  <TextWrapper
    {...props}
    className={`fs-suppersmall fw-medium ${props.className ?? ""}`}
  />
);

const TextSmall = (props: TextPropsOriginal) => (
  <TextWrapper
    {...props}
    className={`fs-small fw-medium ${props.className ?? ""}`}
  />
);

const TextRegular = (props: TextPropsOriginal) => (
  <TextWrapper
    {...props}
    className={`fs-regular fw-medium ${props.className ?? ""}`}
  />
);

const TextMedium = (props: TextPropsOriginal) => (
  <TextWrapper
    {...props}
    className={`fs-medium fw-medium ${props.className ?? ""}`}
  />
);

const TextSuperMedium = (props: TextPropsOriginal) => (
  <TextWrapper
    {...props}
    className={`fs-supermedium fw-medium ${props.className ?? ""}`}
  />
);

const TextLarge = (props: TextPropsOriginal) => (
  <TextWrapper
    {...props}
    className={`fs-large fw-medium ${props.className ?? ""}`}
  />
);

const TextAvgLarge = (props: TextPropsOriginal) => (
  <TextWrapper
    {...props}
    className={`fs-avglarge fw-medium ${props.className ?? ""}`}
  />
);

const TextVeryLarge = (props: TextPropsOriginal) => (
  <TextWrapper
    {...props}
    className={`fs-verylarge fw-medium ${props.className ?? ""}`}
  />
);

const TextSuperLarge = (props: TextPropsOriginal) => (
  <TextWrapper
    {...props}
    className={`fs-superlarge fw-medium ${props.className ?? ""}`}
  />
);

export {
  TextAvgLarge,
  TextLarge,
  TextMedium,
  TextRegular,
  TextSmall,
  TextSuperLarge,
  TextSuperMedium,
  TextSuperSmall,
  TextVeryLarge,
};
