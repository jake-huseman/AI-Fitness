import { useUser } from '@auth0/nextjs-auth0/client';

export default function LoginPage() {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <a href="/api/auth/login">Login</a>;

  return <p>Welcome, {user.name}!</p>;
}