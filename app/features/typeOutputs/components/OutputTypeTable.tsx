"use client";
import { Table } from "antd";
import { ITypeOutput } from "../types";
import OutputTypeButtonModal from "./OutputTypeButtonModal";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type OutputTypeTableRow = {
  key: number;
  idTypeOutput: number;
  nameTypeOutput: string;
  descriptionTypeOutput: string;
  prefix: string;
};

const columnsOutputTypes = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
    width: 70,
  },
  {
    title: "Nombre",
    dataIndex: "nameTypeOutput",
    key: "nameTypeOutput",
    width: 180,
  },
  {
    title: "Descripcion",
    dataIndex: "descriptionTypeOutput",
    key: "descriptionTypeOutput",
    width: 180,
  },
  {
    title: "Prefijo",
    dataIndex: "prefix",
    key: "prefix",
    width: 180,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({ idTypeOutput }: { idTypeOutput: number }) => (
      <div className="flex gap-1">
        <OutputTypeButtonModal
          text="Editar"
          action="update"
          idTypeOutput={idTypeOutput}
        />
        <OutputTypeButtonModal
          text="Eliminar"
          action="delete"
          idTypeOutput={idTypeOutput}
        />
      </div>
    ),
  },
];

const OutputTypeMapInfo = (data: ITypeOutput[]): OutputTypeTableRow[] => {
  return data?.map(
    (
      {
        idTypeOutput,
        nameTypeOutput,
        descriptionTypeOutput,
        prefix,
      }: ITypeOutput,
      index: number,
    ) => ({
      key: idTypeOutput,
      idTypeOutput,
      numberItem: index + 1,
      nameTypeOutput,
      descriptionTypeOutput,
      prefix,
    }),
  );
};

function OutputTypeTable({ info }: { info: ITypeOutput[] }) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const columns =
    canCreate || canUpdate || canDelete
      ? columnsOutputTypes
      : columnsOutputTypes.filter((item) => item.key !== "actions");

  return (
    <Table<OutputTypeTableRow>
      columns={columns}
      dataSource={OutputTypeMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}
export default OutputTypeTable;
