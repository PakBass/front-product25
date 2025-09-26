// lib/api.ts
export interface ApiOptions extends RequestInit {
  headers?: HeadersInit;
  signal?: AbortSignal;
}

// ✅ bikin generic <T>
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");

  // pastikan endpoint tidak diawali "/"
  const cleanEndpoint = endpoint.replace(/^\/+/, "");

  const res = await fetch(`http://127.0.0.1:8000/api/${cleanEndpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    // token expired → logout
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
