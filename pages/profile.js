import { useUser } from "@auth0/nextjs-auth0/client";

export default function ProfilePage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div style={styles.loading}>Loading your profile...</div>;
  }

  if (!user) {
    return (
      <div style={styles.error}>
        <p>You are not logged in. Please log in to view your profile.</p>
        <a href="/api/auth/login" style={styles.loginLink}>
          Log In
        </a>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Profile</h1>
      <div style={styles.card}>
        <img
          src={user.picture}
          alt={user.name}
          style={styles.profileImage}
        />
        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.email}>{user.email}</p>
        <a href="/api/auth/logout" style={styles.logoutLink}>
          Log Out
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#0070f3",
    marginBottom: "1rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    textAlign: "center",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "1rem",
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  email: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  logoutLink: {
    display: "inline-block",
    backgroundColor: "#d9534f",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "1rem",
  },
  loading: {
    fontSize: "1.2rem",
    textAlign: "center",
    marginTop: "20%",
    color: "#333",
  },
  error: {
    textAlign: "center",
    marginTop: "20%",
    color: "#333",
  },
  loginLink: {
    display: "inline-block",
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "1rem",
    marginTop: "1rem",
  },
};