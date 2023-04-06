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
  tcTxID: string;
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

  const createInscribeTx = async ({ tcTxID, feeRatePerByte }: ICreateInscribeParams) => {
    // const assets = await getAvailableAssetsCreateTx();
    // if (!assets) throw new Error('Can not load assets');
    const { privateKey } = await signKey();
    const { commitTxHex, commitTxID, revealTxHex, revealTxID } = await TC_SDK.createInscribeTx({
      senderPrivateKey: privateKey,
      // utxos: assets.txrefs,
      // inscriptions: assets.inscriptions_by_outputs,
      inscriptions: {},
      utxos: [
        {
          tx_hash: '57f538e2a4d4ebdbb0bc0edddc2523f1b656c2c24b2cc030d67f5d9c9a96bbff',
          tx_output_n: 0,
          value: new BigNumber(80000),
        },
      ],
      tcTxID,
      feeRatePerByte,
      tcClient,
    });

    console.log('commitTxID', commitTxID);
    console.log('commitTxHex', commitTxHex);
    console.log('revealTxID', revealTxID);
    console.log('revealTxHex', revealTxHex);

    return { commitTxHex, commitTxID, revealTxHex, revealTxID };
  };

  const getNonceInscribeable = async (address: string) => {
    if (!address) throw Error('Address not found');
    const { nonce, gasPrice } = await tcClient.getNonceInscribeable(address);
    return { nonce, gasPrice };
  };

  return {
    createInscribeTx,
    signKey,
    getNonceInscribeable,
  };
};

export default useBitcoin;
