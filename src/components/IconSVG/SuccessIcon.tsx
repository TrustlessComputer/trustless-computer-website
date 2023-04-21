import * as React from 'react';
import { SVGProps, memo } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={60} height={60} fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M54 30c0 13.255-10.745 24-24 24S6 43.255 6 30 16.745 6 30 6c3.766 0 7.328.867 10.5 2.413m9 6.587-21 21-6-6"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
