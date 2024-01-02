import { RegisterForm } from '../../components/RegisterForm';

export default function SignUp() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full p-5 mt-5 light">
        <div className="w-full mx-auto p-4 space-y-6 rounded-lg shadow sm:p-8 sm:max-w-md dark:bg-gray-900 dark:text-gray-100">
          <h1 className="text-3xl text-center font-bold leading-tight tracking-tight">
            Create an account
          </h1>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
