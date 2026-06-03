'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from './product-card'
import { products } from '@/lib/data'

export function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.inStock).slice(0, 8)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              منتجات <span className="gold-gradient-text">مميزة</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              اكتشف أفضل قطع الغيار المتوفرة لدينا بأسعار تنافسية وجودة عالية
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary/30 text-foreground hover:bg-primary/10 hover:text-primary group"
          >
            <Link href="/catalog">
              عرض الكل
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
