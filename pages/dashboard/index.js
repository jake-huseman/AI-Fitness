import Link from "next/link";

export default function Dashboard() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5em", color: "#333" }}>Dashboard</h1>
      <p style={{ fontSize: "1.2em", color: "#555", marginBottom: "30px" }}>
        Welcome to your dashboard! Use the buttons below to navigate.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link href="/dashboard/progress">
          <button
            style={{
              padding: "15px 25px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1em",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#007BFF")
            }
          >
            Track Progress
          </button>
        </Link>
        <Link href="/dashboard/goals">
          <button
            style={{
              padding: "15px 25px",
              backgroundColor: "#28A745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1em",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#1e7e34")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#28A745")
            }
          >
            Set Goals
          </button>
        </Link>
        <Link href="/dashboard/plans">
          <button
            style={{
              padding: "15px 25px",
              backgroundColor: "#FFC107",
              color: "#333",
              border: "none",
              borderRadius: "8px",
              fontSize: "1em",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#e0a800")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#FFC107")
            }
          >
            Generate Plans
          </button>
        </Link>
        <Link href="/chat">
          <button
            style={{
              padding: "15px 25px",
              backgroundColor: "#6F42C1",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1em",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#59369c")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#6F42C1")
            }
          >
            Chat with AI
          </button>
        </Link>
      </div>
    </div>
  );
}
