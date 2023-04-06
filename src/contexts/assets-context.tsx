import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import {
  ICollectedUTXOResp,
  ITxHistory,
  ITxHistoryBuyInsETH,
  ITxHistoryPurchase,
  IFeeRate,
} from '@/interfaces/api/bitcoin';
import { useAppSelector } from '@/state/hooks';
import { getUserSelector } from '@/state/user/selector';
import { getCollectedUTXO, getFeeRate, getPendingUTXOs, getTokenRate } from '@/services/bitcoin';
import { comingAmountBuilder, currentAssetsBuilder } from '@/utils/utxo';
import debounce from 'lodash/debounce';

export interface IAssetsContext {
  currentAssets: ICollectedUTXOResp | undefined;
  assets: ICollectedUTXOResp | undefined;
  isLoadingAssets: boolean;
  isLoadedAssets: boolean;
  history: ITxHistory[];
  txsETH: ITxHistoryBuyInsETH[];
  txsPurchase: ITxHistoryPurchase[];
  isLoadingHistory: boolean;
  isLoadedHistory: boolean;
  feeRate: IFeeRate | undefined;
  comingAmount: number;
  eth2btcRate: number;
  fetchAssets: () => void;
  debounceFetchData: () => void;
  fetchFeeRate: () => Promise<IFeeRate | undefined>;
  getAvailableAssetsCreateTx: () => Promise<ICollectedUTXOResp | undefined>;
}

const initialValue: IAssetsContext = {
  currentAssets: undefined,
  assets: undefined,
  isLoadingAssets: false,
  isLoadedAssets: false,
  history: [],
  txsETH: [],
  txsPurchase: [],
  isLoadingHistory: false,
  isLoadedHistory: false,
  feeRate: undefined,
  comingAmount: 0,
  eth2btcRate: 0,
  fetchAssets: () => new Promise<void>(r => r()),
  debounceFetchData: () => new Promise<void>(r => r()),
  fetchFeeRate: () => new Promise<IFeeRate | undefined>(() => null),
  getAvailableAssetsCreateTx: () => new Promise<ICollectedUTXOResp | undefined>(() => null),
};

export const AssetsContext = React.createContext<IAssetsContext>(initialValue);

export const AssetsProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const user = useAppSelector(getUserSelector);
  const currentAddress = React.useMemo(() => {
    return user?.walletAddressBtcTaproot || '';
  }, [user?.walletAddressBtcTaproot]);

  // UTXOs
  const [assets, setAssets] = useState<ICollectedUTXOResp | undefined>();
  const [currentAssets, setCurrentAssets] = useState<ICollectedUTXOResp | undefined>();
  const [isLoadingAssets, setIsLoadingAssets] = useState<boolean>(false);
  const [isLoadedAssets, setIsLoadedAssets] = useState<boolean>(false);

  // History
  const [history, setHistory] = useState<ITxHistory[]>([]);
  const [txsETH, setTxsETH] = useState<ITxHistoryBuyInsETH[]>([]);
  const [txsPurchase, setTxsPurchase] = useState<ITxHistoryPurchase[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [isLoadedHistory, setIsLoadedHistory] = useState<boolean>(false);

  // Fee rate
  const [feeRate, setFeeRate] = useState<IFeeRate | undefined>();
  const [comingAmount, setcomingAmount] = useState<number>(0);
  const [eth2btcRate, setEth2BtcRate] = useState<number>(0);

  const fetchAssets = async (): Promise<ICollectedUTXOResp | undefined> => {
    if (!currentAddress) return undefined;
    let _assets = undefined;
    try {
      setIsLoadingAssets(true);
      _assets = await getCollectedUTXO(currentAddress);
      setAssets(_assets);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingAssets(false);
      setIsLoadedAssets(true);
    }
    return _assets;
  };

  const fetchData = async () => {
    const [assets, pendingUTXOs] = await Promise.all([await fetchAssets(), await getPendingUTXOs(currentAddress)]);

    // Current assets
    let _currentAssets = undefined;
    if (assets) {
      _currentAssets = currentAssetsBuilder({
        current: assets,
        pending: pendingUTXOs,
      });
    }
    setCurrentAssets(_currentAssets);

    // Coming amount...
    const _comingAmount = comingAmountBuilder(currentAddress, pendingUTXOs);
    setcomingAmount(_comingAmount);
  };

  const debounceFetchData = React.useCallback(debounce(fetchData, 300), [currentAddress]);

  const fetchFeeRate = async () => {
    let _feeRate = {
      fastestFee: 15,
      halfHourFee: 10,
      hourFee: 5,
    };
    try {
      _feeRate = await getFeeRate();
      setFeeRate(_feeRate);
    } catch (error) {
      setFeeRate(_feeRate);
    }
    return _feeRate;
  };

  const getAvailableAssetsCreateTx = async () => {
    const [assets, pendingUTXOs] = await Promise.all([await fetchAssets(), await getPendingUTXOs(currentAddress)]);

    // Current assets
    let _currentAssets = undefined;
    if (assets) {
      _currentAssets = currentAssetsBuilder({
        current: assets,
        pending: pendingUTXOs,
      });
    }
    setCurrentAssets(_currentAssets);

    return _currentAssets;
  };

  const getETH2BTCRate = async () => {
    try {
      const rate = await getTokenRate();
      setEth2BtcRate(rate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentAddress) {
      debounceFetchData();
    } else {
      setHistory([]);
    }
  }, [currentAddress]);

  useEffect(() => {
    fetchFeeRate().then().catch();
    getETH2BTCRate().then().catch();
    const intervalID = setInterval(() => {
      fetchFeeRate().then().catch();
      getETH2BTCRate().then().catch();
    }, 60 * 2 * 1000); // 2 mins
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const contextValues = useMemo((): IAssetsContext => {
    return {
      currentAssets,
      assets,
      isLoadingAssets,
      isLoadedAssets,
      history,
      txsETH,
      txsPurchase,
      isLoadingHistory,
      isLoadedHistory,
      feeRate,
      comingAmount,
      debounceFetchData,
      eth2btcRate,
      fetchAssets,
      fetchFeeRate,
      getAvailableAssetsCreateTx,
    };
  }, [
    currentAssets,
    assets,
    isLoadingAssets,
    isLoadedAssets,
    history,
    txsETH,
    txsPurchase,
    isLoadingHistory,
    isLoadedHistory,
    feeRate,
    comingAmount,
    debounceFetchData,
    eth2btcRate,
    fetchAssets,
    fetchFeeRate,
    getAvailableAssetsCreateTx,
  ]);

  return <AssetsContext.Provider value={contextValues}>{children}</AssetsContext.Provider>;
};
