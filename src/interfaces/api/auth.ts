export interface IGenerativeNonceMessagePayload {
  address: string;
  walletType?: 'btc_prvkey';
}

export interface IGenerativeNonceMessageResponse {
  data: string;
}

export interface IVerifyNonceMessagePayload {
  // signature: string;
  // messagePrefix: string;
  // address: string;
  // addressBtc: string; // taproot
  // addressBtcSegwit: string;
  // ethSignature: string;

  address: string;
  ethsignature: string;
}

export interface IVerifyNonceMessageResponse {
  accessToken: string;
  refreshToken: string;
  isVerified: boolean;
}
