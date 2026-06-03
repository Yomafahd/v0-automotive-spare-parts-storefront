import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import { brands, categories } from '@/lib/data'

export function Footer() {
  return (
    <footer className="bg-navy border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-gold-light flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">أ</span>
              </div>
              <div>
                <h3 className="text-xl font-bold gold-gradient-text">الأبرار</h3>
                <p className="text-xs text-muted-foreground">لقطع غيار السيارات</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              نقدم أفضل قطع غيار السيارات الصينية الأصلية مع ضمان الجودة وخدمة ما بعد البيع المميزة.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/966500000000"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  جميع المنتجات
                </Link>
              </li>
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={`/catalog?brand=${brand.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    قطع غيار {brand.nameAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-foreground mb-6">التصنيفات</h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/catalog?category=${category.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {category.nameAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  الرياض، المملكة العربية السعودية
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+966500000000" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +966 50 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@alabrar.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  info@alabrar.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  السبت - الخميس: 9 صباحاً - 10 مساءً
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 الأبرار لقطع غيار السيارات. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              سياسة الخصوصية
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
