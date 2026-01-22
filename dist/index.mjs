import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import * as cookie from 'cookie';

// src/Maintenance.tsx
function Maintenance({ appName, message }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        background: "#f3f4f6",
        fontFamily: "sans-serif",
        padding: "20px"
      },
      children: [
        /* @__PURE__ */ jsx("h1", { children: appName || (typeof document !== "undefined" ? document.title : "Application") }),
        /* @__PURE__ */ jsx("h2", { children: "Currently under maintenance" }),
        message && /* @__PURE__ */ jsx("p", { children: message })
      ]
    }
  );
}

// src/utils/constants.ts
var OFFLINE_GRACE_PERIOD = 1e3 * 60 * 60 * 24;
var DEFAULT_API_ENDPOINT = "http://localhost:8000/v1/app/validate";

// src/utils/api.ts
async function validateApp(appId, apiEndpoint) {
  const endpoint = apiEndpoint || DEFAULT_API_ENDPOINT;
  try {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const res = await fetch(
      `${endpoint}?appId=${appId}&origin=${encodeURIComponent(origin)}`
    );
    if (!res.ok) {
      return { status: "MAINTENANCE", message: "Server error" };
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("App validation failed", err);
    return { status: "MAINTENANCE", message: "Network error" };
  }
}
function setValidationCookie(name, value, hours = 24) {
  const expires = /* @__PURE__ */ new Date();
  expires.setHours(expires.getHours() + hours);
  document.cookie = cookie.serialize(name, value, {
    path: "/",
    expires,
    sameSite: "lax",
    secure: typeof window !== "undefined" && window.location.protocol === "https:"
  });
}
function getValidationCookie(name) {
  if (typeof document === "undefined") return null;
  const cookies = cookie.parse(document.cookie || "");
  return cookies[name] || null;
}
function deleteValidationCookie(name) {
  document.cookie = cookie.serialize(name, "", {
    path: "/",
    expires: /* @__PURE__ */ new Date(0)
  });
}
function AppValidator({
  appId,
  appName,
  apiEndpoint,
  children
}) {
  const [status, setStatus] = useState(
    "LOADING"
  );
  const [message, setMessage] = useState();
  const COOKIE_NAME = "X-APP-V";
  const COOKIE_LIFETIME_HOURS = 24;
  useEffect(() => {
    async function checkApp() {
      const cached = getValidationCookie(COOKIE_NAME);
      if (cached === "OK") {
        setStatus("OK");
        return;
      }
      const res = await validateApp(appId, apiEndpoint);
      if (res.status === "OK") {
        setStatus("OK");
        setMessage(void 0);
        setValidationCookie(COOKIE_NAME, "OK", COOKIE_LIFETIME_HOURS);
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
            COOKIE_LIFETIME_HOURS
          );
        }
      }
    }
    checkApp();
  }, [appId, apiEndpoint]);
  if (status === "LOADING") return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  if (status === "MAINTENANCE")
    return /* @__PURE__ */ jsx(Maintenance, { appName, message });
  return /* @__PURE__ */ jsx(Fragment, { children });
}

export { AppValidator, DEFAULT_API_ENDPOINT, Maintenance, OFFLINE_GRACE_PERIOD, deleteValidationCookie, getValidationCookie, setValidationCookie, validateApp };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map