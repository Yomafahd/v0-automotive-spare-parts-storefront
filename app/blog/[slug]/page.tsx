import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { AIChatWidget } from '@/components/ai-chat-widget'
import { BlogArticleContent } from '@/components/blog-article-content'
import { getArticleBySlug, getRelatedArticles, blogArticles } from '@/lib/blog-data'

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'مقال غير موجود | الأبرار',
    }
  }

  return {
    title: `${article.titleAr} | الأبرار لقطع غيار السيارات`,
    description: article.excerptAr,
    openGraph: {
      title: article.titleAr,
      description: article.excerptAr,
      images: [article.heroImage],
    },
  }
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(slug, 3)

  return (
    <>
      <Header />
      <main className="pt-20">
        <BlogArticleContent article={article} relatedArticles={relatedArticles} />
      </main>
      <Footer />
      <CartDrawer />
      <AIChatWidget />
    </>
  )
}
