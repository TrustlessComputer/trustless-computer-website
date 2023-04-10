import React from 'react';
import s from './styles.module.scss';

interface IProps {
  width?: number;
  height?: number;
  isLoaded?: boolean;
  fill?: boolean;
  className?: string;
}

const Skeleton: React.FC<IProps> = ({ width, height, isLoaded, fill = false, className }) => {
  if (isLoaded) return null;

  return (
    <div
      className={`${s.skeleton} ${className}`}
      style={fill ? { width: '100%', height: '100%' } : { width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default Skeleton;
