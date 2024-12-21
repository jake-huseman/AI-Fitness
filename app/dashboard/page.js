"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user ? user.name : "Guest"}!</h1>
      <p>Your personalized fitness dashboard awaits.</p>
      <ul>
        <li><a href="/dashboard/progress">Track Progress</a></li>
        <li><a href="/dashboard/goals">Set Goals</a></li>
        <li><a href="/dashboard/plans">Generate Plans</a></li>
      </ul>
    </div>
  );
}
