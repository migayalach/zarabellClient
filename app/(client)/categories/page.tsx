"use client";
import { useEffect } from "react";
import { useCategory } from "@/app/features/categories/hooks/useCategories";
import {
  CategoryButtonModal,
  CategoryPagination,
  CategoryTable,
} from "@/app/features/categories/components";
import Loading from "@/app/shared/components/Loading";

function Page() {
  const { info, results, getAllCategories, resetDataCategory, loading } =
    useCategory();

  useEffect(() => {
    getAllCategories();

    return () => {
      resetDataCategory();
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de Categorias</h1>
        <CategoryButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1 mt-2">
        <CategoryTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <CategoryPagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
