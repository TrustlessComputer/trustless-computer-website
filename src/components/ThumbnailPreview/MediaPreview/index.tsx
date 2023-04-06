import { MediaType } from '@/enums/file';
import { getMediaTypeFromFileExt } from '@/utils/file';
// import Image from 'next/image';
import AudioPreview from '../AudioPreview';
import IFramePreview from '../IframePreview';
import ImagePreview from '../ImagePreview';
import PDFPreview from '../PDFPreview';
import TextPreview from '../TextPreview';
import VideoPreview from '../VideoPreview';

export type MediaPreviewProps = {
  previewExt: string;
  previewUrl: string;
};

const MediaPreview = (props: MediaPreviewProps) => {
  const { previewExt, previewUrl } = props;
  console.log('🚀 ~ MediaPreview ~ previewUrl:', previewUrl);
  console.log('🚀 ~ MediaPreview ~ previewExt:', previewExt);
  if (!previewExt) return null;

  const mediaType = getMediaTypeFromFileExt(previewExt);
  console.log('🚀 ~ MediaPreview ~ mediaType:', mediaType);

  switch (mediaType) {
    case MediaType.IMAGE:
      return <ImagePreview url={previewUrl} />;
    case MediaType.AUDIO:
      return <AudioPreview url={previewUrl} />;
    case MediaType.IFRAME:
      return <IFramePreview url={previewUrl} />;
    case MediaType.PDF:
      return <PDFPreview url={previewUrl} />;
    case MediaType.VIDEO:
      return <VideoPreview url={previewUrl} type={previewExt} />;
    case MediaType.TEXT:
      return <TextPreview url={previewUrl} type={previewExt} />;
    default:
      return <img src={previewUrl} alt="thumbnail"></img>;
  }
};

export default MediaPreview;
