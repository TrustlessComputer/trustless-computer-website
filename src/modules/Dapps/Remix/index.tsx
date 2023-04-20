import Text from '@/components/Text';
import { FormContainer, NamesContainer } from './styled';
import DragDropFile from './DragDropFile';

const Remix = () => {
  return (
    <>
      <NamesContainer>
        <div className="upload_left">
          {/* <img src={IcImgName} alt="upload file icon" /> */}
          <div className="upload_content">
            <h3 className="upload_title">Remix</h3>
            <Text size="medium" maxWidth="100%">
              Easily deploy your contract on Trustless Computer by uploading the sol file here. There are no additional
              technical requirements.
            </Text>
          </div>
        </div>
      </NamesContainer>
      <FormContainer>
        <DragDropFile />
      </FormContainer>
    </>
  );
};

export default Remix;
