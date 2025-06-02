export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  tags: string[]
}

export interface ProductsApiResponse {
  limit: number
  products: Product[]
  skip: number
  total: number
}