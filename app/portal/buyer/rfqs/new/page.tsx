"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createRfq, type RfqItem } from "../../../../../lib/marketplace";

export default function NewRfqPage() {
  const router = useRouter();
  const [items, setItems] = useState<RfqItem[]>([{ name: "", quantity: 1, unit: "قطعة", notes: "" }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateItem(index: number, key: keyof RfqItem, value: string | number) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function addItem() {
    setItems((current) => [...current, { name: "", quantity: 1, unit: "قطعة", notes: "" }]);
  }

  function removeItem(index: number) {
    setItems((current) => current.filter((_, i) => i !== index));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      await createRfq({
        title: String(form.get("title") || ""),
        city: String(form.get("city") || "الرياض"),
        deadline: String(form.get("deadline") || ""),
        notes: String(form.get("notes") || ""),
        items: items.filter((item) => item.name.trim()),
      });
      router.push("/portal/buyer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر حفظ الطلب.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="form-page">
      <section className="form-card">
        <h1>إنشاء طلب عرض سعر</h1>
        <form onSubmit={submit}>
          <label className="field">عنوان الطلب<input name="title" placeholder="مثال: مواد تشطيب لمشروع سكني" required /></label>
          <label className="field">المدينة<select name="city"><option>الرياض</option><option>جدة</option><option>الدمام</option><option>خميس مشيط</option></select></label>
          <label className="field">آخر موعد لاستلام العروض<input type="date" name="deadline" /></label>

          <h2>البنود المطلوبة</h2>
          {items.map((item, index) => (
            <div className="card" key={index}>
              <label className="field">اسم البند<input value={item.name} onChange={(e) => updateItem(index, "name", e.target.value)} required /></label>
              <label className="field">الكمية<input type="number" min="1" value={item.quantity} onChange={(e) => updateItem(index, "quantity", Number(e.target.value))} required /></label>
              <label className="field">الوحدة<select value={item.unit} onChange={(e) => updateItem(index, "unit", e.target.value)}><option>قطعة</option><option>كرتون</option><option>متر</option><option>متر مربع</option><option>كيلوجرام</option><option>طن</option></select></label>
              <label className="field">ملاحظات<input value={item.notes || ""} onChange={(e) => updateItem(index, "notes", e.target.value)} /></label>
              {items.length > 1 && <button type="button" className="btn" onClick={() => removeItem(index)}>حذف البند</button>}
            </div>
          ))}

          <button type="button" className="btn" onClick={addItem}>إضافة بند آخر</button>
          <label className="field">ملاحظات عامة<textarea name="notes" rows={4} /></label>
          {error && <p className="muted">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "جارٍ الحفظ…" : "حفظ الطلب"}</button>
        </form>
        <p><Link href="/portal/buyer">العودة لبوابة المشتري</Link></p>
      </section>
    </main>
  );
}
