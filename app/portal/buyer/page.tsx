"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listMyRfqs } from "../../../lib/marketplace";

export default function BuyerPortal() {
  const [rfqs, setRfqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    listMyRfqs()
      .then((result) => setRfqs(result.documents))
      .catch(() => setError("تعذر تحميل الطلبات الآن. تأكد من تهيئة قاعدة بيانات Appwrite."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="portal">
      <header className="portal-head">
        <div className="container nav">
          <div className="brand">بوابة المشتري<small>Buyer Portal</small></div>
          <Link href="/portal" className="btn btn-light">اللوحة الرئيسية</Link>
        </div>
      </header>
      <section className="container section">
        <div className="actions">
          <Link href="/portal/buyer/rfqs/new" className="btn btn-primary">إنشاء طلب عرض سعر</Link>
        </div>
        <div className="card">
          <h2>طلباتك</h2>
          {loading && <p className="muted">جارٍ تحميل الطلبات…</p>}
          {error && <p className="muted">{error}</p>}
          {!loading && !error && rfqs.length === 0 && (
            <p className="muted">لا توجد طلبات حتى الآن. أنشئ أول طلب وحدد البنود والكميات.</p>
          )}
          {!loading && rfqs.length > 0 && (
            <div className="grid">
              {rfqs.map((rfq) => (
                <article className="card" key={rfq.$id}>
                  <h3>{rfq.title}</h3>
                  <p className="muted">المدينة: {rfq.city}</p>
                  <p className="muted">الحالة: {rfq.status}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
