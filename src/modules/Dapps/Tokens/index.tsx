import IcBitcoinCloud from '@/assets/icons/ic-bitcoin-cloud.svg';
import Button from '@/components/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from '@/components/Table';
import Text from '@/components/Text';
import { TRUSTLESS_COMPUTER_CHAIN_INFO } from '@/constants/chains';
import { getTokens } from '@/services/token-explorer';
import { shortenAddress } from '@/utils';
import { decimalToExponential } from '@/utils/format';
import { getApiKey } from '@/utils/swr';
import { useState } from 'react';
import useSWR from 'swr';
import { UploadFileContainer } from '../Dapps.styled';
import ModalCreateToken from './ModalCreateToken';
import { StyledTokens } from './Tokens.styled';

const EXPLORER_URL = TRUSTLESS_COMPUTER_CHAIN_INFO.explorers[0].url;

const Tokens = () => {
  const TABLE_HEADINGS = ['Token number', 'Name', 'Symbol', 'Supply', 'Creator'];

  const [showModal, setShowModal] = useState(false);
  const { data, error, isLoading } = useSWR(getApiKey(getTokens), getTokens);

  const tokenDatas =
    data &&
    data.length > 0 &&
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
          {/* <img src={IcBitcoinCloud} alt="upload file icon" /> */}
          <div className="upload_content">
            <h3 className="upload_title">BRC-20 on Bitcoin</h3>
            <Text size="medium" maxWidth="90%">
              BRC-20 is the standard for fungible tokens on Bitcoin. You can use it to represent virtually anything on
              Bitcoin: a cryptocurrency, a share in a company, voting rights in a DAO, an ounce of gold, and more.
            </Text>
          </div>
        </div>
        <div className="upload_right">
          <Button
            bg={'white'}
            // onClick={() => window.open('https://docs.trustless.computer/bitcoin-dapp-examples/brc-20-tokens')}
            onClick={() => setShowModal(true)}
          >
            <Text size="medium" color="bg1" className="button-text" fontWeight="medium">
              Create BRC-20
            </Text>
          </Button>
        </div>
      </UploadFileContainer>
      {isLoading ? (
        <div className="loading">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table tableHead={TABLE_HEADINGS} data={tokenDatas} className={'token-table'} />
      )}
      <ModalCreateToken show={showModal} handleClose={() => setShowModal(false)} />
    </StyledTokens>
  );
};

export default Tokens;
