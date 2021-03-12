import { Product, ProductCategory } from '@/types/Product'
import { getProductByCategory } from './Product'

const getCascaderOptions = (
  productList: Product[],
  category: ProductCategory
) => {
  return getProductByCategory(productList, category).map((product: Product) => {
    return {
      value: product.id,
      label: product.name
    }
  })
}

export { getCascaderOptions }
