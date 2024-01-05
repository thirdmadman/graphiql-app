'use client';

import { setQueryParam } from '@/lib/utils/setQueryParam';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useState } from 'react';

interface UrlInputProps {
  urlOverwrite?: string | undefined;
}

export function UrlInput({ urlOverwrite = '' }: UrlInputProps) {
  const [url, setUrl] = useState(urlOverwrite || '');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setNewUrl = (url: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    setQueryParam(current, 'url', url);

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex items-center w-full">
      <Input
        type="url"
        label="URL"
        labelPlacement={'outside'}
        placeholder="Enter url of graphql endpoint"
        className="mb-5 mr-5"
        value={url}
        onChange={(e) => setUrl(e.currentTarget.value)}
      />
      <Button color="primary" onClick={() => setNewUrl(url)}>
        Save
      </Button>
    </div>
  );
}
