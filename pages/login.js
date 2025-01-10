import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to MyApp</h1>
        <p style={styles.subtitle}>Log in to access your personalized dashboard.</p>
        <a href="/api/auth/login" style={styles.loginButton}>
          Log In
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #0070f3, #3a8dff)",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#333",
  },
  subtitle: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
    color: "#666",
  },
  loginButton: {
    display: "inline-block",
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
};