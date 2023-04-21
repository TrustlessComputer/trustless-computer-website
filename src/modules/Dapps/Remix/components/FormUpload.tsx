// import { WrapInput } from '@/pages/collection/ModalEdit/ModalMint.styled';
import Button from '@/components/Button';
import { IDeployContractParams, useDeployContract } from '@/hooks/contract-operations/remix';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { DeployContractResponse } from '@/interfaces/contract-operation';
import px2rem from '@/utils/px2rem';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import styled, { DefaultTheme } from 'styled-components';
import ModalDeployStatus from './ModalUploadStatus';

// import { useFormikContext } from 'formik';

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const SubmitButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: ${px2rem(4)} ${px2rem(12)};
  color: #1c1c1c;
  font-size: ${px2rem(14)};
  line-height: ${px2rem(24)};
  font-weight: 400;
  background: linear-gradient(90deg, #ff8008 0%, #ffc837 100%);

  :disabled {
    opacity: 0.8;
  }
`;

const WrapInputContainer = styled.div`
  justify-content: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-bottom: ${px2rem(16)};

  .title-input {
    font-weight: 500;
    font-size: ${px2rem(12)};
    line-height: ${px2rem(20)};
    text-transform: uppercase;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.primary['5b']};
    margin-bottom: ${px2rem(4)};
  }

  .textarea {
    padding: 2px;
    resize: none;
    min-height: 60px;
    max-height: 600px;
    border-radius: 4px;
    overflow-y: scroll;
    display: flex;
    padding: ${px2rem(12)};
    gap: ${px2rem(16)};
    font-weight: 400;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(26)};
    background-color: transparent;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border3};
    ::placeholder {
      /* ... */
      color: #a5a5a5;
    }
    :hover {
      /* border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.primary.brand}; */
      opacity: 0.8;
    }
  }

  .input {
    border-radius: 4px;
    display: flex;
    padding: ${px2rem(12)};
    gap: ${px2rem(16)};
    font-weight: 400;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(26)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.border3};
    ::placeholder {
      /* ... */
      color: #a5a5a5;
    }

    :hover {
      /* border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.primary.brand}; */
      opacity: 0.8;
    }
  }

  .error {
    margin-top: 5px;
    font-weight: 400;
    font-size: ${px2rem(14)};
    line-height: ${px2rem(24)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text6};
  }
`;

const Container = styled.div`
  padding: 32px;
  gap: 40px;

  background: #17171a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  margin-left: 10%;
  margin-right: 10%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  justify-items: center;

  .label {
    font-size: ${px2rem(16)};
    font-weight: 500;
    margin-bottom: ${px2rem(6)};
    color: ${({ theme }) => theme.primary['light']};
  }

  .space {
    height: 40px;
  }
`;

type IFormValue = {
  ABI: string;
  bytecode: string;
  args: string;
};

type FormUploadProp = {
  submitCallback?: (data?: IFormValue) => void;
};

const FormUpload = (props: FormUploadProp) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const textAreaRef = useRef<any>(undefined);

  const [modalStatusShow, setModalStatusShow] = useState(false);
  const [data, setData] = useState<IFormValue>({
    ABI: '',
    args: '',
    bytecode: '',
  });

  const { submitCallback = () => {} } = props;
  // eslint-disable-next-line no-undef
  const { run } = useContractOperation<IDeployContractParams, DeployContractResponse | null>({
    operation: useDeployContract,
  });
  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};
    let ABI = values.ABI;
    let bytecode = values.bytecode;
    // let args = values.args ;

    /* ABI */
    if (!ABI) {
      errors.ABI = 'ABI is Required.';
    } else {
      if (!isJsonString(ABI)) {
        errors.ABI = 'ABI  must be a JSON string.';
      } else {
        let parseAPI = JSON.parse(ABI);
        if (parseAPI instanceof Array) {
          // TO DO
        } else {
          errors.ABI = 'ABI must be Array.';
        }
      }
    }

    /* ByteCode */
    if (!bytecode) {
      errors.bytecode = 'Bytecode is Required.';
    } else {
      if (typeof bytecode !== 'string') {
        errors.bytecode = 'Bytecode must be string.';
      } else {
        // TO DO
      }
    }

    /* Args */
    // if (!args) {
    //   errors.args = 'Args is required.';
    //   if (!isJsonString(args)) {
    //     errors.args = 'Args  must be a JSON string.';
    //   } else {
    //     // TO DO
    //   }
    // }

    return errors;
  };

  const clearData = () => {
    setData({
      ABI: '',
      args: '',
      bytecode: '',
    });
  };

  const handleSubmit = async (values: IFormValue): Promise<void> => {
    try {
      setIsProcessing(true);

      console.log('values ', values);
      const ABI = JSON.parse(values.ABI) || [];
      const bytecode = values.bytecode;
      const args = JSON.parse('[' + values.args + ']') || [];
      // const args = [];

      // console.log(' ==== ', {
      //   ABI,
      //   bytecode,
      //   args,
      // });

      await run({
        abi: ABI,
        bytecode: bytecode,
        args: args,
      });
      // CALL API SUBMIT (TO DO )
      setModalStatusShow(true);
    } catch (err) {
      toast.error((err as Error).message);
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const resizeTextArea = () => {
    if (textAreaRef) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <Container>
      <Formik key="RemixForm" initialValues={data} validate={validateForm} onSubmit={handleSubmit} onReset={clearData}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <WrapInputContainer>
              {/* ABI Here */}
              <label htmlFor="ABI" className="label">
                ABI
              </label>
              <textarea
                ref={textAreaRef}
                id="ABI"
                name="ABI"
                onChange={e => {
                  resizeTextArea();
                  handleChange(e);
                }}
                onBlur={handleBlur}
                value={values.ABI}
                className="textarea"
                placeholder={`Paste ABI here`}
              />
              {errors.ABI && touched.ABI && <p className="error">{errors.ABI}</p>}
              <div className="space"></div>
              {/* ByteCode Here */}
              <label htmlFor="bytecode" className="label">
                ByteCode
              </label>
              <input
                id="bytecode"
                type="text"
                name="bytecode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bytecode}
                className="input"
                placeholder={`Paste Bytecode here`}
              />
              {errors.bytecode && touched.bytecode && <p className="error">{errors.bytecode}</p>}
              <div className="space"></div>
              {/* Args Here */}
              <label htmlFor="args" className="label">
                Args
              </label>
              <input
                id="args"
                type="text"
                name="args"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.args}
                className="input"
                placeholder={`Enter arguments separated by commas (optional)`}
              />
              {errors.args && touched.args && <p className="error">{errors.args}</p>}
            </WrapInputContainer>

            <div className="space"></div>

            <SubmitButton disabled={isProcessing} type="submit">
              {isProcessing ? 'Processing...' : 'Deploy'}
            </SubmitButton>
          </form>
        )}
      </Formik>
      {
        <ModalDeployStatus
          show={modalStatusShow}
          handleClose={() => {
            clearData();
            setModalStatusShow(false);
          }}
        />
      }
    </Container>
  );
};

export default FormUpload;
