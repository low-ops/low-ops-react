import { useState } from 'react';

function normalizeSrc(src?: string | null) {
  if (!src) return '/placeholder.svg';
  if (src.startsWith('/boards/') || src.startsWith('blob:') || src === '/placeholder.svg') {
    return src;
  }
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src;
  }
  return '/placeholder.svg';
}

type BoardCoverImageProps = {
  src?: string | null;
  alt: string;
};

function BoardCoverImageInner({ src, alt }: { src: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
      onError={() => {
        if (imageSrc !== '/placeholder.svg') {
          setImageSrc('/placeholder.svg');
        }
      }}
    />
  );
}

export function BoardCoverImage({ src, alt }: BoardCoverImageProps) {
  const normalized = normalizeSrc(src);
  return <BoardCoverImageInner key={normalized} src={normalized} alt={alt} />;
}
