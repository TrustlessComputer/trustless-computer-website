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

const EXPLORER_URL = TRUSTLESS_COMPUTER_CHAIN_INFO.explorers[0].url;

const TokensProfile = () => {
  const { account } = useWeb3React();

  const profileWallet = account || '';

  const TABLE_HEADINGS = ['Token number', 'Name', 'Symbol', 'Supply', ''];

  const { data, error, isLoading } = useSWR(getApiKey(getTokensByWallet, { key: profileWallet }), () =>
    getTokensByWallet({ key: profileWallet }),
  );

  const tokenDatas =
    data &&
    data.length > 0 &&
    data.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (token: any, index: number) => {
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
          },
        };
      },
    );

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
    </StyledTokenProfile>
  );
};

export default TokensProfile;
