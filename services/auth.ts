export async function login(email: string, password: string) {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Login gagal");
    }

    const data = await res.json();
    console.log("Full API response:", data); // Debug
    console.log("User data:", data.data.user); // Debug

    // simpan token ke cookie
    document.cookie = `token=${data.data.access_token}; path=/;`;

    // simpan data user ke localStorage
    if (data.data.user) {
      const userToStore = {
        name: data.data.user.name,
        email: data.data.user.email,
        avatar: data.data.user.avatar || "",
        roles: data.data.user.roles || [], // Tambahkan ini untuk menyimpan roles
      };
      console.log("Storing user data:", userToStore); // Debug
      localStorage.setItem("user", JSON.stringify(userToStore));
    } else {
      console.error("No user data in API response"); // Debug
    }

    return data;
  } catch (error) {
    console.error("Login error:", error); // Debug
    throw error;
  }
}

// export async function register(name: string, email: string, password: string, password_confirmation: string) {
//   const res = await fetch("http://127.0.0.1:8000/api/auth/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, email, password, password_confirmation }),
//   });

//   if (!res.ok) {
//     throw new Error("Register gagal");
//   }

//   return res.json();
// }

export async function register(name: string, email: string, password: string, password_confirmation: string) {
  try {
    console.log("Attempting registration with:", { name, email }); // Debug

    const res = await fetch("http://127.0.0.1:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });

    console.log("Registration response status:", res.status); // Debug

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Registration error response:", errorData); // Debug
      throw new Error(errorData.message || "Register gagal");
    }

    const data = await res.json();
    console.log("Registration successful:", data); // Debug

    // Kembalikan data registrasi
    return data;
  } catch (error) {
    console.error("Registration process error:", error); // Debug
    throw error;
  }
}

// services/auth.ts
export function getToken() {
  return localStorage.getItem("token");
}

export function clearToken() {
  localStorage.removeItem("token");
}

export function isLoggedIn(): boolean {
  return !!getToken();
}
