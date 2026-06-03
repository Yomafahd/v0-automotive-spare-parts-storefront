import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductDetails } from '@/components/product-details'
import { AIChatWidget } from '@/components/ai-chat-widget'
import { products } from '@/lib/data'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  
  if (!product) {
    return {
      title: 'منتج غير موجود | الأبرار لقطع غيار السيارات',
    }
  }

  return {
    title: `${product.nameAr} | الأبرار لقطع غيار السيارات`,
    description: product.descriptionAr,
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <ProductDetails product={product} />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  )
}
