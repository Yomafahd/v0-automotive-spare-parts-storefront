import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { AIChatWidget } from '@/components/ai-chat-widget'
import { BrandLanding } from '@/components/brand-landing'
import { brands } from '@/lib/data'

export const metadata: Metadata = {
  title: 'قطع غيار إم جي الأصلية | الأبرار لقطع غيار السيارات',
  description: 'تسوق قطع غيار إم جي الأصلية - MG ZS، MG HS، MG 5، MG 6 والمزيد. جودة عالية وأسعار تنافسية في السعودية.',
}

export default function MGBrandPage() {
  const mgBrand = brands.find((b) => b.id === 'mg')!

  return (
    <>
      <Header />
      <main className="pt-20">
        <BrandLanding brand={mgBrand} />
      </main>
      <Footer />
      <CartDrawer />
      <AIChatWidget />
    </>
  )
}
