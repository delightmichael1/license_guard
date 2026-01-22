import * as cookie from "cookie";
import { decrypt, encrypt } from "./crypto";

export function setValidationCookie(
  name: string,
  value: string,
  hours = 24,
  appId: string,
) {
  const expires = new Date();
  expires.setHours(expires.getHours() + hours);

  // Encrypt the value using appId
  const encryptedValue = encrypt(value, appId);

  document.cookie = cookie.serialize(name, encryptedValue, {
    path: "/",
    expires,
    sameSite: "lax",
    secure:
      typeof window !== "undefined" && window.location.protocol === "https:",
  });
}

export function getValidationCookie(
  name: string,
  appId: string,
): string | null {
  if (typeof document === "undefined") return null;

  const cookies = cookie.parse(document.cookie || "");
  const encryptedValue = cookies[name];

  if (!encryptedValue) return null;

  return decrypt(encryptedValue, appId);
}

export function deleteValidationCookie(name: string) {
  document.cookie = cookie.serialize(name, "", {
    path: "/",
    expires: new Date(0),
  });
}
