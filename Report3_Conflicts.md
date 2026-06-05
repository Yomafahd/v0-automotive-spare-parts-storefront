# تقرير التعارض والاختلافات بين المستودعات

يستعرض هذا التقرير الملفات الموجودة في الريبو الحالي والمستودعات الأخرى ولكن بمحتوى مختلف (تعارضات).


## التعارضات بين الريبو الحالي و `AIOS-V`

### الملف: `.gitignore`
الاختلافات (Diff):
```diff
diff --git a/./.gitignore b/tmp/repos/AIOS-V/.gitignore
index 97eb8c0..2a1e36f 100644
--- a/./.gitignore
+++ b/tmp/repos/AIOS-V/.gitignore
@@ -1,15 +1,9 @@
-# v0 sandbox internal files
-__v0_runtime_loader.js
-__v0_devtools.tsx
-__v0_jsx-dev-runtime.ts
-.snowflake/
-.v0-trash/
-.vercel/
-
-# Environment variables
-.env*.local
-
-# Common ignores
-node_modules
-.next/
-.DS_Store
\ No newline at end of file
+venv/
+.env
+__pycache__/
+*.pyc
+chroma/
+*.py.bak
+*.bak
+media/
+الموقع الالكتروني/
```


## التعارضات بين الريبو الحالي و `alabrar.online`

### الملف: `app/catalog/page.tsx`
الاختلافات (Diff):
```diff
diff --git a/./app/catalog/page.tsx b/tmp/repos/alabrar.online/app/catalog/page.tsx
index 8b71fc6..ebd9bd9 100644
--- a/./app/catalog/page.tsx
+++ b/tmp/repos/alabrar.online/app/catalog/page.tsx
@@ -3,19 +3,24 @@ import { Header } from '@/components/header'
 import { Footer } from '@/components/footer'
 import { CatalogContent } from '@/components/catalog-content'
 import { AIChatWidget } from '@/components/ai-chat-widget'
+import { getProducts } from '@/lib/db-queries'

 export const metadata = {
   title: 'جميع المنتجات | الأبرار لقطع غيار السيارات',
   description: 'تصفح مجموعتنا الكاملة من قطع غيار السيارات الصينية الأصلية',
 }

-export default function CatalogPage() {
+export const dynamic = 'force-dynamic'
+
+export default async function CatalogPage() {
+  const dbProducts = await getProducts()
+
   return (
     <>
       <Header />
       <main>
         <Suspense fallback={<div className="min-h-screen" />}>
-          <CatalogContent />
+          <CatalogContent initialProducts={dbProducts} />
         </Suspense>
       </main>
       <Footer />
```

### الملف: `app/page.tsx`
الاختلافات (Diff):
```diff
diff --git a/./app/page.tsx b/tmp/repos/alabrar.online/app/page.tsx
index 1211a46..32e2269 100644
--- a/./app/page.tsx
+++ b/tmp/repos/alabrar.online/app/page.tsx
@@ -2,17 +2,24 @@ import { Header } from '@/components/header'
 import { Hero } from '@/components/hero'
 import { BrandSlider } from '@/components/brand-slider'
 import { FeaturedProducts } from '@/components/featured-products'
+import { GoogleReviews } from '@/components/google-reviews'
 import { Footer } from '@/components/footer'
 import { AIChatWidget } from '@/components/ai-chat-widget'
+import { getProducts } from '@/lib/db-queries'
+
+export const dynamic = 'force-dynamic'
+
+export default async function Home() {
+  const dbProducts = await getProducts()

-export default function Home() {
   return (
     <>
       <Header />
       <main>
         <Hero />
         <BrandSlider />
-        <FeaturedProducts />
+        <FeaturedProducts initialProducts={dbProducts} />
+        <GoogleReviews />
       </main>
       <Footer />
       <AIChatWidget />
```

