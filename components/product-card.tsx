'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [mounted, setMounted] = useState(false)
  const { addItem, openCart } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = () => {
    if (!mounted) return
    addItem(product)
    openCart()
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-navy-light">
          <Image
            src={product.image}
            alt={product.nameAr}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {discount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                -{discount}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                غير متوفر
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/90 hover:bg-background text-foreground"
                asChild
              >
                <Link href={`/product/${product.id}`}>
                  <Eye className="w-4 h-4 ml-2" />
                  عرض
                </Link>
              </Button>
              {product.inStock && (
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <ShoppingCart className="w-4 h-4 ml-2" />
                  أضف
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Brand & Category */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              {product.brand}
            </Badge>
            <span className="text-xs text-muted-foreground">{product.categoryAr}</span>
          </div>

          {/* Name */}
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-foreground line-clamp-2 mb-2 hover:text-primary transition-colors">
              {product.nameAr}
            </h3>
          </Link>

          {/* Part Number */}
          <p className="text-xs text-muted-foreground mb-3">{product.partNumber}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-primary">
                {product.price.toLocaleString()} ر.س
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through mr-2">
                  {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
