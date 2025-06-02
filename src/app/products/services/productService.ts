import { Category } from "../types/category";
import { Product, ProductsApiResponse } from "../types/product";

const BASE_URL = 'https://dummyjson.com'

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${BASE_URL}/products/categories?select=name`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${BASE_URL}/products?select=title,category,price,stock,tags`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsApiResponse = await res.json();

  return data.products;
}