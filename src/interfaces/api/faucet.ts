export interface IFaucetStatusResp {
  id: string;
  tcTx: string;
  address: string;
  statusStr: string;
  amount: string;
  createdAt: string;
}

export type EarnFaucetType = 'Follow-up' | 'Pending' | 'Processing' | 'Success';
export interface IEarnFaucetStatus {
  normal: EarnFaucetType;
  bns: EarnFaucetType;
  artifact: EarnFaucetType;
}
