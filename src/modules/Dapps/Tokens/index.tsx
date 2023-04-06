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

type Props = {};

const Tokens = (props: Props) => {
  const TABLE_HEADINGS = ['Token number', 'Name', 'Symbol', 'Supply', 'Creator'];

  const { data, error, isLoading } = useSWR(getApiKey(getTokens), getTokens);
  console.log('🚀 ~ Tokens ~ data:', data);

  // if (!error) return null;

  const tokenDatas =
    data &&
    data.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (token: any, index: number) => {
        const totalSupply = token?.totalSupply / decimalToExponential(token.decimal);

        return {
          id: `token-${token?.address}}`,
          render: {
            number: index + 1,
            name: token?.name || '-',
            symbol: token?.symbol || '-',
            supply: totalSupply.toLocaleString(),
            creator: shortenAddress(token?.owner, 4) || '-',
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
      <Table tableHead={TABLE_HEADINGS} data={tokenDatas} className={'token-table'} />
    </StyledTokens>
  );
};

export default Tokens;
