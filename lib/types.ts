export interface Product {
  id: string
  name: string
  nameAr: string
  brand: 'MG' | 'Chery' | 'Geely'
  category: string
  categoryAr: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
  partNumber: string
  description: string
  descriptionAr: string
  specifications?: Record<string, string>
}

export interface CartItem extends Product {
  quantity: number
}

export interface Brand {
  id: string
  name: string
  nameAr: string
  logo: string
  models: string[]
  description?: string
  descriptionAr?: string
  heroImage?: string
}

export interface BlogArticle {
  slug: string
  title: string
  titleAr: string
  excerpt: string
  excerptAr: string
  content: string
  contentAr: string
  category: 'maintenance' | 'news' | 'tips' | 'reviews'
  categoryAr: string
  thumbnail: string
  heroImage: string
  author: string
  authorAr: string
  date: string
  readTime: number
}