### الملف: `app/product/[id]/page.tsx`
الاختلافات (Diff):
```diff
diff --git a/./app/product/[id]/page.tsx b/tmp/repos/alabrar.online/app/product/[id]/page.tsx
index b0e34d2..ada808f 100644
--- a/./app/product/[id]/page.tsx
+++ b/tmp/repos/alabrar.online/app/product/[id]/page.tsx
@@ -3,15 +3,17 @@ import { Header } from '@/components/header'
 import { Footer } from '@/components/footer'
 import { ProductDetails } from '@/components/product-details'
 import { AIChatWidget } from '@/components/ai-chat-widget'
-import { products } from '@/lib/data'
+import { getProductById } from '@/lib/db-queries'

 type Props = {
   params: Promise<{ id: string }>
 }

+export const dynamic = 'force-dynamic'
+
 export async function generateMetadata({ params }: Props) {
   const { id } = await params
-  const product = products.find((p) => p.id === id)
+  const product = await getProductById(id)

   if (!product) {
     return {
@@ -27,7 +29,7 @@ export async function generateMetadata({ params }: Props) {

 export default async function ProductPage({ params }: Props) {
   const { id } = await params
-  const product = products.find((p) => p.id === id)
+  const product = await getProductById(id)

   if (!product) {
     notFound()
```

### الملف: `components/ai-chat-widget.tsx`
الاختلافات (Diff):
```diff
diff --git a/./components/ai-chat-widget.tsx b/tmp/repos/alabrar.online/components/ai-chat-widget.tsx
index de3f7f4..26520d6 100644
--- a/./components/ai-chat-widget.tsx
+++ b/tmp/repos/alabrar.online/components/ai-chat-widget.tsx
@@ -46,7 +46,7 @@ export function AIChatWidget() {
         'يمكنني مساعدتك في البحث عن قطع الغيار المناسبة لسيارتك. ما هو موديل سيارتك؟',
         'لدينا مجموعة واسعة من قطع الغيار لسيارات MG و Chery و Geely. هل تبحث عن قطعة محددة؟',
         'يمكنك تصفح الكتالوج أو إخباري برقم القطعة للبحث مباشرة.',
-        'نوفر شحن مجاني للطلبات فوق 500 ريال. هل تريد معرفة المزيد عن سياسة الشحن؟',
+        'نوفر شحن مجاني للطلبات فوق 1000 جنيه. هل تريد معرفة المزيد عن سياسة الشحن؟',
       ]
       const assistantMessage: Message = {
         id: (Date.now() + 1).toString(),
```

### الملف: `components/catalog-content.tsx`
الاختلافات (Diff):
```diff
diff --git a/./components/catalog-content.tsx b/tmp/repos/alabrar.online/components/catalog-content.tsx
index 3de86d4..b4538fe 100644
--- a/./components/catalog-content.tsx
+++ b/tmp/repos/alabrar.online/components/catalog-content.tsx
@@ -11,9 +11,14 @@ import { Slider } from '@/components/ui/slider'
 import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
 import { Separator } from '@/components/ui/separator'
 import { ProductCard } from '@/components/product-card'
-import { products, brands, categories } from '@/lib/data'
+import { products as staticProducts, brands, categories } from '@/lib/data'
+import type { Product } from '@/lib/types'

-export function CatalogContent() {
+interface CatalogContentProps {
+  initialProducts?: Product[]
+}
+
+export function CatalogContent({ initialProducts }: CatalogContentProps) {
   const searchParams = useSearchParams()
   const initialBrand = searchParams.get('brand')
   const initialCategory = searchParams.get('category')
@@ -28,8 +33,10 @@ export function CatalogContent() {
   const [inStockOnly, setInStockOnly] = useState(false)
   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

+  const productsList = initialProducts || staticProducts
+
   const filteredProducts = useMemo(() => {
-    return products.filter((product) => {
+    return productsList.filter((product) => {
       const brandMatch =
         selectedBrands.length === 0 ||
         selectedBrands.includes(product.brand.toLowerCase())
```

### الملف: `components/featured-products.tsx`
الاختلافات (Diff):
```diff
diff --git a/./components/featured-products.tsx b/tmp/repos/alabrar.online/components/featured-products.tsx
index 860c153..8a1da39 100644
--- a/./components/featured-products.tsx
+++ b/tmp/repos/alabrar.online/components/featured-products.tsx
@@ -5,10 +5,26 @@ import Link from 'next/link'
 import { ArrowLeft } from 'lucide-react'
 import { Button } from '@/components/ui/button'
 import { ProductCard } from './product-card'
-import { products } from '@/lib/data'
+import { useEffect, useState } from 'react'
+import type { Product } from '@/lib/types'

-export function FeaturedProducts() {
-  const featuredProducts = products.filter((p) => p.inStock).slice(0, 8)
+interface FeaturedProductsProps {
+  initialProducts?: Product[]
+}
+
+export function FeaturedProducts({ initialProducts }: FeaturedProductsProps) {
+  const [products, setProducts] = useState<Product[]>(initialProducts || []);
+
+useEffect(() => {
+  if (!initialProducts) {
+    fetch('/api/products?featured=true&limit=8')
+      .then((res) => res.json())
+      .then((data) => setProducts(data))
+      .catch(() => setProducts([]));
+  }
+}, [initialProducts]);
+
+const featuredProducts = products.filter((p) => p.inStock).slice(0, 8);

   return (
     <section className="py-20">
@@ -17,7 +33,7 @@ export function FeaturedProducts() {
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
-          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
+          className="flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-6 mb-12"
         >
           <div>
             <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
```

