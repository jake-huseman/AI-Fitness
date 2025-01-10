import "../styles/globals.css";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client"; // Correct import paths
import { useRouter } from "next/router";
import Header from "../components/Header";

function AuthGuard({ children }) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (isLoading) return <p>Loading...</p>;

  if (!user && router.pathname !== "/login") {
    router.push("/login");
    return null;
  }

  return children;
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  return (
    <UserProvider>
      {!isLoginPage && <Header />}
      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      )}
    </UserProvider>
  );
}

export default MyApp;