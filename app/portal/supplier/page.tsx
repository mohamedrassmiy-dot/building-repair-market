"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listMyProducts } from "../../../lib/marketplace";

export default function SupplierPortal() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    listMyProducts()
      .then((result) => setProducts(result.documents))
      .catch(() => setError("تعذر تحميل المنتجات الآن. تأكد من تهيئة قاعدة بيانات Appwrite."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="portal">
      <header className="portal-head">
        <div className="container nav">
          <div className="brand">بوابة المورد<small>Supplier Portal</small></div>
          <Link href="/portal" className="btn btn-light">اللوحة الرئيسية</Link>
        </div>
      </header>
      <section className="container section">
        <div className="actions"><Link href="/portal/supplier/products/new" className="btn btn-primary">إضافة منتج</Link></div>
        <div className="stats">
          <div className="stat"><strong>{products.length}</strong><p className="muted">منتجات</p></div>
          <div className="stat"><strong>0</strong><p className="muted">طلبات جديدة</p></div>
          <div className="stat"><strong>0</strong><p className="muted">عروض مقدمة</p></div>
        </div>
        <div className="card">
          <h2>منتجاتك</h2>
          {loading && <p className="muted">جارٍ تحميل المنتجات…</p>}
          {error && <p className="muted">{error}</p>}
          {!loading && !error && products.length === 0 && <p className="muted">لا توجد منتجات حتى الآن.</p>}
          {!loading && products.length > 0 && (
            <div className="grid">
              {products.map((product) => (
                <article className="card" key={product.$id}>
                  <h3>{product.name}</h3>
                  <p className="muted">الفئة: {product.category}</p>
                  <p className="muted">الحالة: {product.status}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
