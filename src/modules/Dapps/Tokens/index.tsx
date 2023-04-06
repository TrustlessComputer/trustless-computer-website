import { getTokens } from '@/services/token-explorer';
import { getApiKey } from '@/utils/swr';
import useSWR from 'swr';
import { StyledTokens } from './Tokens.styled';
import { UploadFileContainer } from '../Dapps.styled';
import Text from '@/components/Text';
import Button from '@/components/Button';
import IcBitcoinCloud from '@/assets/icons/ic-bitcoin-cloud.svg';
import Table from '@/components/Table';
import { shortenAddress } from '@/utils';
import { decimalToExponential, exponentialToDecimal, formatCurrency } from '@/utils/format';
import { log } from 'console';
import { TRUSTLESS_COMPUTER_CHAIN_INFO } from '@/constants/chains';
import Spinner from '@/components/Spinner';

type Props = {};

const EXPLORER_URL = TRUSTLESS_COMPUTER_CHAIN_INFO.explorers[0].url;

const Tokens = (props: Props) => {
  const TABLE_HEADINGS = ['Token number', 'Name', 'Symbol', 'Supply', 'Creator'];

  const { data, error, isLoading } = useSWR(getApiKey(getTokens), getTokens);

  const tokenDatas =
    data &&
    data.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (token: any, index: number) => {
        const totalSupply = token?.totalSupply / decimalToExponential(token.decimal);
        const linkTokenExplorer = `${EXPLORER_URL}/token/${token?.address}`;
        const linkToOwnerExplorer = `${EXPLORER_URL}/address/${token?.owner}`;

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
            creator: (
              <a href={linkToOwnerExplorer} rel="rel=”noopener noreferrer”" target="_blank">
                {shortenAddress(token?.owner, 4) || '-'}
              </a>
            ),
          },
        };
      },
    );

  return (
    <StyledTokens>
      <UploadFileContainer>
        <div className="upload_left">
          <img src={IcBitcoinCloud} alt="upload file icon" />
          <div className="upload_content">
            <h3 className="upload_title">BRC-20 on Bitcoin</h3>
            <Text size="regular" maxWidth="65%">
              BRC-20 is the standard for fungible tokens on Bitcoin. You can use it to represent virtually anything on
              Bitcoin: a cryptocurrency, a share in a company, voting rights in a DAO, an ounce of gold, and more.
            </Text>
          </div>
        </div>
        <div className="upload_right">
          <Button bg={'white'}>
            <Text size="medium" color="bg1" className="button-text" fontWeight="medium">
              Create BRC-20
            </Text>
          </Button>
        </div>
      </UploadFileContainer>
      {isLoading ? (
        <div className="loading">
          <Spinner />
        </div>
      ) : (
        <Table tableHead={TABLE_HEADINGS} data={tokenDatas} className={'token-table'} />
      )}
    </StyledTokens>
  );
};

export default Tokens;
