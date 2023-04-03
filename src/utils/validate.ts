import { validate, getAddressInfo, AddressType } from 'bitcoin-address-validation';
import { ethers } from 'ethers';

export const validateWalletAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateBTCAddressTaproot = (_address: string): boolean => {
  const isBTCAddress = validate(_address);
  if (isBTCAddress) {
    const addressInfo = getAddressInfo(_address);
    return addressInfo.type === AddressType.p2tr;
  }
  return false;
};

export const validateBTCAddress = (_address: string): boolean => {
  return validate(_address);
};

export const validateEVMAddress = (_address: string): boolean => {
  return ethers.utils.isAddress(_address);
};
