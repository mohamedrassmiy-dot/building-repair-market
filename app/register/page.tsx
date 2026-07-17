"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ID } from "appwrite";
import { account } from "@/lib/appwrite-client";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const data = new FormData(e.currentTarget);
    try {
      const email = String(data.get("email"));
      const password = String(data.get("password"));
      const name = String(data.get("name"));
      const role = String(data.get("role"));
      const company = String(data.get("company") || "");
      const phone = String(data.get("phone") || "");
      await account.create({ userId: ID.unique(), email, password, name });
      await account.createEmailPasswordSession({ email, password });
      await account.updatePrefs({ prefs: { role, company, phone } });
      window.location.assign("/portal");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "تعذر إنشاء الحساب");
      setBusy(false);
    }
  }
  return <main className="form-page"><section className="form-card"><h1>إنشاء حساب</h1><p className="muted">سجّل كمشترٍ أو مورد في سوق إصلاح البناء.</p>{message && <p role="alert">{message}</p>}<form onSubmit={onSubmit}><label className="field">نوع الحساب<select name="role" defaultValue="buyer"><option value="buyer">مشتري</option><option value="supplier">مورد</option></select></label><label className="field">الاسم الكامل<input name="name" required/></label><label className="field">اسم الشركة<input name="company"/></label><label className="field">البريد الإلكتروني<input type="email" name="email" required/></label><label className="field">رقم الجوال<input name="phone" required/></label><label className="field">كلمة المرور<input type="password" name="password" minLength={8} required/></label><button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "جارٍ إنشاء الحساب…" : "إنشاء الحساب"}</button></form><p>لديك حساب؟ <Link href="/login">تسجيل الدخول</Link></p></section></main>;
}
