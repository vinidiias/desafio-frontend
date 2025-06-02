import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { ProductTable } from "./components/ProductTable";
import { getCategories, getProducts } from "./services/productService";

export default function Products() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <div className="py-5 px-5 w-full">
      <div className="flex flex-col gap-5 py-5 w-full h-full">
        <h1 className="text-2xl font-medium text-center">Lista de Produtos</h1>
        <Suspense
          fallback={
            <div className="m-auto">
              <CircularProgress size={40} color="inherit" />
            </div>
          }
        >
          <div className="mx-auto max-w-full h-full">
            <h2 className="text-xl max-[580px]:text-center font-bold mb-2 max-[480px]:hidden">Produtos</h2>
            <ProductTable products={products} categories={categories} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
