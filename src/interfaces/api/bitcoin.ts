import * as TC_SDK from 'trustless-computer-sdk';

export interface IInscriptionByOutput {
  [key: string]: TC_SDK.Inscription[];
}

export interface ICollectedUTXOResp {
  address: string;
  inscription_id: string;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  txrefs: TC_SDK.UTXO[];
  inscriptions_by_outputs: IInscriptionByOutput;
}

export enum FeeRateName {
  fastestFee = 'fastestFee',
  halfHourFee = 'halfHourFee',
  hourFee = 'hourFee',
}

export interface IFeeRate {
  [FeeRateName.fastestFee]: number;
  [FeeRateName.halfHourFee]: number;
  [FeeRateName.hourFee]: number;
}

export enum TrackTxType {
  normal = 'normal',
  inscription = 'inscription',
  buyInscription = 'buy-inscription',
  buySplit = 'buy-split-inscription',
  listSplit = 'list-split-inscription',
  list = 'list-inscription',
  cancel = 'cancel-list-inscription',
}

export interface ITrackTx {
  address: string;
  receiver: string;
  type: TrackTxType;
  inscription_id: string;
  inscription_number: number;
  send_amount: number;
  txhash: string;
  inscription_list?: string[];
  inscription_number_list?: number[];
}

export enum HistoryStatusType {
  pending = 'Pending',
  failed = 'Failed',
  success = 'Success',
  cancelling = 'cancelling',
  listing = 'listing',
  matched = 'matched',
  cancelled = 'cancelled',

  waitingPayment = 'Waiting for payment',
  receivedPayment = 'Payment received',
  buying = 'Buying',
  bought = 'Bought',
  refunding = 'Refunding',
  refunded = 'Refunded',
  expired = 'Expired',
}

export type HistoryStatusColor = '#ff7e21' | '#24c087' | '#ff4747' | '#5b5b5b';

export interface ITxHistory {
  txhash: string;
  status: HistoryStatusType;
  statusColor: HistoryStatusColor;
  type: TrackTxType;
  inscription_id: string;
  inscription_number: number;
  send_amount: number;
  created_at: string;
  isExpired: boolean;
  inscription_list: string[];
  inscription_number_list: number[];
}

export interface IListingPayload {
  raw_psbt: string; // base64
  inscription_id: string;
  split_tx: string;
  address?: string;
}

export interface IRetrieveOrderPayload {
  orderID?: string;
  inscriptionID?: string;
}

export interface IRetrieveOrdersPayload {
  order_list: string[];
}

export interface IRetrieveOrdersResp {
  raw_psbt_list: {
    [key: string]: string;
  };
  raw_psbt_list_not_avail: {
    [key: string]: string;
  };
}

export interface IRetrieveOrderResp {
  raw_psbt: string;
  buyable: boolean;
  sell_verified: boolean;
  priceBTC: number;
  priceETH: string;
  orderID: string;
}

interface Vin {
  txid: string;
  vout: number;
}

interface Vout {
  scriptpubkey_address: string;
  value: string;
}

export interface Status {
  confirmed: boolean;
}

export interface IPendingUTXO {
  vin: Vin[];
  vout: Vout[];
  status: Status;
}

export type IThorAssetsType = 'BTC.BTC' | 'ETH.ETH';

export interface IEstimateThorSwapReq {
  sellAmount: string | number;
  receiver: string;
}

export interface IEstimateThorResp {
  expected_amount_out: string;
  expiry: number;
  fees: {
    affiliate: string;
    asset: IThorAssetsType;
    outbound: string;
  };
  inbound_address: string;
  memo: string;
  notes: string;
  outbound_delay_blocks: number;
  outbound_delay_seconds: number;
  router: string;
  slippage_bps: number;
  warning: string;
  error: string;
}

export type BINANCE_PAIR = 'ETHBTC';

export interface ITokenPriceResp {
  symbol: string;
  price: string;
}

export interface IReqGenAddressByETH {
  order_id?: string;
  fee_rate: number;
  order_list?: string[];
  receive_address: string;
  refund_address: string;
  is_estimate: boolean;
}

export interface IRespGenAddressByETH {
  order_id: string; //buy order id,
  eth_address: string;
  eth_amount: number;
  eth_amount_origin: string;
  eth_fee: string;
  expired_at: number;
  has_royalty: boolean;
}

export interface IReqSubmitTxs {
  [key: string]: string;
}

export interface IReqSubmitTxsParams {
  txs: IReqSubmitTxs;
}

export interface ITxHistoryBuyInsETH {
  id: string;
  order_id: string;
  inscription_id: string;
  amount_btc: number;
  amount_eth: string;
  user_id: string;
  receive_address: string;
  refund_address: string;
  expired_at: number;
  created_at: string;
  buy_tx: string;
  refund_tx: string;
  fee_rate: number;
  status: HistoryStatusType;
  statusColor: HistoryStatusColor;
  inscription_list: string[];
  order_list: string[];
}

export interface ITxHistoryPurchase {
  order_id: string;
  type: HistoryStatusType;
  timestamp: string;
  inscription_id: string;
  txhash: string;
  amount: string;
  status: HistoryStatusType;
  statusColor: HistoryStatusColor;
}

export interface IHistoryResp {
  txs: ITxHistory[];
  txsETH: ITxHistoryBuyInsETH[];
  txsPurchase: ITxHistoryPurchase[];
}
