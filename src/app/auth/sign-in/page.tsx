import Login from '@/app/components/auth/signin/Login';
import { Header } from '@/app/components/shared/header/Header';

export default function SignIn() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <Login />
      </main>
    </>
  );
}
