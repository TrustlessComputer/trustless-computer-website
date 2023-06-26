import { css } from 'styled-components/macro';
import { darkTheme, lightTheme } from '@/theme/colors';

export const MEDIA_WIDTHS = {
  deprecated_upToExtraSmall: 500,
  deprecated_upToSmall: 720,
  deprecated_upToMedium: 1072,
  deprecated_upToLarge: 1280,
};

const deprecated_mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(
  MEDIA_WIDTHS,
).reduce((acc, size) => {
  acc[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return acc;
}, {} as any);

export const BREAKPOINTS = {
  xs: '396px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  navSearchInputVisible: '1100px',
  xl: '1280px',
  xxl: '1536px',
  xxxl: '1920px',
};

type MediaWidthsType = typeof BREAKPOINTS;
type MediaWidthsKeysType = keyof MediaWidthsType;

export const MediaQueryBuilder = (key: MediaWidthsKeysType, innerCSS?: any) =>
  css`
    @media (max-width: ${BREAKPOINTS[key]}) {
      ${innerCSS};
    }
  `;

// deprecated - please use the ones in styles.ts file
const transitions = {
  duration: {
    slow: '500ms',
    medium: '250ms',
    fast: '125ms',
  },
  timing: {
    ease: 'ease',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },
};

const opacities = {
  hover: 0.6,
  click: 0.4,
  disabled: 0.5,
  enabled: 1,
};

const fonts = {
  code: 'serif',
};

const fontSizes = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
  h1: '40px',
  h3: '34px',
  h5: '24px',
  h6: '20px',
};

const lineHeight = {
  xs: '16px',
  sm: '18px',
  md: '20px',
  lg: '22px',
  xl: '24px',
  xxl: '28px',
  h1: '48px',
  h3: '44px',
  h5: '34px',
  h6: '30px',
};

function getSettings(darkMode: boolean) {
  return {
    grids: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '24px',
      xl: '32px',
    },
    fonts,
    fontSizes,
    lineHeight,

    // shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    deprecated_mediaWidth: deprecated_mediaWidthTemplates,

    navHeight: 72,
    mobileBottomBarHeight: 52,

    // deprecated - please use hardcoded exported values instead of
    // adding to the theme object
    breakpoint: BREAKPOINTS,
    transition: transitions,
    opacity: opacities,
  };
}

export function getTheme(darkMode: boolean) {
  return {
    darkMode,
    ...(darkMode ? darkTheme : lightTheme),
    ...getSettings(darkMode),
  };
}
