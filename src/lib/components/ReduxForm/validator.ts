import BigNumber from "bignumber.js";
import { isAddress as isEtherAddress } from "ethers/lib/utils";
import { convert, format } from "lib/utils";
import isEmpty from "lodash/isEmpty";

const isSafeInteger = (number: number) =>
  Math.abs(number) <= Number.MAX_SAFE_INTEGER;

const required = (value: any) => (isEmpty(value) ? "Required" : undefined);

const maxLength = (max: number, message?: string) => (value: string) =>
  value && value.length > max
    ? message || `Must be ${max} characters or less`
    : undefined;

const minLength = (min: number, message?: string) => (value: string) =>
  value && value.length < min
    ? message || `Must be ${min} characters or more`
    : undefined;

const isInteger = (value: string) =>
  value && !new BigNumber(value).isInteger()
    ? "Must be a integer number"
    : undefined;

const number = (value: string) => {
  const bn = new BigNumber(value);
  if (bn.isNaN()) {
    return "Must be a number";
  }
  if (value && !isSafeInteger(bn.toNumber())) {
    return "This number is too large!";
  }
  return undefined;
};

const minValue = (min: number, message?: string) => (value: string) =>
  value && convert.toNumber({ text: value }) < min
    ? message || `Must be at least ${format.number(min)}`
    : undefined;

const maxValue = (max: number, message?: string) => (value: string) =>
  value && convert.toNumber({ text: value }) > max
    ? message || `Must be less than or equal ${format.number(max)}`
    : undefined;

const largerThan = (min: number, message?: string) => (value: string) =>
  value && convert.toNumber({ text: value }) <= min
    ? message || `Must be larger than ${format.number(min)}`
    : undefined;

const email = (message?: string) => (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? message || "Invalid email address"
    : undefined;

const regexp =
  (pattern: RegExp, message = "Invalid data") =>
  (value: string) =>
    pattern && !pattern.test(value) ? message : undefined;

const etherAddress = (message?: string) => (value: string) => {
  value = value?.trim();
  if (value && value?.length < 15) {
    return "Invalid address";
  }
  if (!isEtherAddress(value)) {
    return message || "Please enter External address";
  }

  return undefined;
};

const nearAddress = (message?: string) => (value: string) => {
  value = value?.trim();
  const ACCOUNT_ID_REGEX =
    /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;

  if (value.length >= 2 && value.length <= 64 && ACCOUNT_ID_REGEX.test(value)) {
    return undefined;
  }

  return "Invalid address";
};

const combinedAmount = [
  required,
  number,
  largerThan(0, "Please enter an amount greater than 0"),
];

const combinedNanoAmount = [
  required,
  isInteger,
  number,
  minValue(1, "Please enter an amount greater than 1."),
];

const combinedEtherAddress = [required, etherAddress()];
const combinedNearAddress = [required, nearAddress()];
const combinedUnknownAddress = [required, minLength(15)];

const combinedAccountName = [
  required,
  minLength(1),
  maxLength(50),
  regexp(/\w+$/i, 'Please use a valid account name (Ex: "Cat, Account-1,..").'),
];

const etherHash = (message?: string) => (value: string) => {
  if (value && value?.length < 15) {
    return "Invalid Hash";
  }
  if (!/^0x([A-Fa-f0-9]{64})$/.test(value)) {
    return message || "Please enter valid transaction hash";
  }
  return undefined;
};

const combinedOutchainHash = [required, etherHash()];

const address = () => {
  return "Invalid address";
};

const notEnoughPRVFee = () => {
  return "Please top up PRV to cover the transaction fee.";
};

const combineInvalidAddress = [required, address];

const NAME_PATTERN = /^[A-Za-z0-9]*$/;

const validateAlphaNumericText = (message?: string) => (value: any) => {
  return !NAME_PATTERN.test(value) ? message : undefined;
};

const validator = {
  validateAlphaNumericText,
  minLength,
  maxLength,
  required,
  maxValue,
  minValue,
  address,
  notEnoughPRVFee,
  combinedAmount,
  combinedAccountName,
  combinedNanoAmount,
  combineInvalidAddress,
  combinedUnknownAddress,
  combinedEtherAddress,
  combinedNearAddress,
  combinedOutchainHash,
  email,
};

export default validator;
