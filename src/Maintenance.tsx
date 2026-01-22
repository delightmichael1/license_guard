import React from "react";
import SvgIcon from "./SvgIcon";

interface MaintenanceProps {
  appName?: string;
  message?: string;
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #faf5ff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  content: {
    maxWidth: "48rem",
    width: "100%",
  },
  card: {
    background: "white",
    borderRadius: "1.5rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    padding: "3rem 2rem",
    textAlign: "center" as const,
    transition: "transform 0.3s ease",
  },
  iconContainer: {
    marginBottom: "2rem",
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "22rem",
    width: "100%",
  },
  iconBackground: {
    position: "absolute" as const,
    width: "20rem",
    height: "20rem",
    backgroundColor: "#e0e7ff",
    borderRadius: "50%",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  iconWrapper: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20rem",
    height: "20rem",
  },
  icon: {
    width: "6rem",
    height: "6rem",
    color: "#4f46e5",
  },
  appName: {
    fontSize: "2.25rem",
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 0.75rem 0",
  },
  mainMessage: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#4f46e5",
    margin: "0 0 1rem 0",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  divider: {
    height: "0.25rem",
    width: "4rem",
    background: "linear-gradient(to right, #818cf8, #a78bfa)",
    borderRadius: "9999px",
  },
  customMessage: {
    color: "#4b5563",
    fontSize: "1.125rem",
    margin: "0 auto 2rem auto",
    maxWidth: "28rem",
    lineHeight: 1.75,
  },
  statusIndicators: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  dotsContainer: {
    display: "flex",
    gap: "0.25rem",
  },
  dot: {
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: "#4f46e5",
    borderRadius: "50%",
    animation: "bounce 1s infinite",
  },
  footerInfo: {
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  supportInfo: {
    marginTop: "1.5rem",
    textAlign: "center" as const,
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  supportLink: {
    color: "#4f46e5",
    fontWeight: 500,
    textDecoration: "underline",
  },
};

// Inject keyframes
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-0.5rem); }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default function Maintenance({ appName, message }: MaintenanceProps) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.iconContainer}>
            <div style={styles.iconBackground}></div>
            <div style={styles.iconWrapper}>
              <SvgIcon />
            </div>
          </div>

          <h1 style={styles.appName}>{appName || "Application"}</h1>
          <h2 style={styles.mainMessage}>Currently Under Maintenance</h2>

          <div style={styles.dividerContainer}>
            <div style={styles.divider}></div>
          </div>

          <p style={styles.customMessage}>
            We're performing scheduled maintenance to improve your experience.
            We'll be back shortly!
          </p>

          <div style={styles.statusIndicators}>
            <div style={styles.dotsContainer}>
              <div style={{ ...styles.dot, animationDelay: "0s" }}></div>
              <div style={{ ...styles.dot, animationDelay: "0.1s" }}></div>
              <div style={{ ...styles.dot, animationDelay: "0.2s" }}></div>
            </div>
          </div>

          <div style={styles.footerInfo}>
            <p style={{ margin: 0 }}>Thank you for your patience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
