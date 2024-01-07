import { StoreProvider } from '@/lib/redux/StoreProvider';
import { HeaderContent } from './HeaderContent';
import { getUser } from '@/lib/firebase/getUser';

export async function Header() {
  const userId = await getUser();

  return (
    <StoreProvider>
      <HeaderContent userId={userId} />
    </StoreProvider>
  );
}
