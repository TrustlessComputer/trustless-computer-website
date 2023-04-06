import icNoData from '@/assets/icons/ic-no-data.svg';
import IconSVG from '../IconSVG';
import { StyledEmpty } from './Empty.styled';

export type TEmpty = {
  infoText: string;
  isTable?: boolean;
};

const Empty = ({ infoText, isTable = false }: TEmpty) => {
  return (
    <StyledEmpty className={'notFound'} isTable={isTable}>
      <img width={195} height={200} src={icNoData} alt="Not found item" className={'notFound_image'} />
      <h5 className="content">{infoText}</h5>
    </StyledEmpty>
  );
};

export default Empty;
