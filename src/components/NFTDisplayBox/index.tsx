/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useRef, useState } from 'react';

import { IMAGE_TYPE } from './constant';
interface IProps {
  contentClass?: string;
  type?: IMAGE_TYPE;
  collectionID?: string;
  tokenID?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
}

const NFTDisplayBox = ({
  contentClass,
  type,
  collectionID,
  tokenID,
  autoPlay = false,
  loop = false,
  controls = false,
}: IProps) => {
  const [HTMLContentRender, setHTMLContentRender] = useState<JSX.Element>();
  const imgRef = useRef<HTMLImageElement>(null);

  // const getURLContent = () => rpcClient.getURLContent(collectionID || '', tokenID || '');

  const renderIframe = (content: string) => {
    return (
      <iframe
        className={contentClass}
        loading="lazy"
        sandbox="allow-scripts allow-pointer-lock allow-downloads"
        scrolling="no"
        src={content}
      />
    );
  };

  const renderAudio = (content: string) => {
    return <audio autoPlay={autoPlay} className={contentClass} controls={controls} loop={loop} src={content} />;
  };

  const renderVideo = (content: string) => {
    return <video autoPlay={autoPlay} className={contentClass} controls={controls} loop={loop} src={content} />;
  };

  const handleOnImgLoaded = (evt: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = evt.target as HTMLImageElement;
    const naturalWidth = img.naturalWidth;
    if (naturalWidth < 100 && imgRef.current) {
      imgRef.current.style.imageRendering = 'pixelated';
    }
  };

  const renderImage = (content: string) => {
    return (
      <img
        ref={imgRef}
        alt={tokenID}
        className={contentClass}
        loading="lazy"
        src={content}
        style={{ objectFit: 'contain' }}
        onLoad={handleOnImgLoaded}
      />
    );
  };

  const renderEmpty = () => <img alt={tokenID} className={contentClass} loading={'lazy'} src={''} />;

  useEffect(() => {
    if (collectionID && tokenID) {
      // const content = getURLContent();
      const content = '';
      switch (type) {
        case 'audio/mpeg':
        case 'audio/wav':
          setHTMLContentRender(renderAudio(content));
          return;
        case 'video/mp4':
        case 'video/webm':
          setHTMLContentRender(renderVideo(content));
          return;
        case 'image/apng':
        case 'image/avif':
        case 'image/gif':
        case 'image/jpeg':
        case 'image/png':
        case 'image/svg':
        case 'image/svg+xml':
        case 'image/webp':
          setHTMLContentRender(renderImage(content));
          return;
        case 'application/json':
        case 'application/pgp-signature':
        case 'application/yaml':
        case 'audio/flac':
        case 'application/pdf':
        case 'text/plain;charset=utf-8':
          setHTMLContentRender(renderIframe(content));
          return;
        default:
          setHTMLContentRender(renderIframe(content));
          return;
      }
    }
  }, [collectionID, tokenID]);

  return HTMLContentRender ? HTMLContentRender : renderEmpty();
};

export default React.memo(NFTDisplayBox);
