"use client";

import {
  InputRecordButtonModal,
  InputRecodTable,
  InputRecordPagination,
  InputRecordFilter,
} from "@/app/features/inputRecord/components";
import {
  useInputRecord,
  useInputRecordActions,
} from "@/app/features/inputRecord/hooks";
import { useRequirePermission } from "@/app/features/auth/hooks/usePermise";
import Loading from "@/app/shared/components/Loading";
import { useInitialLoading } from "@/app/features/auth/hooks/useInitialLoading";
import FilterDrawer from "@/app/shared/components/FilterDrawer";

function Page() {
  const blocked = useRequirePermission([1, 2]);
  const { info, results } = useInputRecord();
  const { getAllInputRecords, resetInputRecord } = useInputRecordActions();

  const initialLoading = useInitialLoading(
    getAllInputRecords,
    resetInputRecord,
    !blocked,
  );

  if (blocked) return null;

  if (initialLoading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[30px] font-bold">Lista de entradas</h1>

        <InputRecordButtonModal text="Crear" action="create" />
      </div>

      <FilterDrawer title="Filtro de entradas">
        <InputRecordFilter />
      </FilterDrawer>

      <div className="flex-1 mt-2">
        <InputRecodTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <InputRecordPagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;