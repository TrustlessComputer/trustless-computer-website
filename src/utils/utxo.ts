import { ICollectedUTXOResp, IPendingUTXO } from '@/interfaces/api/bitcoin';
import BigNumber from 'bignumber.js';

const currentAssetsBuilder = ({
  current,
  pending,
}: {
  current: ICollectedUTXOResp | undefined;
  pending: IPendingUTXO[];
}): ICollectedUTXOResp | undefined => {
  if (!current) return current;
  const transformedCurrent = {
    ...current,
    txrefs: current.txrefs.map(utxo => {
      return {
        ...utxo,
        value: new BigNumber(utxo.value),
      };
    }),
  };

  if (!pending || !pending.length) return transformedCurrent;

  const utxos = current.txrefs
    .filter(({ tx_hash, tx_output_n }) => {
      const isExist = pending.some(item => item.vin.some(vin => vin.txid === tx_hash && vin.vout === tx_output_n));
      return !isExist;
    })
    .map(utxo => {
      return {
        ...utxo,
        value: new BigNumber(utxo.value),
      };
    });

  return {
    ...transformedCurrent,
    txrefs: utxos,
  };
};

const comingAmountBuilder = (address: string, pendingUTXOs: IPendingUTXO[]): number => {
  if (!pendingUTXOs || !pendingUTXOs.length || !address) {
    return 0;
  }

  let comingAmount = 0;
  pendingUTXOs.forEach(pending => {
    pending.vout.forEach(vout => {
      if (vout.scriptpubkey_address === address) {
        comingAmount += new BigNumber(vout.value || 0).toNumber();
      }
    });
  });
  return comingAmount;
};

export { currentAssetsBuilder, comingAmountBuilder };
