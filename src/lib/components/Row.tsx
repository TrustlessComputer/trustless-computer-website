import { Box } from "rebass/styled-components";
import styled from "styled-components";

const Row = styled(Box)<{
  width?: string;
  align?: string;
  justify?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
}>`
  padding: 0;
  width: ${({ width }) => width ?? "100%"};
  display: flex;
  align-items: ${({ align }) => align ?? "center"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

const RowBetween = styled(Row)`
  justify-content: space-between;
`;

const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
`;

const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`;

const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`;

export { AutoRow, Row, RowBetween, RowFixed, RowFlat };
