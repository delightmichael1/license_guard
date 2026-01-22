interface MaintenanceProps {
  appName?: string;
  message?: string;
}

export default function Maintenance({ appName, message }: MaintenanceProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        background: "#f3f4f6",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      <img
        src="./assets/settings.svg"
        alt="Maintenance"
        style={{ width: "100px", height: "auto" }}
      />
      <h1>
        {appName ||
          (typeof document !== "undefined" ? document.title : "Application")}
      </h1>
      <h2>Currently under maintenance</h2>
      {message && <p>{message}</p>}
    </div>
  );
}
