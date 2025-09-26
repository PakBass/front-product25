"use client";

import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, Product, ProductPayload } from "@/services/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Gagal ambil data produk:", err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (payload: ProductPayload) => {
    await createProduct(payload);
    await fetchData();
  };

  const editProduct = async (id: number, payload: ProductPayload) => {
    await updateProduct(id, payload);
    await fetchData();
  };

  const removeProduct = async (id: number) => {
    await deleteProduct(id);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, loading, addProduct, editProduct, removeProduct };
}
