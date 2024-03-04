'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const darkModeImage = (
    <Image
      src="images/svg/icons/icon-dark-mode.svg"
      width="24"
      height="24"
      alt="light"
    />
  );

  const lightModeImage = (
    <Image
      src="/images/svg/icons/icon-light-mode.svg"
      width="24"
      height="24"
      alt="light"
    />
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>{darkModeImage}</div>;

  const isDark = theme === 'dark';

  return (
    <div>
      <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
        {isDark ? lightModeImage : darkModeImage}
      </button>
    </div>
  );
}
