import Link from "next/link";

export default function LoginPage(){return <main className="form-page"><section className="form-card"><h1>تسجيل الدخول</h1><p className="muted">ادخل إلى بوابة المشتري أو المورد.</p><form action="/portal"><label className="field">البريد الإلكتروني<input type="email" name="email" required/></label><label className="field">كلمة المرور<input type="password" name="password" required/></label><button className="btn btn-primary" type="submit">دخول</button></form><p>ليس لديك حساب؟ <Link href="/register">إنشاء حساب</Link></p></section></main>}
