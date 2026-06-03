import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CatalogContent } from '@/components/catalog-content'
import { AIChatWidget } from '@/components/ai-chat-widget'

export const metadata = {
  title: 'جميع المنتجات | الأبرار لقطع غيار السيارات',
  description: 'تصفح مجموعتنا الكاملة من قطع غيار السيارات الصينية الأصلية',
}

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <CatalogContent />
        </Suspense>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  )
}
