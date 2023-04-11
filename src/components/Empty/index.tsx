import icNoData from '@/assets/icons/ic-no-data.svg';
import { StyledEmpty } from './Empty.styled';
import { CDN_URL } from '@/configs';

export type TEmpty = {
  infoText?: string;
  isTable?: boolean;
};

const Empty = ({ infoText = '', isTable = false }: TEmpty) => {
  return (
    <StyledEmpty className={'notFound'} isTable={isTable}>
      <img
        width={95}
        height={95}
        src={`${CDN_URL}/icons/ic-empty.svg`}
        alt="Not found item"
        className={'notFound_image'}
      />
      <h5 className="content">{infoText}</h5>
    </StyledEmpty>
  );
};

export default Empty;
