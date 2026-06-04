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
}

export function BlogArticleContent({ article, relatedArticles }: BlogArticleContentProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.titleAr}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Breadcrumb */}
        <div className="absolute top-8 right-0 left-0">
          <div className="container mx-auto px-4">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm"
            >
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                الرئيسية
              </Link>
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                المدونة
              </Link>
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground truncate max-w-[200px]">
                {article.titleAr}
              </span>
            </motion.nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <div className="glass-panel rounded-2xl p-8 md:p-12">
              {/* Category Badge */}
              <Badge
                variant="outline"
                className={`${categoryColors[article.category]} mb-6`}
              >
                <Tag className="w-3 h-3 ml-1" />
                {article.categoryAr}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {article.titleAr}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  {article.authorAr}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {new Date(article.date).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {article.readTime} دقائق قراءة
                </span>
              </div>

              <Separator className="mb-8 bg-border" />

              {/* Article Content */}
              <div className="prose prose-invert prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-primary
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-foreground
                prose-ul:text-muted-foreground prose-ul:my-4 prose-ul:mr-6
                prose-li:mb-2
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              ">
                {article.contentAr.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-3xl font-bold text-foreground mt-8 mb-4">
                        {paragraph.replace('# ', '')}
                      </h1>
                    )
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-primary mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <li key={index} className="text-muted-foreground mr-6 mb-2">
                        {paragraph.replace('- ', '')}
                      </li>
                    )
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    )
                  }
                  return null
                })}
              </div>

              {/* Back to Blog */}
              <Separator className="my-8 bg-border" />
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                <ArrowRight className="w-5 h-5" />
                العودة إلى المدونة
              </Link>
            </div>
          </motion.article>

          {/* Sidebar - Related Articles */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-80 lg:sticky lg:top-24 lg:self-start"
          >
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                مقالات ذات صلة
              </h3>

              <div className="space-y-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block"
                  >
                    <div className="flex gap-4 p-3 rounded-xl hover:bg-accent/50 transition-colors">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={related.thumbnail}
                          alt={related.titleAr}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge
                          variant="outline"
                          className={`${categoryColors[related.category]} text-xs mb-2`}
                        >
                          {related.categoryAr}
                        </Badge>
                        <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {related.titleAr}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {related.readTime} دقائق قراءة
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {relatedArticles.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-4">
                  لا توجد مقالات ذات صلة
                </p>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
