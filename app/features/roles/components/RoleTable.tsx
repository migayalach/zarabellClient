"use client";
import { Table } from "antd";
import { IRole } from "../types";
import RoleButtonModal from "./RoleButtonModal";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type RoleTableRow = {
  key: number;
  idRole: number;
  nameRole: string;
};

const columnsRoles = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
    width: 70,
  },
  {
    title: "Rol",
    dataIndex: "nameRole",
    key: "nameRole",
    width: 180,
  },
  {
    title: "Acciones",
    dataIndex: "idRole",
    key: "actions",
    width: 140,
    render: (idRole: number) => (
      <div className="flex gap-1">
        <RoleButtonModal text="Editar" action="update" idRole={idRole} />
        <RoleButtonModal text="Eliminar" action="delete" idRole={idRole} />
      </div>
    ),
  },
];

const rolesMapInfo = (data: IRole[]): RoleTableRow[] => {
  return data?.map(({ idRole, nameRole }: IRole, index: number) => ({
    key: idRole,
    idRole,
    numberItem: index + 1,
    nameRole,
  }));
};

function RoleTable({ info }: { info: IRole[] }) {
  const canCreate = useHasPermission([1]);
  const canUpdate = useHasPermission([1]);
  const canDelete = useHasPermission([1]);

  const columns =
    canCreate || canUpdate || canDelete
      ? columnsRoles
      : columnsRoles.filter((item) => item.key !== "actions");

  return (
    <Table<RoleTableRow>
      columns={columns}
      dataSource={rolesMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default RoleTable;
