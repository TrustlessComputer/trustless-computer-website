import { TC_NETWORK_RPC } from '@/configs';
import { ConnectionType, getConnection } from '@/connection';
import { AssetsContext } from '@/contexts/assets-context';
import { getUserSelector } from '@/state/user/selector';
import { generateBitcoinTaprootKey } from '@/utils/derive-key';
import { useWeb3React } from '@web3-react/core';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import * as TC_SDK from 'trustless-computer-sdk';
import BigNumber from 'bignumber.js';
import { Buffer } from 'buffer';

export interface ISendInsProps {
  receiverAddress: string;
  feeRate: number;
  inscriptionNumber: number;
}

export interface ISendBTCProps {
  receiverAddress: string;
  feeRate: number;
  amount: number;
}

export interface ISignKeyResp {
  privateKey: Buffer;
  tpAddress: string;
  evmAddress: string;
}

export interface ICreateInscribeParams {
  tcTxIDs: Array<string>;
  feeRatePerByte: number;
}
export interface ICreateBatchInscribeParams {
  tcTxDetails: any;
  feeRatePerByte: number;
}

export interface ICreateInscribeResponse {
  commitTxHex: string;
  commitTxID: string;
  revealTxHex: string;
  revealTxID: string;
  totalFee: BigNumber;
}

const useBitcoin = () => {
  const user = useSelector(getUserSelector);
  const tcClient = new TC_SDK.TcClient(TC_SDK.Mainnet, TC_NETWORK_RPC);
  const { getAvailableAssetsCreateTx } = useContext(AssetsContext);
  const { account: evmAddress, connector } = useWeb3React();

  const signKey = async (): Promise<ISignKeyResp> => {
    const connection = getConnection(connector);
    if (connection?.type === ConnectionType.METAMASK) {
      const error = 'Can not sign with metamask';
      const tpAddress = user?.walletAddressBtcTaproot;
      if (!evmAddress || !tpAddress) throw new Error(error);
      const { taprootChild } = await generateBitcoinTaprootKey(evmAddress);
      const privateKey = taprootChild.privateKey;
      if (!privateKey) throw new Error(error);
      return {
        privateKey,
        tpAddress,
        evmAddress,
      };
    }

    return {
      privateKey: Buffer.from(''),
      tpAddress: '',
      evmAddress: '',
    };
  };

  const createInscribeTx = async ({ tcTxIDs, feeRatePerByte }: ICreateInscribeParams) => {
    const assets = await getAvailableAssetsCreateTx();
    if (!assets) throw new Error('Can not load assets');
    const { privateKey } = await signKey();

    console.log('inside createInscribeTx', {
      senderPrivateKey: privateKey,
      utxos: assets.txrefs,
      inscriptions: {},
      tcTxIDs,
      feeRatePerByte,
      tcClient,
    });

    const { commitTxHex, commitTxID, revealTxHex, revealTxID } = await TC_SDK.createInscribeTx({
      senderPrivateKey: privateKey,
      utxos: assets.txrefs,
      inscriptions: {},
      tcTxIDs,
      feeRatePerByte,
      tcClient,
    });

    console.log('commitTxID', commitTxID);
    console.log('commitTxHex', commitTxHex);
    console.log('revealTxID', revealTxID);
    console.log('revealTxHex', revealTxHex);

    return { commitTxHex, commitTxID, revealTxHex, revealTxID };
  };

  const createBatchInscribeTxs = async ({ tcTxDetails, feeRatePerByte }: ICreateBatchInscribeParams) => {
    const assets = await getAvailableAssetsCreateTx();
    if (!assets) throw new Error('Can not load assets');
    const { privateKey } = await signKey();

    console.log('inside createBatchInscribeTxs', {
      senderPrivateKey: privateKey,
      utxos: assets.txrefs,
      inscriptions: {},
      tcTxDetails,
      feeRatePerByte,
      tcClient,
    });

    // tcTxIDs: string[];
    // commitTxHex: string;
    // commitTxID: string;
    // revealTxHex: string;
    // revealTxID: string;
    // totalFee: BigNumber;

    const res = await TC_SDK.createBatchInscribeTxs({
      senderPrivateKey: privateKey,
      utxos: assets.txrefs,
      inscriptions: {},
      tcTxDetails,
      feeRatePerByte,
      tcClient,
    });

    // console.log('commitTxID', commitTxID);
    // console.log('commitTxHex', commitTxHex);
    // console.log('revealTxID', revealTxID);
    // console.log('revealTxHex', revealTxHex);

    return res;
  };

  const getNonceInscribeable = async (
    tcAddress: string,
  ): Promise<{
    nonce: number;
    gasPrice: number;
  }> => {
    if (!tcAddress) throw Error('Address not found');
    const { nonce, gasPrice } = await tcClient.getNonceInscribeable(tcAddress);
    return { nonce, gasPrice };
  };

  const getUnInscribedTransactionByAddress = async (tcAddress: string): Promise<Array<string>> => {
    if (!tcAddress) throw Error('Address not found');
    const { unInscribedTxIDs } = await tcClient.getUnInscribedTransactionByAddress(tcAddress);
    return unInscribedTxIDs;
  };

  const getUnInscribedTransactionDetailByAddress = async (tcAddress: string): Promise<TC_SDK.TCTxDetail[]> => {
    if (!tcAddress) throw Error('Address not found');
    console.log('🚀 ~ getUnInscribedTransactionDetailByAddress ~ tcAddress:', tcAddress);
    const { unInscribedTxDetails } = await tcClient.getUnInscribedTransactionDetailByAddress(tcAddress);
    console.log('🚀 ~ getUnInscribedTransactionDetailByAddress ~ unInscribedTxDetails:', unInscribedTxDetails);
    return unInscribedTxDetails;
  };

  return {
    createInscribeTx,
    createBatchInscribeTxs,
    signKey,
    getNonceInscribeable,
    getUnInscribedTransactionByAddress,
    getUnInscribedTransactionDetailByAddress,
  };
};

export default useBitcoin;
