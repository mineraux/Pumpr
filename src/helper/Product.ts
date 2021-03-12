import { Product, ProductCategory } from '@/types/Product'

const getProductByCategory = (
  productList: Product[],
  category: ProductCategory
): Product[] => {
  return productList.filter(product => product.category === category)
}

export { getProductByCategory }
