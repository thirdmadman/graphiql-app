import Link from 'next/link';
import { RegisterForm } from '../../components/RegisterForm';

export default function SignUp() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="text-3xl uppercase mb-8">Sign Up</h2>
      <RegisterForm />
      <div className="flex p-5 flex-col items-center">
        <div className="mb-5">or</div>
        <Link
          href={'/auth/sign-in'}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back to Sign In
        </Link>
      </div>
    </main>
  );
}
