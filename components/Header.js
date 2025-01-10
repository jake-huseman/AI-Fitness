import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

const Header = () => {
  const { user } = useUser();

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
      <h1>
        <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
          Project App
        </a>
      </h1>
      <nav>
        {user ? (
          <>
            <a
              href="/dashboard"
              style={{ color: "#fff", textDecoration: "none", marginRight: "10px" }}
            >
              Dashboard
            </a>
            <a
              href="/api/auth/logout"
              style={{ color: "#fff", textDecoration: "none", marginRight: "10px" }}
            >
              Logout
            </a>
          </>
        ) : (
          <a
            href="/login"
            style={{ color: "#fff", textDecoration: "none", marginRight: "10px" }}
          >
            Login
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;