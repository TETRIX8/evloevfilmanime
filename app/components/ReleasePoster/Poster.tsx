"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export const Poster = ({
  image,
  alt = "",
  className = "",
}: {
  image: string;
  alt?: string;
  className?: string;
}) => {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [image]);
  return image && !failed ? (
    <Image
      className={`object-cover ${className}`}
      src={image}
      alt={alt}
      width={285}
      height={428}
      sizes="(max-width: 700px) 45vw, (max-width: 1200px) 24vw, 220px"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : (
    <div className={`ef-poster-fallback ${className}`}>
      <span className="iconify mdi--image-outline" aria-hidden="true" />
      <span>Постер недоступен</span>
    </div>
  );
};
