"use client";
import { Table } from "antd";
import { IRole } from "../types";
import RoleButtonModal from "./RoleButtonModal";

type RoleTableRow = {
  key: number;
  idRole: number;
  nameRole: string;
};

const columnsUsers = [
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
    key: "actions",
    width: 140,
    render: ({ idRole }: { idRole: number }) => (
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
  return (
    <Table<RoleTableRow>
      columns={columnsUsers}
      dataSource={rolesMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default RoleTable;
