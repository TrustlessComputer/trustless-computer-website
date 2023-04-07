import { useState } from 'react';
import Text from '@/components/Text';
import Button from '@/components/Button';
import NamesList from './NamesList';
import { NamesContainer, FormContainer } from './Names.styled';
import IcImgName from '@/assets/icons/ic-img-names.svg';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useIsRegistered, { ICheckIfRegisteredNameParams } from '@/hooks/contract-operations/bns/useIsRegistered';
import useRegister, { IRegisterNameParams } from '@/hooks/contract-operations/bns/useRegister';
import { Transaction } from 'ethers';

const Names: React.FC = () => {
  const [nameValidate, setNameValidate] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { run: checkNameIsRegistered } = useContractOperation<ICheckIfRegisteredNameParams, Promise<boolean>>({
    operation: useIsRegistered,
    inscribeable: false,
  });
  const { run: registerName } = useContractOperation<IRegisterNameParams, Promise<Transaction | null>>({
    operation: useRegister,
    inscribeable: false,
  });

  const handleValidate = (name: string) => {
    if (name) {
      setNameValidate(true);
    }
  };
  const handleRegistered = async () => {
    console.log(valueInput);

    // Check if name has been registered
    const isRegistered = await checkNameIsRegistered({
      name: valueInput,
    });
    // If name has already been taken
    if (isRegistered) {
      setError(`${valueInput} has already been taken. Please choose another one.`);
      return;
    }

    // Call contract
    try {
      await registerName({
        name: valueInput,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <NamesContainer>
        <div className="upload_left">
          <img src={IcImgName} alt="upload file icon" />
          <div className="upload_content">
            <h3 className="upload_title">Bitcoin Name System</h3>
            <Text size="regular">
              BNS is the standard for naming on Bitcoin. No more copying and pasting long addresses. Use your BNS name
              to receive any token and NFT.
            </Text>
          </div>
        </div>
      </NamesContainer>
      {/* <FormContainer>
        <div className="block_search">
          <div className="form">
            <div className="input">
              <input
                type="text"
                placeholder="Enter name, address"
                value={valueInput}
                onChange={e => {
                  setValueInput(e.target.value || '');
                  handleValidate(e.target.value);
                }}
              />
            </div>
            <div className="btn">
              <Button bg={'white'} disabled={!nameValidate} onClick={handleRegistered}>
                <Text size="medium" color="bg1" className="button-text" fontWeight="medium">
                  Register
                </Text>
              </Button>
            </div>
          </div>
        </div>
      </FormContainer> */}
      <NamesList />
    </>
  );
};

export default Names;
