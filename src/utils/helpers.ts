import { getAddress } from '@ethersproject/address';
import camelCase from 'lodash/camelCase';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export const shortCryptoAddress = (address = '', toLength?: number) => {
  if (toLength) {
    if (address.length <= toLength) return address;
    const x = Math.floor(toLength / 2);
    return `${address?.substr(0, x)}...${address?.substr(address?.length - x)}`;
  }
  if (address.length <= 16) return address;
  return `${address?.substr(0, 8)}...${address?.substr(address?.length - 8)}`;
};

export function shortenAddress(address: string, chars = 7, charsFirst = 5): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, charsFirst)}...${parsed.substring(address.length - chars)}`;
}

export const camelCaseKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelCaseKeys(v));
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelCaseKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};
