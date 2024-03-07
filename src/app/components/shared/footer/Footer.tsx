import { StoreProvider } from '@/lib/redux/StoreProvider';
import { FooterContent } from './FooterContent';

export function Footer() {
  return (
    <StoreProvider>
      <FooterContent />
    </StoreProvider>
  );
}
