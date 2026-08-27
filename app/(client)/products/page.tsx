"use client";
import { useProducts } from "@/app/features/products/hooks/useProducts";
import {
  ProductButtonModal,
  ProductTable,
  ProductPagination,
  ProductFilter,
} from "@/app/features/products/components";
import { useRequirePermission } from "@/app/features/auth/hooks/usePermise";
import Loading from "@/app/shared/components/Loading";
import { useInitialLoading } from "@/app/features/auth/hooks/useInitialLoading";

function Page() {
  const blocked = useRequirePermission([1, 2]);
  const { info, results, getAllProducts, resetDataProduct } = useProducts();

  const initialLoading = useInitialLoading(
    getAllProducts,
    resetDataProduct,
    !blocked,
  );

  if (blocked) return null;

  if (initialLoading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <ProductFilter />
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de productos</h1>
        <ProductButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1 mt-2">
        <ProductTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <ProductPagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
