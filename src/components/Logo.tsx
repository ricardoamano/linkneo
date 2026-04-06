'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Logo({ width = 130, height = 44 }: { width?: number; height?: number }) {
  const [error, setError] = useState(false);

  if (error) {
    return <span className="text-white font-bold text-xl tracking-tight">Neostore</span>;
  }

  return (
    <Image
      src="/logo.png"
      alt="Neostore"
      width={width}
      height={height}
      className="object-contain"
      onError={() => setError(true)}
    />
  );
}
