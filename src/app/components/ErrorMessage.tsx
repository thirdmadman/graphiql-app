import React from 'react';

export function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="absolute mx-auto left-0 right-0 w-fit text-xs text-red-600">
      {message}
    </p>
  );
}
