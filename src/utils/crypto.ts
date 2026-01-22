function stringToBytes(str: string): number[] {
  return Array.from(str).map((char) => char.charCodeAt(0));
}

function bytesToString(bytes: number[]): string {
  return bytes.map((byte) => String.fromCharCode(byte)).join("");
}

function generateKey(appId: string): number[] {
  // Create a repeatable key from appId
  const hash = Array.from(appId).reduce((acc, char) => {
    return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
  }, 0);

  // Generate a key array from the hash
  const key: number[] = [];
  let seed = Math.abs(hash);
  for (let i = 0; i < 16; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    key.push(seed % 256);
  }
  return key;
}

export function encrypt(value: string, appId: string): string {
  try {
    const key = generateKey(appId);
    const valueBytes = stringToBytes(value);
    const encrypted: number[] = [];

    for (let i = 0; i < valueBytes.length; i++) {
      encrypted.push(valueBytes[i] ^ key[i % key.length]);
    }

    // Convert to base64-like string
    return btoa(bytesToString(encrypted));
  } catch (err) {
    console.error("Encryption failed", err);
    return value; // Fallback to plain value
  }
}

export function decrypt(encryptedValue: string, appId: string): string | null {
  try {
    const key = generateKey(appId);
    const decoded = atob(encryptedValue);
    const encryptedBytes = stringToBytes(decoded);
    const decrypted: number[] = [];

    for (let i = 0; i < encryptedBytes.length; i++) {
      decrypted.push(encryptedBytes[i] ^ key[i % key.length]);
    }

    return bytesToString(decrypted);
  } catch (err) {
    console.error("Decryption failed", err);
    return null;
  }
}
