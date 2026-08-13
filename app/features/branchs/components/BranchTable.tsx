"use client";
import { Table, Tag } from "antd";
import { IBranchs } from "../types";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";
import BranchButtonModal from "./BranchButtonModal";

type BranchTableRow = {
  key: number;
  idBranch: number;
  nameBranch: string;
  address: string;
  phone: string;
  stateBranch: boolean;
};

const columnsBranchs = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
    width: 70,
  },
  {
    title: "Sucursal",
    dataIndex: "nameBranch",
    key: "nameBranch",
    width: 180,
  },
  {
    title: "Direccion",
    dataIndex: "address",
    key: "address",
    width: 180,
  },
  {
    title: "Telefono",
    dataIndex: "phone",
    key: "phone",
    width: 180,
  },
  {
    title: "Estado",
    dataIndex: "stateBranch",
    key: "stateBranch",
    render: (stateBranch: boolean) => {
      const color = stateBranch ? "green" : "volcano";
      const text = stateBranch ? "Habilidato" : "Deshabilitado";
      return <Tag color={color}>{text}</Tag>;
    },
    width: 120,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({ idBranch }: { idBranch: number }) => (
      <div className="flex gap-1">
        <BranchButtonModal
          text="Eliminar"
          action="delete"
          idBranch={idBranch}
        />
        <BranchButtonModal text="Editar" action="update" idBranch={idBranch} />
      </div>
    ),
  },
];

const branchsMapInfo = (data: IBranchs[]): BranchTableRow[] => {
  return data?.map(
    (
      { idBranch, nameBranch, address, phone, stateBranch }: IBranchs,
      index: number,
    ) => ({
      key: idBranch,
      numberItem: index + 1,
      idBranch,
      nameBranch,
      address,
      phone,
      stateBranch,
    }),
  );
};

function BranchTable({ info }: { info: IBranchs[] }) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const columns =
    canCreate || canUpdate || canDelete
      ? columnsBranchs
      : columnsBranchs.filter((item) => item.key !== "actions");

  return (
    <Table<BranchTableRow>
      columns={columns}
      dataSource={branchsMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default BranchTable;
