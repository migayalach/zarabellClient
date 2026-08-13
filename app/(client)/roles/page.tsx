"use client";
import { useRoles } from "@/app/features/roles/hooks/useRoles";
import {
  RoleButtonModal,
  RolePagination,
  RoleTable,
} from "@/app/features/roles/components";
import { useRequirePermission } from "@/app/features/auth/hooks/usePermise";
import Loading from "@/app/shared/components/Loading";
import { useInitialLoading } from "@/app/features/auth/hooks/useInitialLoading";

function Page() {
  const blocked = useRequirePermission([1, 2]);
  const { info, results, getAllRoles, resetDataRole } = useRoles();
  const initialLoading = useInitialLoading(
    getAllRoles,
    resetDataRole,
    !blocked,
  );

  if (blocked) return null;

  if (initialLoading) return <Loading />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold">Lista de Roles</h1>
        <RoleButtonModal text="Crear" action="create" />
      </div>

      <div className="flex-1 mt-2">
        <RoleTable info={results} />
      </div>

      <div className="flex justify-center mt-6">
        <RolePagination pages={info?.pages ?? 1} />
      </div>
    </div>
  );
}

export default Page;
