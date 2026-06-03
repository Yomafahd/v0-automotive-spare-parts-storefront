'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { ProductCard } from '@/components/product-card'
import { products, brands, categories } from '@/lib/data'

export function CatalogContent() {
  const searchParams = useSearchParams()
  const initialBrand = searchParams.get('brand')
  const initialCategory = searchParams.get('category')

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : []
  )
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand.toLowerCase())
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1]
      const stockMatch = !inStockOnly || product.inStock

      return brandMatch && categoryMatch && priceMatch && stockMatch
    })
  }, [selectedBrands, selectedCategories, priceRange, inStockOnly])

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    )
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setPriceRange([0, 1000])
    setInStockOnly(false)
  }

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000 ||
    inStockOnly

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <X className="w-4 h-4 ml-2" />
          مسح الفلاتر
        </Button>
      )}

      {/* Brands */}
      <div>
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <ChevronDown className="w-4 h-4" />
          الماركات
        </h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center gap-3">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor={`brand-${brand.id}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {brand.nameAr}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Categories */}
      <div>
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <ChevronDown className="w-4 h-4" />
          التصنيفات
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {category.nameAr}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <ChevronDown className="w-4 h-4" />
          نطاق السعر
        </h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={1000}
            step={10}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0]} ر.س</span>
            <span>{priceRange[1]} ر.س</span>
          </div>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* In Stock Only */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <Label
          htmlFor="in-stock"
          className="text-sm text-foreground cursor-pointer"
        >
          متوفر في المخزن فقط
        </Label>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              جميع <span className="gold-gradient-text">المنتجات</span>
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} منتج
              {hasActiveFilters && ' (تم التصفية)'}
            </p>
          </div>

          {/* Mobile Filter Button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="lg:hidden border-primary/30 text-foreground"
              >
                <SlidersHorizontal className="w-4 h-4 ml-2" />
                الفلاتر
                {hasActiveFilters && (
                  <span className="mr-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {selectedBrands.length + selectedCategories.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 glass-panel border-border">
              <h2 className="font-bold text-lg text-foreground mb-6">الفلاتر</h2>
              <FiltersContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters Pills */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {selectedBrands.map((brandId) => {
              const brand = brands.find((b) => b.id === brandId)
              return (
                <span
                  key={brandId}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {brand?.nameAr}
                  <button onClick={() => toggleBrand(brandId)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )
            })}
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId)
              return (
                <span
                  key={categoryId}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {category?.nameAr}
                  <button onClick={() => toggleCategory(categoryId)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )
            })}
          </motion.div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="glass-panel rounded-2xl p-6 sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg text-foreground">الفلاتر</h2>
              </div>
              <FiltersContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  لا توجد منتجات
                </h3>
                <p className="text-muted-foreground mb-4">
                  جرب تغيير الفلاتر للحصول على نتائج أكثر
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-primary/30 text-foreground hover:bg-primary/10"
                >
                  مسح الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
