"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { account } from "@/lib/appwrite-client";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const data = new FormData(e.currentTarget);
    try {
      await account.createEmailPasswordSession({
        email: String(data.get("email")),
        password: String(data.get("password"))
      });
      window.location.assign("/portal");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "تعذر تسجيل الدخول");
      setBusy(false);
    }
  }
  return <main className="form-page"><section className="form-card"><h1>تسجيل الدخول</h1><p className="muted">ادخل إلى بوابة المشتري أو المورد.</p>{message && <p role="alert">{message}</p>}<form onSubmit={onSubmit}><label className="field">البريد الإلكتروني<input type="email" name="email" required/></label><label className="field">كلمة المرور<input type="password" name="password" required/></label><button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "جارٍ الدخول…" : "دخول"}</button></form><p>ليس لديك حساب؟ <Link href="/register">إنشاء حساب</Link></p></section></main>;
}
