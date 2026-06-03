'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { brands } from '@/lib/data'

export function BrandSlider() {
  return (
    <section className="py-16 border-y border-border bg-navy/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            ماركات موثوقة نفتخر بتوفير قطع غيارها
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            نوفر قطع غيار أصلية لأشهر العلامات التجارية الصينية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/catalog?brand=${brand.id}`}>
                <div className="glass-panel glass-panel-hover rounded-2xl p-8 text-center transition-all duration-300 group cursor-pointer">
                  {/* Brand Logo Placeholder */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors">
                    <span className="text-3xl font-bold gold-gradient-text">{brand.name}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {brand.nameAr}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {brand.models.length} موديلات متوفرة
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {brand.models.slice(0, 3).map((model) => (
                      <span
                        key={model}
                        className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {model}
                      </span>
                    ))}
                    {brand.models.length > 3 && (
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                        +{brand.models.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
