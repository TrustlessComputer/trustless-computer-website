import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSVG = styled.svg<{ size: string; stroke?: string }>`
  animation: 2s ${rotate} linear infinite;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  path {
    stroke: ${({ stroke, theme }) => stroke || theme.btn1};
  }
`;

/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
function Loader({
  size = "22px",
  stroke,
  strokeWidth,
  ...rest
}: {
  size?: string;
  stroke?: string;
  strokeWidth?: number;
  [k: string]: any;
}) {
  return (
    <StyledSVG
      className="loader"
      fill="none"
      size={size}
      stroke={stroke}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ?? "2.5"}
      />
    </StyledSVG>
  );
}

const StyledAnimateLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  width: 170px;
  position: relative;
  margin: 0px;
  padding: 0px;

  .circle {
    border: 5px transparent solid;
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 69%;
  }

  .cyan {
    top: 0px;
    border-top: 5px cyan solid;
    animation-delay: 4s;
    animation: cyan 1.5s infinite;
  }

  /*:after element = circle at the end of each line.
  :before element = cap in be start of each line*/

  .cyan:after {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    background: cyan;
    border-radius: 69%;
    right: 5px;
    top: 10px;
    box-shadow: 0px 0px 20px cyan;
  }

  .cyan:before {
    content: " ";
    width: 5px;
    height: 5px;
    position: absolute;
    background: cyan;
    top: 10px;
    left: 11px;
    border-radius: 69%;
  }

  .magenta {
    left: 0px;
    bottom: 0px;
    border-top: 5px magenta solid;
    animation: magenta 1.5s infinite;
  }

  .magenta:after {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    background: magenta;
    border-radius: 69%;
    right: 5px;
    top: 10px;
    box-shadow: 0px 0px 20px magenta;
  }

  .magenta:before {
    content: " ";
    width: 5px;
    height: 5px;
    position: absolute;
    background: magenta;
    top: 10px;
    left: 11px;
    border-radius: 69%;
  }

  .yellow {
    right: 0px;
    bottom: 0px;
    border-top: 5px yellow solid;
    animation: yellow 1.5s infinite;
  }

  .yellow:after {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    background: yellow;
    border-radius: 69%;
    right: 5px;
    top: 10px;
    box-shadow: 0px 0px 20px yellow;
  }

  .yellow:before {
    content: " ";
    width: 5px;
    height: 5px;
    position: absolute;
    background: yellow;
    top: 10px;
    left: 11px;
    border-radius: 69%;
  }

  @keyframes cyan {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes magenta {
    0% {
      transform: rotate(240deg);
    }
    100% {
      transform: rotate(600deg);
    }
  }
  @keyframes yellow {
    0% {
      transform: rotate(120deg);
    }
    100% {
      transform: rotate(480deg);
    }
  }

  p {
    font-family: roboto, sans-serif;
    color: #eee;
    position: absolute;
    top: 175px;
    font-size: 1.5em;
    letter-spacing: 0.15em;
    font-weight: 100;
    filter: drop-shadow(2px 2px 15px #ffffff70);
  }
`;

const AnimateLoader = () => (
  <StyledAnimateLoader className="animate-loader">
    <div className="circle cyan" />
    <div className="circle magenta" />
    <div className="circle yellow" />
  </StyledAnimateLoader>
);

export { AnimateLoader, Loader };
