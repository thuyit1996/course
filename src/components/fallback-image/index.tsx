import React, { useState } from 'react';

type ImageWithHideProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageWithHide: React.FC<ImageWithHideProps> = ({ src, alt, ...props }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) return <img src='/images/not-found.png' className='w-10 h-10'/>;

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export default ImageWithHide;
