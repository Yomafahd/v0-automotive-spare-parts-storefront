'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shield, Truck, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(13,27,46,0.8)_0%,_transparent_50%)]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">قطع غيار أصلية 100%</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-foreground">قطع غيار</span>
              <br />
              <span className="gold-gradient-text">السيارات الصينية</span>
              <br />
              <span className="text-foreground">بجودة استثنائية</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              نوفر لكم أفضل قطع الغيار الأصلية لسيارات MG و Chery و Geely مع ضمان الجودة وخدمة توصيل سريعة لجميع مناطق المملكة.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold gold-glow group"
              >
                <Link href="/catalog">
                  تصفح المنتجات
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 border-primary/30 text-foreground hover:bg-primary/10 hover:text-primary"
              >
                <a href="https://wa.me/966500000000">
                  تواصل معنا
                </a>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-foreground font-medium">ضمان الجودة</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-foreground font-medium">توصيل سريع</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Headphones className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-foreground font-medium">دعم 24/7</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse" />
              <div className="absolute inset-8 rounded-full border border-primary/20" />
              <div className="absolute inset-16 rounded-full border border-primary/30" />
              
              {/* Center content */}
              <div className="absolute inset-24 rounded-full glass-panel flex items-center justify-center gold-glow">
                <div className="text-center">
                  <p className="text-6xl font-bold gold-gradient-text mb-2">+5000</p>
                  <p className="text-muted-foreground">قطعة غيار متوفرة</p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 right-10 glass-panel rounded-xl p-4"
              >
                <p className="text-primary font-bold">MG</p>
                <p className="text-xs text-muted-foreground">+800 قطعة</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-20 right-0 glass-panel rounded-xl p-4"
              >
                <p className="text-primary font-bold">Chery</p>
                <p className="text-xs text-muted-foreground">+1200 قطعة</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-10 left-10 glass-panel rounded-xl p-4"
              >
                <p className="text-primary font-bold">Geely</p>
                <p className="text-xs text-muted-foreground">+950 قطعة</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
