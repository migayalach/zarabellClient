"use client";
import { Table } from "antd";
import { IOutputHistory } from "../types";
import OutputHistoryModalAction from "./OutputHistoryModalAction";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type OutputHistoryTableRow = {
  key: number;
  idOutput: number;
  idInputRecord: number;
  nameProduct: string;
  quantity: number;
  totalPrice: number;
};

const columnsOutputHistory = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
    width: 70,
  },
  {
    title: "Producto",
    dataIndex: "nameProduct",
    key: "nameProduct",
    width: 180,
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
    width: 180,
  },
  {
    title: "Precio",
    dataIndex: "totalPrice",
    key: "totalPrice",
    width: 180,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({
      idOutput,
      idInputRecord,
    }: {
      idInputRecord: number;
      idOutput: number;
    }) => (
      <div className="flex gap-1">
        <OutputHistoryModalAction
          text="Editar"
          action="update"
          idOutput={idOutput}
          idInputRecord={idInputRecord}
        />
        <OutputHistoryModalAction
          text="Eliminar"
          action="delete"
          idOutput={idOutput}
          idInputRecord={idInputRecord}
        />
      </div>
    ),
  },
];

const rolesMapInfo = (data: IOutputHistory[]): OutputHistoryTableRow[] => {
  return data?.map(
    (
      {
        idOutput,
        idInputRecord,
        nameProduct,
        quantity,
        totalPrice,
      }: IOutputHistory,
      index: number,
    ) => ({
      key: idInputRecord,
      numberItem: index + 1,
      idOutput,
      idInputRecord,
      nameProduct,
      quantity,
      totalPrice,
    }),
  );
};

function OutputHistoryTable({ infoOH }: { infoOH: IOutputHistory[] }) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1]);

  const columns =
    canCreate || canUpdate || canDelete
      ? columnsOutputHistory
      : columnsOutputHistory.filter((item) => item.key !== "actions");

  return (
    <Table<OutputHistoryTableRow>
      columns={columns}
      dataSource={rolesMapInfo(infoOH)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default OutputHistoryTable;
