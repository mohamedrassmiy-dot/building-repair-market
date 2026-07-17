"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "../auth-provider";

export default function PortalPage(){
  const { user, loading, logout } = useAuth();
  useEffect(() => {
    if (!loading && !user) window.location.replace("/login");
  }, [loading, user]);
  if (loading || !user) return <main className="form-page"><section className="form-card"><p>جارٍ التحقق من الحساب…</p></section></main>;
  const role = String(user.prefs?.role || "buyer");
  return <main className="portal"><header className="portal-head"><div className="container nav"><div className="brand">لوحة سوق إصلاح البناء<small>{user.name} — {role === "supplier" ? "مورد" : role === "admin" ? "إدارة" : "مشتري"}</small></div><div><Link href="/" className="btn btn-light">العودة للموقع</Link> <button onClick={() => void logout()} className="btn btn-light">تسجيل الخروج</button></div></div></header><section className="container"><div className="stats"><div className="stat"><strong>0</strong><p className="muted">طلبات عروض الأسعار</p></div><div className="stat"><strong>0</strong><p className="muted">العروض المستلمة</p></div><div className="stat"><strong>0</strong><p className="muted">الموردون المعتمدون</p></div></div><div className="grid">{role === "buyer" && <article className="card"><h3>بوابة المشتري</h3><p>إنشاء طلب جديد متعدد البنود وإرساله إلى الموردين.</p><Link href="/portal/buyer" className="btn btn-primary">فتح بوابة المشتري</Link></article>}{role === "supplier" && <article className="card"><h3>بوابة المورد</h3><p>إدارة المنتجات واستقبال الطلبات وتقديم العروض.</p><Link href="/portal/supplier" className="btn btn-primary">فتح بوابة المورد</Link></article>}{role === "admin" && <article className="card"><h3>لوحة الإدارة</h3><p>اعتماد الموردين والمنتجات ومتابعة نشاط المنصة.</p><Link href="/portal/admin" className="btn btn-primary">فتح الإدارة</Link></article>}</div></section></main>;
}
