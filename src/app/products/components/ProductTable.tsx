"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

import { use, useEffect, useMemo, useState} from "react";

import { Product } from "@/app/products/types/product";
import { Category } from "@/app/products/types/category";
import { Select } from "@/app/components/Select";
import Input from "@/app/components/Input";
import { Button } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    );
  }
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

interface ProductTableProps {
  products: Promise<Product[]>;
  categories: Promise<Category[]>;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  categories,
}) => {
  const allProducts = use(products);
  const allCategories = use(categories);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );

  const [globalFilter, setGlobalFilter] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = useMemo<ColumnDef<Product, any>[]>(
    () => [
      {
        accessorKey: "id",
        filterFn: "equalsString",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "title",
        header: () => <span>Nome</span>,
        cell: (info) => info.getValue(),
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        accessorFn: (row) => row.category,
        id: "category",
        cell: (info) => info.getValue(),
        header: () => <span>Categoria</span>,
        filterFn: "equals",
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => row.price,
        id: "price",
        header: () => <span>Preço</span>,
        cell: (info) => info.getValue(),
        filterFn: "equals",
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => row.stock,
        id: "stock",
        header: () => <span>Estoque</span>,
        cell: (info) => info.getValue(),
        filterFn: "equals",
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => row.tags,
        id: "tags",
        header: () => <span>Etiquetas</span>,
        cell: (info) => info.getValue().join(" | "),
        filterFn: "includesString",
        enableGlobalFilter: false,
      },
    ],
    []
  );

  const [data] = useState<Product[]>(allProducts);
   const categoryOptions = [
    { label: "All", value: "" }, // Primeira opção: "All", com valor vazio
    ...(Array.isArray(allCategories) // Verifica se allCategories é um array
      ? allCategories.map((cat: Category) => ({ // Mapeia as categorias reais
          label: cat.name, // Ajuste para o nome da categoria real
          value: cat.slug, // Ajuste para o slug da categoria real
        }))
      : []
    ),
  ];

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    if (globalFilter) {
      if (table.getState().sorting[0]?.id !== "title") {
        table.setSorting([{ id: "title", desc: false }]);
      }
    } else {
      table.setSorting([]);
    }
  }, [globalFilter, table]);

  const columnCategory = table
    .getHeaderGroups()[0]
    .headers.filter((head) => head.id === "category")[0];

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-start gap-3 mb-2 max-[580px]:flex-wrap-reverse max-[580px]:justify-center ">
        <div className="flex justify-start max-[580px]:justify-center gap-2 flex-1">
          <Input
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Pesquisar nome"
          />
          {columnCategory.column.getCanFilter() ? (
            <div>
              <Select
                value={(columnCategory.column.getFilterValue() ?? "") as string}
                onChange={(e) =>
                  columnCategory.column.setFilterValue(
                    e.target.value || undefined
                  )
                }
                options={categoryOptions}
              />
            </div>
          ) : null}
        </div>
        <Button
          variant="contained"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"
              />
            </svg>
          }
          className="normal-case text-white bg-[#1F1F1F] hover:text-white"
        >
          Inserir Produto
        </Button>
      </div>
      {allProducts.length > 0 ? (
        <div className="overflow-x-auto rounded-lg px-2 border border-1 border-gray-200 shadow-xs">
          <table className="border-collapse rounded-lg">
            <thead className="border-b border-b-1 border-b-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        className="px-6 py-3 text-left text-sm font-medium text-gray-600 tracking-wider" // AQUI!
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " ↑",
                                desc: " ↓",
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-y-1 divide-gray-200 bg-white">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-10">
          <p className="text-center">Não há produtos cadastrados!</p>
        </div>
      )}
      {allProducts.length > 0 && (
        <div className="flex justify-end max-[580px]:justify-center items-center gap-2 mt-2 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-gray-800">Linhas por página:</span>
            <Select
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              options={[10, 20, 30, 40, 50].map((pageSize) => ({
                label: String(pageSize),
                value: pageSize,
              }))}
              className="col-start-1 row-start-1 grow py-[5.5] pr-7 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 appearance-none custom-scroll"
            />
          </div>
          <div className="flex gap-1 text-gray-800">
            <span>Página</span>
            <span className="font-medium">
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </span>
          </div>
          <div>
            {[
              {
                label: "<<",
                onClick: () => table.setPageIndex(0),
                disabled: !table.getCanPreviousPage(),
              },
              {
                label: "<",
                onClick: () => table.previousPage(),
                disabled: !table.getCanPreviousPage(),
              },
              {
                label: ">",
                onClick: () => table.nextPage(),
                disabled: !table.getCanNextPage(),
              },
              {
                label: ">>",
                onClick: () => table.setPageIndex(table.getPageCount() - 1),
                disabled: !table.getCanNextPage(),
              },
            ].map((btn) => (
              <Button
                onClick={btn.onClick}
                disabled={btn.disabled}
                key={`Button Pagination - ${btn.label}`}
                className="text-gray-600"
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
