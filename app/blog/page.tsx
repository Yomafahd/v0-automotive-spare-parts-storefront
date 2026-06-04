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
      <CartDrawer />
      <AIChatWidget />
    </>
  )
}
