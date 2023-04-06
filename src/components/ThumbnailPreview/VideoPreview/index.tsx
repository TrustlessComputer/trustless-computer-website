import React from 'react';
import { StyledVideoPreview } from './VideoPreview.styled';

interface IProps {
  url: string;
  type: string;
}

const VideoPreview: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const { url } = props;

  return (
    <StyledVideoPreview className={'videoPreview'}>
      <video autoPlay loop muted playsInline preload="auto">
        <source src={url} />
      </video>
    </StyledVideoPreview>
  );
};

export default VideoPreview;