### الملف: `components/footer.tsx`
الاختلافات (Diff):
```diff
diff --git a/./components/footer.tsx b/tmp/repos/alabrar.online/components/footer.tsx
index be40cb2..dfe9667 100644
--- a/./components/footer.tsx
+++ b/tmp/repos/alabrar.online/components/footer.tsx
@@ -1,11 +1,41 @@
 import Link from 'next/link'
-import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
+import { Phone, Mail, MapPin, MessageCircle, Clock, Navigation } from 'lucide-react'
 import { brands, categories } from '@/lib/data'

 export function Footer() {
   return (
     <footer className="bg-navy border-t border-border">
       <div className="container mx-auto px-4 py-16">
+        {/* Google Maps Section */}
+        <div className="mb-12">
+          <div className="flex items-center gap-3 mb-6">
+            <Navigation className="w-6 h-6 text-primary" />
+            <h4 className="font-bold text-foreground text-xl">موقعنا</h4>
+          </div>
+          <div className="glass-panel rounded-2xl overflow-hidden">
+            <div className="relative w-full h-[300px] bg-muted">
+              <iframe
+                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.8732927381225!2d31.292948200000012!3d30.126439000000026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815581e8116a3%3A0xd522562184d87ad2!2z2KfZhNin2KjYsdin2LEg2YTZgti32Lkg2LrZitin2LEg2KfZhNiz2YrYp9ix2KfYqiDYp9mE2LXZitmG2Yo!5e0!3m2!1sar!2seg!4v1780594704516!5m2!1sar!2seg"
+                width="100%"
+                height="100%"
+                style={{ border: 0 }}
+                allowFullScreen
+                loading="lazy"
+                referrerPolicy="no-referrer-when-downgrade"
+                className="absolute inset-0"
+                title="موقع شركة الأبرار"
+              />
+              {/* Fallback skeleton */}
+              <div className="absolute inset-0 bg-muted flex items-center justify-center -z-10">
+                <div className="text-center text-muted-foreground">
+                  <MapPin className="w-12 h-12 mx-auto mb-2" />
+                  <p>جاري تحميل الخريطة...</p>
+                </div>
+              </div>
+            </div>
+          </div>
+        </div>
+
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {/* About */}
           <div>
@@ -23,7 +53,7 @@ export function Footer() {
             </p>
             <div className="flex gap-4">
... (تم قطع باقي الفروقات نظرًا لطولها)
```

### الملف: `components/header.tsx`
الاختلافات (Diff):
```diff
diff --git a/./components/header.tsx b/tmp/repos/alabrar.online/components/header.tsx
index 792808a..c48c81d 100644
--- a/./components/header.tsx
+++ b/tmp/repos/alabrar.online/components/header.tsx
@@ -42,14 +42,14 @@ export function Header() {
           <div className="flex items-center justify-between h-10 text-sm">
             <div className="flex items-center gap-6">
               <a
-                href="tel:+966500000000"
+                href="tel:+201114449585"
                 className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
               >
                 <Phone className="w-4 h-4" />
-                <span>+966 50 000 0000</span>
+                <span>+20 111 444 9585</span>
               </a>
               <a
-                href="https://wa.me/966500000000"
+                href="https://wa.me/201114449585"
                 className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
               >
                 <MessageCircle className="w-4 h-4" />
@@ -57,7 +57,7 @@ export function Header() {
               </a>
             </div>
             <div className="hidden md:flex items-center gap-4 text-muted-foreground">
-              <span>شحن مجاني للطلبات فوق 500 ريال</span>
+              <span>توصيل لجميع محافظات جمهورية مصر العربية</span>
             </div>
           </div>
         </div>
@@ -103,7 +103,7 @@ export function Header() {
                     {brands.map((brand) => (
                       <Link
                         key={brand.id}
-                        href={`/catalog?brand=${brand.id}`}
+                        href={`/brands/${brand.id}`}
                         className="block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                       >
                         {brand.nameAr}
@@ -139,6 +139,22 @@ export function Header() {
               >
                 جميع المنتجات
               </Link>
+
+              <Link
+                href="/blog"
+                className="text-foreground hover:text-primary transition-colors font-medium"
+              >
+                المدونة
... (تم قطع باقي الفروقات نظرًا لطولها)
```

