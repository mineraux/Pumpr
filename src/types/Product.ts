enum ProductCategory {
  proteins = 'proteins',
  carbs = 'carbs',
  lipids = 'lipids'
}

type Product = {
  id: string
  name: string
  category: ProductCategory
  proteins: number
  carbs: number
  lipids: number
  cals: number
}

type CategoryChoice = [string, string]

export { Product, ProductCategory, CategoryChoice }
