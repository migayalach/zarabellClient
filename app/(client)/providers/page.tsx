"use client";
import {
  ProviderButtonModal,
  ProviderPagination,
  ProviderTable,
} from "@/app/features/providers/components";
import { useProviders } from "@/app/features/providers/hooks/useProvides";
import { useRequirePermission } from "@/app/features/auth/hooks/usePermise";
import Loading from "@/app/shared/components/Loading";
import { useInitialLoading } from "@/app/features/auth/hooks/useInitialLoading";

function Page() {
  const blocked = useRequirePermission([1, 2]);
  const { info, results, getAllProviders, resetDataProvider } = useProviders();
  const initialLoading = useInitialLoading(
    getAllProviders,
    resetDataProvider,
    !blocked,
  );

  if (blocked) return null;

  if (initialLoading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de Proveedores</h1>
        <ProviderButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1 mt-2">
        <ProviderTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <ProviderPagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