### الملف: `components/hero.tsx`
الاختلافات (Diff):
```diff
diff --git a/./components/hero.tsx b/tmp/repos/alabrar.online/components/hero.tsx
index 6edeb3c..e7e4d52 100644
--- a/./components/hero.tsx
+++ b/tmp/repos/alabrar.online/components/hero.tsx
@@ -5,6 +5,8 @@ import Link from 'next/link'
 import { ArrowLeft, Shield, Truck, Headphones } from 'lucide-react'
 import { Button } from '@/components/ui/button'

+const phoneNumber = '201114449585'
+
 export function Hero() {
   return (
     <section className="relative min-h-[90vh] flex items-center overflow-hidden">
@@ -52,7 +54,7 @@ export function Hero() {
             </h1>

             <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
-              نوفر لكم أفضل قطع الغيار الأصلية لسيارات MG و Chery و Geely مع ضمان الجودة وخدمة توصيل سريعة لجميع مناطق المملكة.
+              نوفر لكم أفضل قطع الغيار الأصلية لسيارات MG و Chery و Geely مع ضمان الجودة وخدمة توصيل سريعة لجميع محافظات جمهورية مصر العربية.
             </p>

             <div className="flex flex-wrap gap-4 mb-12">
@@ -72,7 +74,7 @@ export function Hero() {
                 size="lg"
                 className="h-14 px-8 border-primary/30 text-foreground hover:bg-primary/10 hover:text-primary"
               >
-                <a href="https://wa.me/966500000000">
+                <a href="https://wa.me/201114449585">
                   تواصل معنا
                 </a>
               </Button>
```

### الملف: `components/product-card.tsx`
الاختلافات (Diff):
```diff
diff --git a/./components/product-card.tsx b/tmp/repos/alabrar.online/components/product-card.tsx
index e699888..9df0cf2 100644
--- a/./components/product-card.tsx
+++ b/tmp/repos/alabrar.online/components/product-card.tsx
@@ -3,10 +3,11 @@
 import { motion } from 'framer-motion'
 import Image from 'next/image'
 import Link from 'next/link'
-import { Star, ShoppingCart, Eye } from 'lucide-react'
+import { Star, ShoppingCart, Eye, MessageCircle } from 'lucide-react'
 import { Button } from '@/components/ui/button'
 import { Badge } from '@/components/ui/badge'
 import { useCartStore } from '@/lib/cart-store'
+import { formatPrice, isPriceAvailable, generateWhatsAppUrl } from '@/lib/format-price'
 import type { Product } from '@/lib/types'

 interface ProductCardProps {
@@ -124,18 +125,41 @@ export function ProductCard({ product, index = 0 }: ProductCardProps) {
           </div>

           {/* Price */}
-          <div className="flex items-center justify-between">
+          <div className="flex items-center justify-between mb-4">
             <div>
-              <span className="text-xl font-bold text-primary">
-                {product.price.toLocaleString()} ر.س
-              </span>
-              {product.originalPrice && (
-                <span className="text-sm text-muted-foreground line-through mr-2">
-                  {product.originalPrice.toLocaleString()}
-                </span>
+              {isPriceAvailable(product.price) ? (
+                <>
+                  <span className="text-xl font-bold text-primary">
+                    {formatPrice(product.price)}
+                  </span>
+                  {product.originalPrice && (
+                    <span className="text-sm text-muted-foreground line-through mr-2">
+                      {formatPrice(product.originalPrice)}
+                    </span>
+                  )}
+                </>
+              ) : (
+                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
+                  اتصل للسعر
+                </Badge>
               )}
             </div>
           </div>
+
... (تم قطع باقي الفروقات نظرًا لطولها)
```

