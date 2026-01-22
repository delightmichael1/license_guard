"use client";
import Maintenance from "./Maintenance";
import { useEffect, useState } from "react";
import { validateApp, ValidationResponse } from "./utils/api";
import { setValidationCookie, getValidationCookie } from "./utils/cookies";

interface AppValidatorProps {
  appId: string;
  appName?: string;
  apiEndpoint?: string; // optional API endpoint
  children: React.ReactNode;
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

  const COOKIE_NAME = "X-APP-V";
  const COOKIE_LIFETIME_HOURS = 24; // cookie expires in 24 hours

  useEffect(() => {
    async function checkApp() {
      const cached = getValidationCookie(COOKIE_NAME);

      if (cached === "OK") {
        // Offline grace: cached OK cookie
        setStatus("OK");
        return;
      }

      // Make API call to validate appId
      const res: ValidationResponse = await validateApp(appId, apiEndpoint);

      if (res.status === "OK") {
        setStatus("OK");
        setMessage(undefined);
        // Set cookie for 24 hours
        setValidationCookie(COOKIE_NAME, "OK", COOKIE_LIFETIME_HOURS);
      } else {
        if (cached === "OK") {
          // Offline grace: previously cached OK
          setStatus("OK");
          setMessage("Offline grace period active");
        } else {
          setStatus("MAINTENANCE");
          setMessage(res.message);
          setValidationCookie(
            COOKIE_NAME,
            "MAINTENANCE",
            COOKIE_LIFETIME_HOURS,
          );
        }
      }
    }

    checkApp();
  }, [appId, apiEndpoint]);

  if (status === "LOADING") return <div>Loading...</div>;
  if (status === "MAINTENANCE")
    return <Maintenance appName={appName} message={message} />;
  return <>{children}</>;
}
