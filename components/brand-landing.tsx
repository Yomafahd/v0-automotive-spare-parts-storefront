'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, Award, Wrench, Truck, Star, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/data'
import type { Brand } from '@/lib/types'

interface BrandLandingProps {
  brand: Brand
}

const brandDescriptions: Record<string, { descriptionAr: string; taglineAr: string }> = {
  mg: {
    taglineAr: 'تراث بريطاني، تقنية حديثة',
    descriptionAr: 'إم جي، العلامة البريطانية العريقة التي تأسست عام 1924، تجمع بين الأناقة الكلاسيكية والتقنيات المتطورة. نوفر لك قطع غيار أصلية تضمن أداءً متميزًا لسيارتك.',
  },
  chery: {
    taglineAr: 'جودة صينية عالمية',
    descriptionAr: 'شيري، الرائدة في صناعة السيارات الصينية منذ 1997، تقدم مركبات موثوقة وعملية. احصل على قطع غيار أصلية للحفاظ على سيارتك في أفضل حال.',
  },
  geely: {
    taglineAr: 'ابتكار يقود المستقبل',
    descriptionAr: 'جيلي، المالكة لفولفو وبولستار، تمثل قمة الابتكار الصيني. نقدم لك قطع غيار أصلية بمعايير عالمية لسيارتك جيلي.',
  },
}

const brandHeroImages: Record<string, string> = {
  mg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&h=800&fit=crop',
  chery: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&h=800&fit=crop',
  geely: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1600&h=800&fit=crop',
}

const features = [
  {
    icon: Shield,
    titleAr: 'ضمان الجودة',
    descriptionAr: 'جميع قطع الغيار أصلية 100% ومضمونة من الشركة المصنعة',
  },
  {
    icon: Award,
    titleAr: 'توافق مثالي',
    descriptionAr: 'قطع مصممة خصيصًا لتناسب موديلات سيارتك بدقة متناهية',
  },
  {
    icon: Wrench,
    titleAr: 'دعم فني متخصص',
    descriptionAr: 'فريق خبراء جاهز لمساعدتك في اختيار القطع المناسبة',
  },
]

export function BrandLanding({ brand }: BrandLandingProps) {
  const brandInfo = brandDescriptions[brand.id] || brandDescriptions.mg
  const heroImage = brandHeroImages[brand.id] || brandHeroImages.mg
  
  // Get products for this brand
  const brandProducts = products
    .filter((product) => product.brand === brand.name)
    .slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={brand.nameAr}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/90 to-background/70" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
                {brandInfo.taglineAr}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-foreground">قطع غيار </span>
              <span className="gold-gradient-text">{brand.nameAr}</span>
              <span className="text-foreground"> الأصلية</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              {brandInfo.descriptionAr}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gold-glow"
                asChild
              >
                <Link href={`/catalog?brand=${brand.name}`}>
                  تصفح منتجات {brand.nameAr}
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 text-foreground hover:bg-primary/10"
                asChild
              >
                <Link href="/blog">
                  نصائح الصيانة
                </Link>
              </Button>
            </motion.div>

            {/* Models */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <p className="text-sm text-muted-foreground mb-3">الموديلات المتوفرة:</p>
              <div className="flex flex-wrap gap-2">
                {brand.models.map((model) => (
                  <span
                    key={model}
                    className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Why Choose Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">لماذا تختار قطع </span>
              <span className="gold-gradient-text">{brand.nameAr}</span>
              <span className="text-foreground"> الأصلية؟</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اكتشف مزايا استخدام قطع الغيار الأصلية للحفاظ على أداء سيارتك وقيمتها
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleAr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="glass-panel rounded-2xl p-8 h-full text-center hover:border-primary/40 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.titleAr}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.descriptionAr}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-navy/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="gold-gradient-text">أفضل المنتجات</span>
              </h2>
              <p className="text-muted-foreground">
                قطع الغيار الأكثر طلبًا لسيارات {brand.nameAr}
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden md:flex border-primary/30 text-foreground hover:bg-primary/10"
              asChild
            >
              <Link href={`/catalog?brand=${brand.name}`}>
                عرض الكل
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </motion.div>

          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                لا توجد منتجات متاحة حاليًا لهذه العلامة التجارية
              </p>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/10"
              asChild
            >
              <Link href={`/catalog?brand=${brand.name}`}>
                عرض جميع منتجات {brand.nameAr}
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">شحن مجاني</h4>
                  <p className="text-sm text-muted-foreground">للطلبات فوق 500 ر.س</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">ضمان سنة كاملة</h4>
                  <p className="text-sm text-muted-foreground">على جميع القطع</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-center md:justify-end">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">+10,000 عميل راضٍ</h4>
                  <p className="text-sm text-muted-foreground">ثقة مستمرة منذ 2015</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
