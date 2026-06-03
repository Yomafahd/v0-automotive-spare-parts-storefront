import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { BrandSlider } from '@/components/brand-slider'
import { FeaturedProducts } from '@/components/featured-products'
import { Footer } from '@/components/footer'
import { AIChatWidget } from '@/components/ai-chat-widget'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandSlider />
        <FeaturedProducts />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  )
}
