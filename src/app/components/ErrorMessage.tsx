export function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="absolute left-0 w-fit text-xs text-red-600">{message}</p>
  );
}
