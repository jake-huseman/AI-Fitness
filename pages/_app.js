import "../styles/globals.css";
import { useUser } from "@auth0/nextjs-auth0/client"; // Verify this import
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  const { user } = useUser(); // Ensure useUser is a valid function

  return (
    <div>
      <header
        style={{
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
            Project App
          </Link>
        </h1>
        <nav>
          <Link href="/chat" style={{ color: "#fff", textDecoration: "none", marginRight: "10px" }}>
            Chat
          </Link>
          <Link href="/dashboard" style={{ color: "#fff", textDecoration: "none", marginRight: "10px" }}>
            Dashboard
          </Link>
          <Link href="/api/auth/logout" style={{ color: "#fff", textDecoration: "none", marginRight: "10px" }}>
            Logout
          </Link>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
