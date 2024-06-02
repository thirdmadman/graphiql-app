import { SignUpContent } from '@/app/components/auth/signup/SignUpContent';
import { Header } from '@/app/components/shared/header/Header';

export default function SignUp() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center">
        <SignUpContent />
      </main>
    </>
  );
}
