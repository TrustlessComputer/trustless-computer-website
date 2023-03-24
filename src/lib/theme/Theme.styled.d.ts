import {
  FlattenSimpleInterpolation,
  ThemedCssFunction,
} from "styled-components";

import { BreakPointsType, TransitionsType } from "./Theme";

export type Color = string;

export interface Colors {
  darkMode: boolean;
  white: Color;
  black: Color;

  // Background
  bg1: Color;
  bg2: Color;
  bg3: Color;

  // Text
  text1: Color;
  text2: Color;
  text3: Color;

  // Border
  border1: Color;
  border2: Color;
  border3: Color;

  // Button
  btn1: Color;
  btn2: Color;

  // Specific color

  red: Color;
  yellow: Color;

  // Icons
  icon1: Color;
  icon2: Color;

  // Hover
  hover1: Color;
}

export interface Grids {
  sm: number;
  md: number;
  lg: number;
}

declare module "styled-components" {
  export interface ITheme extends Colors {
    grids: Grids;

    // media queries
    deprecated_mediaWidth: {
      deprecated_upToExtraSmall: ThemedCssFunction<ITheme>;
      deprecated_upToSmall: ThemedCssFunction<ITheme>;
      deprecated_upToMedium: ThemedCssFunction<ITheme>;
      deprecated_upToLarge: ThemedCssFunction<ITheme>;
    };

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation;
    flexRowNoWrap: FlattenSimpleInterpolation;

    breakpoint: BreakPointsType;
    transition: TransitionsType;
    opacity: {
      hover: number;
      click: number;
      disabled: number;
      enabled: number;
    };

    deepShadow: string;
    shallowShadow: string;
  }
}
