"use client";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
  roles: string[]; // Tambahkan field roles
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk mengambil data user
    const fetchUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          // Pastikan parsedUser memiliki roles, jika tidak set default sebagai array kosong
          if (parsedUser && !parsedUser.roles) {
            parsedUser.roles = [];
          }

          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Panggil fungsi
    fetchUser();

    // Tambahkan event listener untuk perubahan localStorage
    const handleStorageChange = () => {
      fetchUser();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Dependency array kosong

  return { user, loading };
}
