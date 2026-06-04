export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined || price === 0) {
    return ''
  }
  return `EGP ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function isPriceAvailable(price: number | null | undefined): boolean {
  return price !== null && price !== undefined && price > 0
}

export function generateWhatsAppUrl(productName: string): string {
  const phoneNumber = '201023660666'
  const message = `مرحباً شركة الأبرار (هندسة الثقة)، أستفسر عن القطعة: ${productName}`
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
