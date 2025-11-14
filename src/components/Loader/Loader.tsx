'use client';

import { useLoading } from '@/utils/providers/LoadingProvider/Provider';
import { RotatingLines } from 'react-loader-spinner';

export default function Loader() {
  const { isLoading } = useLoading();
  if (!isLoading) return null;

  return (
    <div className="bg-surface-90 fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <RotatingLines
        height="80"
        width="80"
        color="#ffffff"
        ariaLabel="Loading..."
        visible={isLoading}
      />
    </div>
  );
}
