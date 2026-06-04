'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Phone, 
  MessageCircle,
  ChevronDown 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useCartStore } from '@/lib/cart-store'
import { brands, categories } from '@/lib/data'
import { CartDrawer } from './cart-drawer'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { getTotalItems, openCart } = useCartStore()
  const totalItems = mounted ? getTotalItems() : 0

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <a 
                href="tel:+966500000000" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+966 50 000 0000</span>
              </a>
              <a 
                href="https://wa.me/966500000000" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-4 text-muted-foreground">
              <span>شحن مجاني للطلبات فوق 500 ريال</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-panel shadow-lg shadow-black/20' 
            : 'bg-background/80 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-gold-light flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">أ</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold gold-gradient-text">الأبرار</h1>
                <p className="text-xs text-muted-foreground">لقطع غيار السيارات</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                الرئيسية
              </Link>
              
              <div className="group relative">
                <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
                  الماركات
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="glass-panel rounded-xl p-4 min-w-[200px]">
                    {brands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={`/catalog?brand=${brand.id}`}
                        className="block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                      >
                        {brand.nameAr}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group relative">
                <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
                  التصنيفات
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="glass-panel rounded-xl p-4 min-w-[200px]">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/catalog?category=${category.id}`}
                        className="block px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                      >
                        {category.nameAr}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link 
                href="/catalog" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                جميع المنتجات
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 250, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="relative">
                      <Input
                        placeholder="ابحث عن قطع الغيار..."
                        className="bg-input border-border pr-4 pl-10"
                        autoFocus
                      />
                      <button
                        onClick={() => setSearchOpen(false)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(true)}
                    className="text-foreground hover:text-primary hover:bg-accent"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                )}
              </AnimatePresence>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative text-foreground hover:text-primary hover:bg-accent"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -left-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Button>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-foreground hover:text-primary hover:bg-accent"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="right" className="w-80 glass-panel border-border">
                  <div className="flex flex-col gap-6 mt-8">
                    <Link 
                      href="/" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      الرئيسية
                    </Link>
                    
                    <div>
                      <h3 className="text-primary font-bold mb-3">الماركات</h3>
                      {brands.map((brand) => (
                        <Link
                          key={brand.id}
                          href={`/catalog?brand=${brand.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                        >
                          {brand.nameAr}
                        </Link>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-primary font-bold mb-3">التصنيفات</h3>
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/catalog?category=${category.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                        >
                          {category.nameAr}
                        </Link>
                      ))}
                    </div>

                    <Link 
                      href="/catalog" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      جميع المنتجات
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
