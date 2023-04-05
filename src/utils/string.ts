export const checkLines = (str: string) => str.split(/\r\n|\r|\n/).length;

export const checkForHttpRegex = (str: string) => {
  const httpsRegex = /^(http|https):\/\//;
  return httpsRegex.test(str);
};

export const isBase64String = (str: string): boolean => {
  try {
    window.atob(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const isNumeric = (str: never | string) => {
  return /^\d+$/.test(str);
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
