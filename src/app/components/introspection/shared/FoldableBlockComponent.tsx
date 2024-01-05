'use client';

import { useState } from 'react';

interface IFoldableBlockComponentProps {
  title: JSX.Element | Array<JSX.Element> | string | undefined | null;
  inside?: JSX.Element | Array<JSX.Element> | string | undefined | null;
  isOpenedSet?: boolean;
}

export function FoldableBlockComponent({
  title,
  inside,
  isOpenedSet = false,
}: IFoldableBlockComponentProps) {
  const [isOpened, setIsOpened] = useState(isOpenedSet);

  if (!title) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-800 relative">
      <div className="absolute -left-2 top-1.5 w-3 h-3 bg-black text-white leading-3 text-center font-mono dark:bg-white dark:text-black">
        {isOpened ? '-' : '+'}
      </div>
      <div
        className="mb-2 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        {title}
      </div>

      {inside !== undefined && inside !== null && (
        <div className={isOpened ? '' : 'hidden'}>{inside}</div>
      )}
    </div>
  );
}
