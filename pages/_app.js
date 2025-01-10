import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client"; // Correct import path for UserProvider
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client"; // Correct import path for useUser

// AuthGuard component to protect routes
function AuthGuard({ children }) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  console.log("AuthGuard Debug:", { user, isLoading });

  useEffect(() => {
    if (!isLoading && !user && router.pathname !== "/login") {
      console.log("Redirecting to /login");
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p>Loading...</p>;
  return children;
}

// Main App component
function MyApp({ Component, pageProps }) {
  console.log("Rendering MyApp...");

  return (
    <UserProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </UserProvider>
  );
}

export default MyApp;