import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { AIChatWidget } from '@/components/ai-chat-widget'
import { BrandLanding } from '@/components/brand-landing'
import { brands } from '@/lib/data'

export const metadata: Metadata = {
  title: 'قطع غيار جيلي الأصلية | الأبرار لقطع غيار السيارات',
  description: 'تسوق قطع غيار جيلي الأصلية - Coolray، Emgrand، Azkarra والمزيد. جودة عالية وأسعار تنافسية في السعودية.',
}

export default function GeelyBrandPage() {
  const geelyBrand = brands.find((b) => b.id === 'geely')!

  return (
    <>
      <Header />
      <main className="pt-20">
        <BrandLanding brand={geelyBrand} />
      </main>
      <Footer />
      <CartDrawer />
      <AIChatWidget />
    </>
  )
}
