export const getTokenExpiryTime = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );

    const decoded = JSON.parse(atob(padded));

    if (!decoded.exp) return null;

    return decoded.exp * 1000; // milliseconds
  } catch {
    return null;
  }
};