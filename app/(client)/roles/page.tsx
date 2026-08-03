"use client";

import { useEffect } from "react";
import { useRoles } from "@/app/features/roles/hooks/useRoles";
import {
  RoleButtonModal,
  RolePagination,
  RoleTable,
} from "@/app/features/roles/components";
import { useRequirePermission } from "@/app/features/auth/hooks/usePermise";
import Loading from "@/app/shared/components/Loading";

function Page() {
  const blocked = useRequirePermission([1, 2]);
  const { info, results, getAllRoles, resetDataRole, loading } = useRoles();

  useEffect(() => {
    if (!blocked) {
      getAllRoles();
    }

    return () => {
      resetDataRole();
    };
  }, [blocked]);

  if (blocked) return null;
  if (loading) return <Loading />;

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
