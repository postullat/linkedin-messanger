export function generateOriginToken() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateTrackingId() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return String.fromCharCode.apply(null, Array.from(arr));
}