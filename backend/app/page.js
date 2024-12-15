"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function HomePage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Welcome to Project App</h1>
      {user ? (
        <>
          <p>Hello, {user.name}!</p>
          <p>Email: {user.email || "Email not provided"}</p>
          <a href="/api/auth/logout">Logout</a>
        </>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </div>
  );
}
