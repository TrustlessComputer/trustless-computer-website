import ClientOnly from '@/components/Utils/ClientOnly';
import React from 'react';
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';
import { StyledAudioPreview } from './AudioPreview.styled';

interface IProps {
  url: string;
}

const AudioPreview: React.FC<IProps> = (props: IProps) => {
  const { url } = props;

  return (
    <ClientOnly>
      <StyledAudioPreview className={'audioPreview'}>
        <SpectrumVisualizer
          audio={url}
          theme={SpectrumVisualizerTheme.radialSquaredBars}
          iconsColor="#1c1c1c"
          backgroundColor="white"
          showMainActionIcon
          showLoaderIcon
          highFrequency={8000}
        />
      </StyledAudioPreview>
    </ClientOnly>
  );
};

export default AudioPreview;
