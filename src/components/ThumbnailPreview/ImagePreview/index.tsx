import { convertIpfsToHttp } from '@/utils/image';
import React, { useRef } from 'react';
import { StyledImagePreview } from './ImagePreview.styled';

interface IProps {
  url: string;
}

const ImagePreview: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const { url } = props;
  const imgRef = useRef<HTMLImageElement>(null);

  const handleOnImgLoaded = (evt: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = evt.target as HTMLImageElement;
    const naturalWidth = img.naturalWidth;
    if (naturalWidth < 100 && imgRef.current) {
      imgRef.current.style.imageRendering = 'pixelated';
    }
  };

  return (
    <StyledImagePreview className={'imagePreview'}>
      <img ref={imgRef} onLoad={handleOnImgLoaded} src={convertIpfsToHttp(url)} alt="thumbnail" className={'image'} />
    </StyledImagePreview>
  );
};

export default ImagePreview;
