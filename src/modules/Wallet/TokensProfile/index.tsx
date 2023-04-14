import Empty from '@/components/Empty';
import Table from '@/components/Table';
import { TRUSTLESS_COMPUTER_CHAIN_INFO } from '@/constants/chains';
import { getTokensByWallet } from '@/services/token-explorer';
import { decimalToExponential } from '@/utils/format';
import { getApiKey } from '@/utils/swr';
import { useWeb3React } from '@web3-react/core';
import { Spinner } from 'react-bootstrap';
import useSWR from 'swr';
import { StyledTokenProfile } from './TokenProfile.styled';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import { useState } from 'react';
import TransferModal from './TransferModal';

const EXPLORER_URL = TRUSTLESS_COMPUTER_CHAIN_INFO.explorers[0].url;

const TokensProfile = () => {
  const user = useSelector(getUserSelector);
  const profileWallet = user?.walletAddress || '';
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const TABLE_HEADINGS = ['Token number', 'Name', 'Symbol', 'Supply', ''];
  const { data, isLoading } = useSWR(getApiKey(getTokensByWallet, { key: profileWallet }), () =>
    getTokensByWallet({ key: profileWallet }),
  );

  const hanldeOpenTransferModal = (selectedToken: any) => {
    setShowTransferModal(true);
    setSelectedToken(selectedToken);
  };

  const hanldeCloseTransferModal = () => {
    setShowTransferModal(false);
    setSelectedToken(null);
  };

  const tokenDatas =
    data &&
    data.length > 0 &&
    data.map((token: any, index: number) => {
      const totalSupply = token?.totalSupply / decimalToExponential(token.decimal);
      const linkTokenExplorer = `${EXPLORER_URL}/token/${token?.address}`;

      return {
        id: `token-${token?.address}}`,
        render: {
          number: index + 1,
          name: (
            <a href={linkTokenExplorer} rel="rel=”noopener noreferrer”" target="_blank">
              {token?.name || '-'}
            </a>
          ),

          symbol: token?.symbol || '-',
          supply: totalSupply.toLocaleString(),
          action: (
            <>
              {user?.walletAddress?.toLowerCase() === token.owner.toLowerCase() && (
                <div className="owner-actions">
                  <button onClick={() => hanldeOpenTransferModal(token)} className="transfer-button">
                    Transfer
                  </button>
                </div>
              )}
            </>
          ),
        },
      };
    });

  if (!data || data.length === 0 || !profileWallet) {
    return <Empty />;
  }

  return (
    <StyledTokenProfile>
      {isLoading ? (
        <div className="loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table tableHead={TABLE_HEADINGS} data={tokenDatas} className={'token-table'} />
      )}
      <TransferModal
        show={showTransferModal}
        handleClose={hanldeCloseTransferModal}
        erc20TokenAddress={selectedToken?.address}
      />
    </StyledTokenProfile>
  );
};

export default TokensProfile;
