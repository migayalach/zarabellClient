"use client";

import {
  OutputButtonModal,
  OutputFilters,
  OutputPagination,
  OutputTable,
} from "@/app/features/outputsInventory/components";
import {
  useOutput,
  useOutputActions,
} from "@/app/features/outputsInventory/hooks";
import Loading from "@/app/shared/components/Loading";
import { useInitialLoading } from "@/app/features/auth/hooks/useInitialLoading";
import FilterDrawer from "@/app/shared/components/FilterDrawer";

function Page() {
  const { getAllOutputs, resetOutput } = useOutputActions();
  const { info, results } = useOutput();

  const initialLoading = useInitialLoading(
    getAllOutputs,
    resetOutput,
  );

  if (initialLoading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[30px] font-bold">Lista de salidas</h1>

        <OutputButtonModal text="Crear" action="create" />
      </div>

      <FilterDrawer title="Filtro de salidas">
        <OutputFilters />
      </FilterDrawer>

      <div className="flex-1 mt-2">
        <OutputTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <OutputPagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;