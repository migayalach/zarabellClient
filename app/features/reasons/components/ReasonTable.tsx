"use client";
import { Table } from "antd";
import { IReason } from "../types";
import ReasonButtonModal from "./ReasonButtonModal";

type ReasonTableRow = {
  key: number;
  idReason: number;
  nameReason: string;
  descriptionReason: string;
};

const columnsReasons = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
    width: 70,
  },
  {
    title: "Nombre",
    dataIndex: "nameReason",
    key: "nameReason",
    width: 180,
  },
  {
    title: "Descripcion",
    dataIndex: "descriptionReason",
    key: "descriptionReason",
    width: 180,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({ idReason }: { idReason: number }) => (
      <div className="flex gap-1">
        <ReasonButtonModal text="Editar" action="update" idReason={idReason} />
        <ReasonButtonModal
          text="Eliminar"
          action="delete"
          idReason={idReason}
        />
      </div>
    ),
  },
];

const reasonMapInfo = (data: IReason[]): ReasonTableRow[] => {
  return data?.map(
    ({ idReason, nameReason, descriptionReason }: IReason, index: number) => ({
      key: idReason,
      idReason,
      numberItem: index + 1,
      nameReason,
      descriptionReason,
    }),
  );
};

function ReasonTable({ info }: { info: IReason[] }) {
  return (
    <Table<ReasonTableRow>
      columns={columnsReasons}
      dataSource={reasonMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default ReasonTable;
