import * as cookie from "cookie";

export function setValidationCookie(name: string, value: string, hours = 24) {
  const expires = new Date();
  expires.setHours(expires.getHours() + hours);

  document.cookie = cookie.serialize(name, value, {
    path: "/",
    expires,
    sameSite: "lax",
    secure:
      typeof window !== "undefined" && window.location.protocol === "https:",
  });
}

export function getValidationCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const cookies = cookie.parse(document.cookie || "");
  return cookies[name] || null;
}

export function deleteValidationCookie(name: string) {
  document.cookie = cookie.serialize(name, "", {
    path: "/",
    expires: new Date(0),
  });
}
