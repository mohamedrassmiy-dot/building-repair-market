import Link from "next/link";

const services = [
  ["طلبات عروض الأسعار", "أنشئ طلبًا متعدد البنود وأرسله إلى أكثر من مورد."],
  ["بوابة الموردين", "أضف المنتجات واستقبل الطلبات وقدّم عروض أسعار واضحة."],
  ["مقارنة العروض", "قارن السعر ومدة التوريد والشروط في مكان واحد."],
];

export default function HomePage() {
  return (
    <main>
      <header className="header">
        <div className="container nav">
          <Link href="/" className="brand">سوق إصلاح البناء<small>Building Repair Market</small></Link>
          <nav className="links">
            <a href="#services">الخدمات</a>
            <a href="#suppliers">للموردين</a>
            <Link href="/login">تسجيل الدخول</Link>
            <Link href="/register" className="btn btn-primary">إنشاء حساب</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>سوق موثوق لطلبات البناء والصيانة والتشطيبات</h1>
            <p>اربط احتياج مشروعك بموردين مؤهلين داخل المملكة، واستقبل عروض أسعار متعددة وقارنها بسهولة.</p>
            <div className="actions">
              <Link href="/register?role=buyer" className="btn btn-light">ابدأ كمشترٍ</Link>
              <Link href="/register?role=supplier" className="btn btn-primary">انضم كمورد</Link>
            </div>
          </div>
          <div className="panel">
            <h2>من الطلب إلى العرض في خطوات بسيطة</h2>
            <p>أضف البنود والكميات، اختر الموردين، ثم استقبل عروضًا منظمة قابلة للمقارنة.</p>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-title"><h2>منصة عملية للسوق السعودي</h2><p className="muted">مصممة للمشترين والموردين وفرق الإدارة.</p></div>
          <div className="grid">
            {services.map(([title, text]) => <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section alt" id="suppliers">
        <div className="container hero-grid">
          <div><h2>للموردين</h2><p className="muted">اعرض منتجاتك، استقبل طلبات حقيقية، وقدّم عرضك حسب كل بند ومدة التوريد.</p></div>
          <div className="actions"><Link href="/register?role=supplier" className="btn btn-primary">تسجيل مورد جديد</Link><a href="https://wa.me/966536741442" className="btn btn-light">تواصل عبر واتساب</a></div>
        </div>
      </section>

      <footer className="footer">© 2026 سوق إصلاح البناء — الرياض، المملكة العربية السعودية</footer>
    </main>
  );
}
