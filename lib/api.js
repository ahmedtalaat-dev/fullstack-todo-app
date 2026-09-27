const API_URL = "https://todo-api-eta-lyart.vercel.app";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

export { API_URL };
