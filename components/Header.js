import { useUser } from "@auth0/nextjs-auth0/client";

export default function Header() {
  const { user } = useUser();

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <a href="/dashboard" style={styles.link}>
          🌟 MyApp
        </a>
      </div>
      <nav style={styles.nav}>
        {user ? (
          <>
            <a href="/dashboard" style={styles.navLink}>
              Dashboard
            </a>
            <a href="/profile" style={styles.navLink}>
              Profile
            </a>
            <a href="/api/auth/logout" style={styles.navLink}>
              Logout
            </a>
          </>
        ) : (
          <a href="/api/auth/login" style={styles.navLink}>
            Login
          </a>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#0070f3",
    color: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transition: "background-color 0.2s ease",
  },
  navLinkHover: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};