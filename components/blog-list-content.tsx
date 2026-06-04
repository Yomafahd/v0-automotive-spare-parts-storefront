'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { blogArticles, blogCategories } from '@/lib/blog-data'

const categoryColors: Record<string, string> = {
  maintenance: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  news: 'bg-green-500/20 text-green-400 border-green-500/30',
  tips: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  reviews: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

export function BlogListContent() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredArticles = activeCategory === 'all'
    ? blogArticles
    : blogArticles.filter((article) => article.category === activeCategory)

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gold-gradient-text">المدونة</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نصائح الصيانة، أخبار السيارات، ومراجعات شاملة لمساعدتك في الحفاظ على سيارتك
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {blogCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className={
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'border-primary/30 text-foreground hover:bg-primary/10 hover:text-primary'
              }
            >
              {category.nameAr}
            </Button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${article.slug}`}>
                <div className="glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 h-full flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.thumbnail}
                      alt={article.titleAr}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="outline"
                        className={`${categoryColors[article.category]} backdrop-blur-sm`}
                      >
                        <Tag className="w-3 h-3 ml-1" />
                        {article.categoryAr}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString('ar-SA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime} دقائق قراءة
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.titleAr}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                      {article.excerptAr}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                      <span>اقرأ المزيد</span>
                      <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">
              لا توجد مقالات في هذا التصنيف حاليًا
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
