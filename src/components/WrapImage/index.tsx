import { convertIpfsToHttp } from '@/utils/image';
import React from 'react';

import Placeholder from './icons/placeholder.svg';

function WrapImage({ src, className, alt }: { src?: string; className: any; alt: any }) {
  return <img alt={alt} className={className} loading="lazy" src={src ? convertIpfsToHttp(src) : Placeholder} />;
}

export default React.memo(WrapImage);
