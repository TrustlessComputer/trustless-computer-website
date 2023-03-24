import { darkTheme, lightTheme } from "lib/theme";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  createGlobalStyle,
  css,
  ITheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";

import { FONTS } from "./Theme.fonts";
import { darkModeSelector } from "./Theme.selector";
import { Colors } from "./Theme.styled";

export const MEDIA_WIDTHS = {
  deprecated_upToExtraSmall: 500,
  deprecated_upToSmall: 720,
  deprecated_upToMedium: 960,
  deprecated_upToLarge: 1280,
};

export interface BreakPointsType {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

const BREAKPOINTS: BreakPointsType = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
};

// deprecated - please use the ones in styles.ts file
export interface TransitionsType {
  duration: {
    slow: string;
    medium: string;
    fast: string;
  };
  timing: {
    ease: string;
    in: string;
    out: string;
    inOut: string;
  };
}

// deprecated - please use the ones in styles.ts file
const transitions: TransitionsType = {
  duration: {
    slow: "500ms",
    medium: "250ms",
    fast: "125ms",
  },
  timing: {
    ease: "ease",
    in: "ease-in",
    out: "ease-out",
    inOut: "ease-in-out",
  },
};

const opacities = {
  hover: 0.8,
  click: 0.4,
  disabled: 0.5,
  enabled: 1,
};

export const white = "#FFFFFF";
export const black = "#000000";

const deprecated_mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

export function colors(darkMode: boolean): Colors {
  if (darkMode) return darkTheme();
  return lightTheme();
}

export function appTheme(darkMode: boolean): ITheme {
  return {
    ...colors(darkMode),
    darkMode,

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    // media queries
    deprecated_mediaWidth: deprecated_mediaWidthTemplates,

    breakpoint: BREAKPOINTS,
    transition: transitions,
    opacity: opacities,

    deepShadow: darkMode
      ? "12px 16px 24px rgba(0, 0, 0, 0.24), 12px 8px 12px rgba(0, 0, 0, 0.24), 4px 4px 8px rgba(0, 0, 0, 0.32);"
      : "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    shallowShadow:
      "4px 4px 10px rgba(0, 0, 0, 0.24), 2px 2px 4px rgba(0, 0, 0, 0.12), 1px 2px 2px rgba(0, 0, 0, 0.12);",

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export const useTheme = () => {
  const darkMode = useSelector(darkModeSelector);
  return useMemo(() => appTheme(darkMode), [darkMode]);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeObject = useTheme();
  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
};

export const ThemedGlobalStyle = createGlobalStyle`
  #root {
    font-family: Inter, sans-serif !important;
  }

  button, p, input {
    color: ${({ theme }: { theme: ITheme }) => theme.text1};
    font-size: ${FONTS.SIZE.regular}px;
    line-height: ${FONTS.SIZE.regular + 7}px;
  }

  body {
    min-height: 100vh;
    box-sizing: border-box;
    background: ${({ theme }: { theme: ITheme }) => theme.bg1};
    color: ${({ theme }: { theme: ITheme }) => theme.text1};
    font-weight: 800;

    div {
      color: ${({ theme }: { theme: ITheme }) => theme.text1};
    }
  }

  .fw-regular {
    font-weight: 400;
  }

  .fw-medium {
    font-weight: 500;
  }

  .fw-light {
    font-weight: 200;
  }

  .fw-suppermedium {
    font-weight: 600;
  }

  .fw-bold {
    font-weight: 700;
  }

  .fs-suppersmall {
    font-size: ${FONTS.SIZE.superSmall}px;
    line-height: ${FONTS.SIZE.superSmall + 7}px;
  }

  .fs-small {
    font-size: ${FONTS.SIZE.small}px;
    line-height: ${FONTS.SIZE.small + 7}px;
  }

  .fs-regular {
    font-size: ${FONTS.SIZE.regular}px;
    line-height: ${FONTS.SIZE.regular + 7}px;
  }

  .fs-medium {
    font-size: ${FONTS.SIZE.medium}px;
    line-height: ${FONTS.SIZE.medium + 7}px;
  }

  .fs-supermedium {
    font-size: ${FONTS.SIZE.superMedium}px;
    line-height: ${FONTS.SIZE.superMedium + 7}px;
  }

  .fs-large {
    font-size: ${FONTS.SIZE.large}px;
    line-height: ${FONTS.SIZE.large + 7}px;
  }

  .fs-avglarge {
    font-size: ${FONTS.SIZE.avgLarge}px;
    line-height: ${FONTS.SIZE.avgLarge + 7}px;
  }

  .fs-verylarge {
    font-size: ${FONTS.SIZE.veryLarge}px;
    line-height: ${FONTS.SIZE.veryLarge + 7}px;
  }

  .fs-superlarge {
    font-size: ${FONTS.SIZE.superLarge}px;
    line-height: ${FONTS.SIZE.superLarge + 7}px;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .error {
    color: ${({ theme }: { theme: ITheme }) => theme.red};;
  }

  .warning {
    color: ${({ theme }: { theme: ITheme }) => theme.yellow};;
  }

  svg {
    stroke-width: 2px;
  }
`;
