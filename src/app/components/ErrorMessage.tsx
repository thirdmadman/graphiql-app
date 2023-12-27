import React from 'react';

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center">
      <p className="absolute text-xs text-red-600 pt-5">{message}</p>
    </div>
  );
}
