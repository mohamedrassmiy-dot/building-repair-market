"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createProduct } from "../../../../../lib/marketplace";

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      await createProduct({
        name: String(form.get("name") || ""),
        sku: String(form.get("sku") || ""),
        category: String(form.get("category") || ""),
        unit: String(form.get("unit") || "قطعة"),
        price: Number(form.get("price") || 0),
        description: String(form.get("description") || ""),
      });
      router.push("/portal/supplier");
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر حفظ المنتج.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="form-page">
      <section className="form-card">
        <h1>إضافة منتج</h1>
        <p className="muted">سيظهر المنتج بحالة قيد المراجعة حتى اعتماده من الإدارة.</p>
        <form onSubmit={submit}>
          <label className="field">اسم المنتج<input name="name" required /></label>
          <label className="field">رمز المنتج SKU<input name="sku" /></label>
          <label className="field">الفئة<input name="category" placeholder="مثال: أدوات دهان" required /></label>
          <label className="field">الوحدة<select name="unit"><option>قطعة</option><option>كرتون</option><option>متر</option><option>متر مربع</option><option>كيلوجرام</option><option>طن</option></select></label>
          <label className="field">السعر الاسترشادي<input type="number" min="0" step="0.01" name="price" /></label>
          <label className="field">الوصف<textarea name="description" rows={5} /></label>
          {error && <p className="muted">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "جارٍ الحفظ…" : "حفظ المنتج"}</button>
        </form>
        <p><Link href="/portal/supplier">العودة لبوابة المورد</Link></p>
      </section>
    </main>
  );
}
