'use client';

import { TLocale } from './locale';
import { useLocale } from './useLocale';

interface ILocaleByNameExtractorProps {
  localeName: keyof TLocale;
}

export function LocaleByNameExtractor({
  localeName,
}: ILocaleByNameExtractorProps) {
  const locale = useLocale();
  return locale[localeName];
}
