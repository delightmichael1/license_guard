// AppValidator.tsx (updated)
"use client";
import Maintenance from "./Maintenance";
import { useEffect, useState } from "react";
import { validateApp, ValidationResponse } from "./utils/api";
import { setValidationCookie, getValidationCookie } from "./utils/cookies";

interface AppValidatorProps {
  appId: string;
  appName?: string;
  apiEndpoint?: string;
  children: React.ReactNode;
}

const loadingStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #faf5ff 100%)",
  },
  spinner: {
    width: "3rem",
    height: "3rem",
    border: "3px solid transparent",
    borderTop: "3px solid #4f46e5",
    borderBottom: "3px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Inject spin animation
if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("app-validator-styles");
  if (!existingStyle) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "app-validator-styles";
    styleSheet.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
  }
}

export default function AppValidator({
  appId,
  appName,
  apiEndpoint,
  children,
}: AppValidatorProps) {
  const [status, setStatus] = useState<"LOADING" | "OK" | "MAINTENANCE">(
    "LOADING",
  );
  const [message, setMessage] = useState<string | undefined>();

  const COOKIE_NAME = "__X-APP-V__";
  const COOKIE_LIFETIME_HOURS = 24;

  useEffect(() => {
    async function checkApp() {
      // Pass appId to decrypt the cookie value
      const cached = getValidationCookie(COOKIE_NAME, appId);

      if (cached === "OK") {
        setStatus("OK");
        return;
      }

      const res: ValidationResponse = await validateApp(appId, apiEndpoint);

      if (res.status === "OK") {
        setStatus("OK");
        setMessage(undefined);
        // Pass appId to encrypt the cookie value
        setValidationCookie(COOKIE_NAME, "OK", COOKIE_LIFETIME_HOURS, appId);
      } else {
        if (cached === "OK") {
          setStatus("OK");
          setMessage("Offline grace period active");
        } else {
          setStatus("MAINTENANCE");
          setMessage(res.message);
          setValidationCookie(
            COOKIE_NAME,
            "MAINTENANCE",
            COOKIE_LIFETIME_HOURS,
            appId,
          );
        }
      }
    }

    checkApp();
  }, [appId, apiEndpoint]);

  if (status === "LOADING")
    return (
      <div style={loadingStyles.container}>
        <div style={loadingStyles.spinner}></div>
      </div>
    );

  if (status === "MAINTENANCE")
    return <Maintenance appName={appName} message={message} />;

  return <>{children}</>;
}
