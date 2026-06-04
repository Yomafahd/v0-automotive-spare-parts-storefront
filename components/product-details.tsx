'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Plus,
  Minus,
  Check,
  ChevronRight,
  MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice, isPriceAvailable, generateWhatsAppUrl } from '@/lib/format-price'
import type { Product } from '@/lib/types'

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem, openCart } = useCartStore()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    openCart()
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <ChevronRight className="w-4 h-4 rotate-180" />
          <Link href="/catalog" className="hover:text-primary transition-colors">
            المنتجات
          </Link>
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span className="text-foreground">{product.nameAr}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-panel">
              <Image
                src={product.image}
                alt={product.nameAr}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-lg px-4 py-2">
                  -{discount}%
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Brand & Category */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-primary/30 text-primary">
                {product.brand}
              </Badge>
              <span className="text-sm text-muted-foreground">{product.categoryAr}</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {product.nameAr}
            </h1>

            {/* Part Number */}
            <p className="text-muted-foreground">
              رقم القطعة: <span className="text-foreground font-mono">{product.partNumber}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-primary text-primary'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-foreground font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} تقييم)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              {isPriceAvailable(product.price) ? (
                <>
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </>
              ) : (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                  اتصل للسعر
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-medium">متوفر في المخزن</span>
                </>
              ) : (
                <span className="text-destructive font-medium">غير متوفر حالياً</span>
              )}
            </div>

            <Separator className="bg-border" />

            {/* Description */}
            <div>
              <h3 className="font-bold text-foreground mb-2">الوصف</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.descriptionAr}
              </p>
            </div>

            <Separator className="bg-border" />

            {/* Quantity & Add to Cart */}
            {product.inStock && (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 glass-panel rounded-xl px-4 py-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 text-foreground hover:text-primary hover:bg-accent"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-bold text-foreground">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 text-foreground hover:text-primary hover:bg-accent"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold gold-glow"
                >
                  <ShoppingCart className="w-5 h-5 ml-2" />
                  أضف للسلة
                </Button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                asChild
                size="lg"
                className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                <a
                  href={generateWhatsAppUrl(product.nameAr)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 ml-2" />
                  استفسر عبر واتساب
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-accent"
              >
                <Heart className="w-5 h-5 ml-2" />
                المفضلة
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-accent"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <Separator className="bg-border" />

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">شحن سريع</p>
                  <p className="text-xs text-muted-foreground">2-5 أيام عمل</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">ضمان الجودة</p>
                  <p className="text-xs text-muted-foreground">قطع أصلية 100%</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">سهولة الإرجاع</p>
                  <p className="text-xs text-muted-foreground">خلال 14 يوم</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
