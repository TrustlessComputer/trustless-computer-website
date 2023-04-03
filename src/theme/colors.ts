export const colors = {
  white: '#FFFFFF',
  black: '#000000',
};

export type ColorsTheme = typeof darkTheme;

const commonTheme = {
  white: colors.white,
  black: colors.black,
};

export const darkTheme = {
  ...commonTheme,
  // Background
  bg1: '#1C1C1C',
  bg2: '#303030',
  bg3: '#404040',

  // Text
  text1: '#F5F5F5',
  text2: '#C9C9C9',
  text3: '#1A73E8',

  // Border
  border1: '#585858',
  border2: '#686868',
  border3: '#1A73E8',

  // Button
  btn1: '#1A73E8',
  btn2: '#404040',

  red: '#FF4343',
  yellow: '#E3A507',

  // Icons
  icon1: '#D9D9D9',
  icon2: '#D9D9D9',

  // Hover1
  hover1: '#3b3a3a',
};

export const lightTheme = {
  ...commonTheme,

  // Background
  bg1: '#EFEFEF',
  bg2: commonTheme.white,
  bg3: '#F8F8F8',

  // Text
  text1: commonTheme.black,
  text2: '#BFBFBF',
  text3: '#9C9C9C',

  // Border
  border1: '#e3e2e2',
  border2: '#F2F4F5',
  border3: '#1A73E8',

  // Button
  btn1: '#282828',
  btn2: commonTheme.white,

  red: '#FF4343',
  yellow: '#E3A507',

  // Icons
  icon1: commonTheme.black,
  icon2: '#BFBFBF',

  // Hover1
  hover1: '#D9D9D9',
};
