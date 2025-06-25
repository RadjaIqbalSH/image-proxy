const KEY_HEX = '85b977e15080cb43cabd65672d17a0eba98c2df3b058c8f091af2575a833fdf21df798219598ddf7a58e1d73e77247e3d8628a95fd59af22f0d0a8bcd3830f37';
const SALT_HEX = 'e1aa3dbe7e67b00c61def08502a122a733d9c3abfdadb10af21825001a021da7b59161e6ec53d09364eee66c4d0ea3a0b54d831b9058733bbbf5b2c7933f9fa2';

// Fungsi konversi HEX ke Uint8Array
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

const keyBytes = hexToBytes(KEY_HEX);
const saltBytes = hexToBytes(SALT_HEX);

// Fungsi untuk generate signed URL
async function sign(path) {
  const encoder = new TextEncoder();
  const pathBytes = encoder.encode(path);
  const data = new Uint8Array(saltBytes.length + pathBytes.length);
  data.set(saltBytes);
  data.set(pathBytes, saltBytes.length);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, data);

  const base64url = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `/${base64url}${path}`;
}

// Listener untuk komunikasi iframe
window.addEventListener("message", async (event) => {
  if (event.origin !== "http://localhost:3000") return;

  const { path, id, type } = event.data;
  if (type !== "sign" || !path || typeof path !== "string") return;

  try {
    const signed = await sign(path);
    event.source?.postMessage(
      { type: "signed-imgproxy-url", id, url: signed },
      event.origin
    );
  } catch (err) {
    console.error("Signing failed:", err);
  }
});

