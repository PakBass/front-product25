import { apiFetch } from "@/lib/api";

// Definisikan tipe Product sesuai API Laravel-mu
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string; // 🆕 field baru
  created_at?: string;
  updated_at?: string;
}

// Data untuk create/update
export type ProductPayload = Omit<Product, "id" | "created_at" | "updated_at">;

// List produk — ambil langsung array dari res.data
export const getProducts = async (): Promise<Product[]> => {
  const res = await apiFetch<{ status: boolean; message: string; data: Product[]; meta?: any }>("/products");
  return res.data;
};

// Detail produk — ambil res.data
export const getProduct = async (id: number): Promise<Product> => {
  const res = await apiFetch<{ status: boolean; message: string; data: Product }>(`/products/${id}`);
  return res.data;
};

// Create
export const createProduct = (data: ProductPayload) =>
  apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update
export const updateProduct = (id: number, data: ProductPayload) =>
  apiFetch<Product>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// Delete
export const deleteProduct = (id: number) =>
  apiFetch<{ message: string }>(`/products/${id}`, {
    method: "DELETE",
  });
