# تقرير المقارنة: الريبو الحالي مقابل `alabrar.online`

ريبو `alabrar.online` يشبه الريبو الحالي إلى حد كبير حيث أن كلاهما عبارة عن تطبيق `Next.js` للواجهة الأمامية (Storefront)، لكن `alabrar.online` يحتوي على ميزات إضافية واتصال مباشر بقاعدة البيانات.

## 1. الملفات الخاصة بـ `alabrar.online` (غير الموجودة في الريبو الحالي)

فيما يلي قائمة بأهم الملفات الحصرية في ريبو `alabrar.online` ووظيفة كل منها:

### الملف: `app/api/sync/route.ts`
**الوظيفة:** نقطة نهاية (API Endpoint) تستخدم لتزامن البيانات (Products) بين الخوادم والتأكد من الصلاحيات (Authorization).
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const body = await req.json().catch(() => ({}))

    // Check Authorization
    let token = ''
    if (authHeader) {
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      } else {
        token = authHeader
      }
    } else if (body.password) {
      token = body.password
    } else if (body.sync_token) {
      token = body.sync_token
...
```

### الملف: `lib/db.ts`
**الوظيفة:** ملف اتصال بقاعدة بيانات PostgreSQL باستخدام مكتبة `pg`، يوفر دالة لتنفيذ الاستعلامات.
```typescript
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres2026@127.0.0.1:5432/aios_db'

let pool: Pool | null = null

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: false,
    })
  }
  return pool
}

export async function query(text: string, params?: any[]) {
  const p = getPool()
  return p.query(text, params)
}
...
```

### الملف: `lib/db-queries.ts`
**الوظيفة:** يحتوي على دوال مساعدة للتعامل مع البيانات مثل استنتاج ماركة السيارة والفئات بناءً على الاسم.
```typescript
import { query } from './db'
import { Product } from './types'
import { products as fallbackProducts } from './data'

export function detectBrandFromName(name: string): 'MG' | 'Chery' | 'Geely' {
  const lower = name.toLowerCase()
  if (lower.includes('mg') || name.includes('إم جي') || name.includes('ام جي')) return 'MG'
  if (lower.includes('chery') || name.includes('شيري')) return 'Chery'
  if (lower.includes('geely') || name.includes('جيلي')) return 'Geely'
  return 'MG' // default fallback
}

export function detectCategoryAr(category: string): string {
  const mapping: Record<string, string> = {
    engine: 'قطع المحرك',
    brakes: 'الفرامل',
    suspension: 'نظام التعليق',
    electrical: 'الكهرباء',
    body: 'قطع الهيكل',
    filters: 'الفلاتر',
...
```

### الملف: `app/blog/page.tsx`
**الوظيفة:** صفحة المدونة لعرض مقالات الصيانة والأخبار، وهي ميزة إضافية لموقع الويب (غير موجودة في الريبو الحالي).
```typescript
import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { AIChatWidget } from '@/components/ai-chat-widget'
import { BlogListContent } from '@/components/blog-list-content'

export const metadata: Metadata = {
  title: 'المدونة | الأبرار لقطع غيار السيارات',
  description: 'نصائح الصيانة، أخبار السيارات، ومراجعات شاملة للسيارات الصينية في السعودية',
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <BlogListContent />
      </main>
      <Footer />
...
```

### الملف: `components/blog-article-content.tsx`
**الوظيفة:** مكون الواجهة (Component) لعرض محتوى المقال الفردي في المدونة.
```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, User, ChevronLeft, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { BlogArticle } from '@/lib/types'

interface BlogArticleContentProps {
  article: BlogArticle
  relatedArticles: BlogArticle[]
}

const categoryColors: Record<string, string> = {
  maintenance: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  news: 'bg-green-500/20 text-green-400 border-green-500/30',
  tips: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  reviews: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
...
```

### الملف: `components/brand-landing.tsx`
**الوظيفة:** مكون خاص بالصفحات المقصودة (Landing Pages) للماركات المختلفة.
```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, Award, Wrench, Truck, Star, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { products as staticProducts } from '@/lib/data'
import type { Brand, Product } from '@/lib/types'

interface BrandLandingProps {
  brand: Brand
  initialProducts?: Product[]
}

const brandDescriptions: Record<string, { descriptionAr: string; taglineAr: string }> = {
  mg: {
    taglineAr: 'تراث بريطاني، تقنية حديثة',
    descriptionAr: 'إم جي، العلامة البريطانية العريقة التي تأسست عام 1924، تجمع بين الأناقة الكلاسيكية والتقنيات المتطورة. نوفر لك قطع غيار أصلية تضمن أداءً متميزًا لسيارتك.',
...
```

## 2. نظرة عامة على الاختلافات
- **الاتصال بقاعدة البيانات:** يحتوي `alabrar.online` على ملفات مثل `lib/db.ts` و `lib/db-queries.ts` التي تتصل مباشرة بقاعدة بيانات PostgreSQL لجلب المنتجات.
- **التزامن (Syncing):** يحتوي على نقطة نهاية `api/sync/route.ts` لاستقبال تحديثات المنتجات من خادم خارجي (ربما من ريبو `AIOS-V`).
- **المدونة (Blog):** يحتوي على قسم كامل للمدونة (`app/blog/`) ومقالات لعرض محتوى متعلق بالسيارات.
- **صفحات الماركات (Brand Pages):** يمتلك صفحات مخصصة لكل ماركة (مثل `app/brands/chery/page.tsx` وغيرها).
