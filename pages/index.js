import { useUser } from "@auth0/nextjs-auth0/client";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.welcome}>Welcome, {user?.name || "User"}!</h1>
      </header>
      <div style={styles.card}>
        <h2 style={styles.title}>Dashboard Options</h2>
        <div style={styles.links}>
          <a href="/dashboard/goals" style={styles.link}>
            Manage Goals
          </a>
          <a href="/dashboard/plans" style={styles.link}>
            View Plans
          </a>
          <a href="/dashboard/progress" style={styles.link}>
            Track Progress
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  welcome: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#0070f3",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textAlign: "center",
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
  link: {
    display: "block",
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "1rem",
    textAlign: "center",
    flex: "1 1 calc(33.333% - 1rem)",
  },
};