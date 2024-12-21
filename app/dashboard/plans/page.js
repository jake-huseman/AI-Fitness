"use client";

export default function PlansPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>AI-Generated Plans</h1>
      <p>Generate personalized fitness and meal plans tailored to your goals.</p>
      <a href="/dashboard/plans/generate" style={{ color: "blue" }}>
        Generate New Plan
      </a>
    </div>
  );
}
