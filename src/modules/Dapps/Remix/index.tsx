import Text from '@/components/Text';
import { FormContainer, NamesContainer } from './styled';
import FormUpload from './components/FormUpload';

const Remix = () => {
  return (
    <>
      <NamesContainer>
        <div className="upload_left">
          {/* <img src={IcImgName} alt="upload file icon" /> */}
          <div className="upload_content">
            <h3 className="upload_title">Deploy Contract</h3>
            {/* <div className="space"></div>
            <Text size="medium" maxWidth="100%">
              Develop, debug, and test your contract on Remix Online IDE{' '}
              <a href={'https://remix.ethereum.org/'} target="_blank">
                (https://remix.ethereum.org/)
              </a>{' '}
              .When finished, copy and paste the ABI, Bytecode, and Arguments into the fields below to deploy the
              contract on Trustless Computer.
            </Text>
            <div className="space"></div>
            <Text size="medium" maxWidth="100%">
              Learn more about Remix here.{' '}
              <a href={'https://explorer.trustless.computer'} target="_blank">
                (https://remix-ide.readthedocs.io/en/latest/)
              </a>
            </Text> */}
          </div>
        </div>
      </NamesContainer>
      <FormContainer>
        {/* <DragDropFile /> */}
        <FormUpload />
      </FormContainer>
    </>
  );
};

export default Remix;