### الملف: `components/product-details.tsx`
الاختلافات (Diff):
```diff
diff --git a/./components/product-details.tsx b/tmp/repos/alabrar.online/components/product-details.tsx
index 524f1a5..8cc2166 100644
--- a/./components/product-details.tsx
+++ b/tmp/repos/alabrar.online/components/product-details.tsx
@@ -15,12 +15,14 @@ import {
   Plus,
   Minus,
   Check,
-  ChevronRight
+  ChevronRight,
+  MessageCircle
 } from 'lucide-react'
 import { Button } from '@/components/ui/button'
 import { Badge } from '@/components/ui/badge'
 import { Separator } from '@/components/ui/separator'
 import { useCartStore } from '@/lib/cart-store'
+import { formatPrice, isPriceAvailable, generateWhatsAppUrl } from '@/lib/format-price'
 import type { Product } from '@/lib/types'

 interface ProductDetailsProps {
@@ -125,13 +127,21 @@ export function ProductDetails({ product }: ProductDetailsProps) {

             {/* Price */}
             <div className="flex items-baseline gap-4">
-              <span className="text-4xl font-bold text-primary">
-                {product.price.toLocaleString()} ر.س
-              </span>
-              {product.originalPrice && (
-                <span className="text-xl text-muted-foreground line-through">
-                  {product.originalPrice.toLocaleString()} ر.س
-                </span>
+              {isPriceAvailable(product.price) ? (
+                <>
+                  <span className="text-4xl font-bold text-primary">
+                    {formatPrice(product.price)}
+                  </span>
+                  {product.originalPrice && (
+                    <span className="text-xl text-muted-foreground line-through">
+                      {formatPrice(product.originalPrice)}
+                    </span>
+                  )}
+                </>
+              ) : (
+                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
+                  اتصل للسعر
+                </Badge>
               )}
             </div>

@@ -197,13 +207,27 @@ export function ProductDetails({ product }: ProductDetailsProps) {
... (تم قطع باقي الفروقات نظرًا لطولها)
```

### الملف: `lib/types.ts`
الاختلافات (Diff):
```diff
diff --git a/./lib/types.ts b/tmp/repos/alabrar.online/lib/types.ts
index 9f799c3..99a4676 100644
--- a/./lib/types.ts
+++ b/tmp/repos/alabrar.online/lib/types.ts
@@ -27,4 +27,25 @@ export interface Brand {
   nameAr: string
   logo: string
   models: string[]
+  description?: string
+  descriptionAr?: string
+  heroImage?: string
+}
+
+export interface BlogArticle {
+  slug: string
+  title: string
+  titleAr: string
+  excerpt: string
+  excerptAr: string
+  content: string
+  contentAr: string
+  category: 'maintenance' | 'news' | 'tips' | 'reviews'
+  categoryAr: string
+  thumbnail: string
+  heroImage: string
+  author: string
+  authorAr: string
+  date: string
+  readTime: number
 }
```

### الملف: `next-env.d.ts`
الاختلافات (Diff):
```diff
diff --git a/./next-env.d.ts b/tmp/repos/alabrar.online/next-env.d.ts
index c4b7818..9edff1c 100644
--- a/./next-env.d.ts
+++ b/tmp/repos/alabrar.online/next-env.d.ts
@@ -1,6 +1,6 @@
 /// <reference types="next" />
 /// <reference types="next/image-types/global" />
-import "./.next/dev/types/routes.d.ts";
+import "./.next/types/routes.d.ts";

 // NOTE: This file should not be edited
 // see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

### الملف: `package.json`
الاختلافات (Diff):
```diff
diff --git a/./package.json b/tmp/repos/alabrar.online/package.json
index d42b520..51b80a3 100644
--- a/./package.json
+++ b/tmp/repos/alabrar.online/package.json
@@ -16,6 +16,7 @@
     "framer-motion": "^12.40.0",
     "lucide-react": "^1.16.0",
     "next": "16.2.6",
+    "pg": "^8.21.0",
     "react": "^19",
     "react-dom": "^19",
     "shadcn": "^4.8.0",
@@ -26,10 +27,11 @@
   "devDependencies": {
     "@tailwindcss/postcss": "^4.2.0",
     "@types/node": "^24",
+    "@types/pg": "^8.20.0",
     "@types/react": "^19",
     "@types/react-dom": "^19",
     "postcss": "^8.5",
     "tailwindcss": "^4.2.0",
     "typescript": "5.7.3"
   }
-}
\ No newline at end of file
+}
```
