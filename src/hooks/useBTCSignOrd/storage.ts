import { LocalStorageKey } from '@enums/local-storage';

// ----------------
// ORD
// ----------------
const getKeyBTCOrdAddress = (web3Address: string) => `${web3Address}-${LocalStorageKey.ORD_ADDRESS}`;

const getBTCOrdAddress = (web3Address: string) => {
  return localStorage.getItem(getKeyBTCOrdAddress(web3Address));
};

const setBTCOrdAddress = (web3Address: string, taprootAddress: string) => {
  return localStorage.setItem(getKeyBTCOrdAddress(web3Address), taprootAddress);
};

// ----------------
// SIGN
// ----------------
const getKeyNonceSignWithAddress = (web3Address: string) => `${web3Address}-${LocalStorageKey.FLAG_SIGN}`;

const getNonceSignWithAddress = (web3Address: string) => {
  return localStorage.getItem(getKeyNonceSignWithAddress(web3Address));
};

const setNonceSignWithAddress = (web3Address: string, nonce: string) => {
  return localStorage.setItem(getKeyNonceSignWithAddress(web3Address), nonce);
};

export { getBTCOrdAddress, setBTCOrdAddress, getNonceSignWithAddress, setNonceSignWithAddress };
