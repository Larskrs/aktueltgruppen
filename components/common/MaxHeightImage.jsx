import { useState, useEffect } from 'react';

const MaxHeightImage = ({ src, alt, maxHeight }) => {
  const [width, setWidth] = useState('100%');

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const maxWidth = maxHeight * aspectRatio;
      setWidth(maxWidth > img.width ? '100%' : `${maxWidth}px`);
    };
  }, [src, maxHeight]);

  return (
    <div style={{ maxHeight: `${maxHeight}px`, overflow: 'hidden' }}>
      <img src={src} alt={alt} style={{ width, height: 'auto' }} />
    </div>
  );
};

export default MaxHeightImage;
