import { CDN_URL } from '@/configs';
import { StyledEmpty } from './Empty.styled';
import SvgInset from '../SVGIcon';

export type TEmpty = {
  infoText?: string;
  isTable?: boolean;
};

const Empty = ({ infoText = '', isTable = false }: TEmpty) => {
  return (
    <StyledEmpty className={'notFound'} isTable={isTable}>
      {/* <img
        width={95}
        height={95}
        src={`${CDN_URL}/icons/ic-empty.svg`}
        alt="Not found item"
        className={'notFound_image'}
      /> */}
      <SvgInset svgUrl={`${CDN_URL}/icons/ic-empty.svg`} size={95} />
      <h5 className="content">{infoText}</h5>
    </StyledEmpty>
  );
};

export default Empty;
