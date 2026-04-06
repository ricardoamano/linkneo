'use client';

import { useState } from 'react';

export default function Logo({ width = 130, height = 44 }: { width?: number; height?: number }) {
  const [error, setError] = useState(false);

  if (error) {
    return <span className="text-white font-bold text-xl tracking-tight">Neostore</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Neostore"
      width={width}
      height={height}
      style={{ objectFit: 'contain', maxHeight: height }}
      onError={() => setError(true)}
    />
  );
}
