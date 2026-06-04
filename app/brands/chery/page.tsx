import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { AIChatWidget } from '@/components/ai-chat-widget'
import { BrandLanding } from '@/components/brand-landing'
import { brands } from '@/lib/data'

export const metadata: Metadata = {
  title: 'قطع غيار شيري الأصلية | الأبرار لقطع غيار السيارات',
  description: 'تسوق قطع غيار شيري الأصلية - Tiggo 7، Tiggo 8، Arrizo 5 والمزيد. جودة عالية وأسعار تنافسية في السعودية.',
}

export default function CheryBrandPage() {
  const cheryBrand = brands.find((b) => b.id === 'chery')!

  return (
    <>
      <Header />
      <main className="pt-20">
        <BrandLanding brand={cheryBrand} />
      </main>
      <Footer />
      <CartDrawer />
      <AIChatWidget />
    </>
  )
}
