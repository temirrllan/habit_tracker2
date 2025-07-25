const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function registerUser(telegram_id, language) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telegram_id, language }),
  });
  return await res.json();
}
