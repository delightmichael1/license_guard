import "./Maintenance.css";
import SvgIcon from "./SvgIcon";

interface MaintenanceProps {
  appName?: string;
  message?: string;
}

export default function Maintenance({ appName, message }: MaintenanceProps) {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        <div className="maintenance-card">
          <div className="icon-container">
            <div className="icon-background"></div>
            <div className="icon-wrapper">
              <SvgIcon />
            </div>
          </div>

          <h1 className="app-name">{appName || "Application"}</h1>

          <h2 className="main-message">Currently Under Maintenance</h2>

          <div className="divider-container">
            <div className="divider"></div>
          </div>

          {message && <p className="custom-message">{message}</p>}
          {!message && (
            <p className="custom-message">
              We're performing scheduled maintenance to improve your experience.
              We'll be back shortly!
            </p>
          )}
          <div className="status-indicators">
            <div className="dots-container">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="footer-info">
            <p>Thank you for your patience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
