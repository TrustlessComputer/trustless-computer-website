import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { StyledTextPreview } from './TextPreview.styled';

interface IProps {
  url: string;
  type: string;
}

const TextPreview: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const { url } = props;
  const [content, setContent] = useState('');

  useAsyncEffect(async () => {
    const res = await fetch(url);
    const text = await res.text();
    setContent(text);
  }, [url]);

  return (
    <StyledTextPreview className={'textPreview'}>
      <pre className={'textWrapper'}>{content}</pre>
    </StyledTextPreview>
  );
};

export default TextPreview;
