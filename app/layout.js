"use client";

import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import "../styles/globals.css";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          <main>{children}</main>
          <footer>© 2024 Project App. All rights reserved.</footer>
        </UserProvider>
      </body>
    </html>
  );
}

// Conditional Header Component
function Header() {
  const { user } = useUser();
  const router = useRouter();

  return (
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
      <h1 style={{ margin: 0, cursor: "pointer" }} onClick={() => router.push("/")}>
        Project App
      </h1>
      <nav>
        <a
          href="/chat"
          style={{
            color: "#fff",
            textDecoration: "none",
            marginRight: "10px",
          }}
        >
          Chat
        </a>
        <a
          href="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            marginRight: "10px",
          }}
        >
          Home
        </a>
        {user ? (
          <a
            href="/api/auth/logout"
            style={{
              color: "#fff",
              textDecoration: "none",
              marginRight: "10px",
            }}
          >
            Logout
          </a>
        ) : (
          <a
            href="/api/auth/login"
            style={{
              color: "#fff",
              textDecoration: "none",
              marginRight: "10px",
            }}
          >
            Login
          </a>
        )}
      </nav>
    </header>
  );
}
