"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductPayload } from "@/services/products";

export function ProductForm({
  form,
  setForm,
  errors,
  isSubmitting,
  onSubmit,
}: {
  form: ProductPayload;
  setForm: (form: ProductPayload) => void;
  errors: Record<string, string>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="mb-2">Nama Produk</Label>
        <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="description" className="mb-2">Deskripsi</Label>
        <Input id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="price" className="mb-2">Harga</Label>
        <Input id="price" type="number" value={form.price === 0 ? "" : form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })} />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>
      <div>
        <Label htmlFor="stock" className="mb-2">Stok</Label>
        <Input id="stock" type="number" value={form.stock === 0 ? "" : form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) || 0 })} />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}
