"use client";

export default function RoleBasedAccess({ role, children }) {
  // Check role and conditionally render content
  if (role === "coach" || role === "user") {
    return <>{children}</>;
  }

  return <p>You do not have the necessary permissions to view this content.</p>;
}
