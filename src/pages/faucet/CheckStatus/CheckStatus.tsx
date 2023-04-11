import Spinner from '@/components/Spinner';
import Table from '@/components/Table';
import { IFaucetStatusResp } from '@/interfaces/api/faucet';
import { requestGetFaucetStatus } from '@/services/faucet';
import { validateEVMAddress } from '@/utils';
import { formatTCPrice } from '@/utils/format';
import { formatDateTime } from '@/utils/time';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { PostStep, Styled, StyledTable } from './CheckStatus.styled';

interface IFormValue {
  address: string;
}

const CheckStatus = () => {
  const TABLE_HEADINGS = ['Transaction', 'Amount', 'Time', 'Status'];

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<IFaucetStatusResp[]>([]);

  const getFaucetStatus = async (address: string) => {
    try {
      setLoading(true);
      const data = await requestGetFaucetStatus(address);
      setStatus(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => {
    const validateForm = (values: IFormValue): Record<string, string> => {
      const errors: Record<string, string> = {};

      if (!values.address) {
        errors.address = 'Wallet address is required.';
      } else if (!validateEVMAddress(values.address)) {
        errors.address = 'Invalid wallet address.';
      }

      return errors;
    };

    const handleSubmit = async (values: IFormValue): Promise<void> => {
      getFaucetStatus(values.address);
    };

    return (
      <Formik
        key="step1"
        initialValues={{
          address: '',
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <PostStep>
              <div className="inputContainer">
                <input
                  id="address"
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className="input"
                  placeholder={`Enter wallet address`}
                />
              </div>
              <div className="postBtn">
                {loading ? (
                  <Spinner className="loading" />
                ) : (
                  <button type="submit">
                    <p className="text" style={{ paddingLeft: 28, paddingRight: 28 }}>
                      Check
                    </p>
                  </button>
                )}
              </div>
            </PostStep>
            {errors.address && touched.address && <p className="error">{errors.address}</p>}
          </form>
        )}
      </Formik>
    );
  };

  const tokenDatas =
    status &&
    status.length > 0 &&
    status.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (status: IFaucetStatusResp, index: number) => {
        return {
          id: `token-${status.id}}`,
          render: {
            tx: (
              <a href={status.tcTx} rel="rel=”noopener noreferrer”" target="_blank">
                {status.tcTx || '-'}
              </a>
            ),
            amount: formatTCPrice(status.amount),
            time: formatDateTime({ dateTime: new Date(status.createdAt).getTime() }),
            status: status.statusStr || '-',
          },
        };
      },
    );

  return (
    <Styled>
      <StyledTable>
        <p className="title">Check status</p>
        {renderStep1()}
        {tokenDatas && tokenDatas.length > 0 && (
          <Table tableHead={TABLE_HEADINGS} data={tokenDatas} className={'token-table'} />
        )}
      </StyledTable>
    </Styled>
  );
};

export default CheckStatus;
