"use client";
import { Table, Tag } from "antd";
import { IRecordInput } from "../types";
import InputRecordButtonModal from "./InputRecordButtonModal";
import InputRecordBtnAction from "./InputRecordBtnAction";

type RoleTableRow = {
  key: number;
  idInputRecord: number;
  idCategory: number;
  idProduct: number;
  idProvider: number;
  nameProvider: string;
  nameCategory: string;
  nameProduct: string;
  dateInputRecord: string;
  expirationDateIRecord: string;
  countIRecord: number;
  priceBuyIRecord: number;
  statusIRecord: boolean;
};

const columnsUsers = [
  {
    title: "N°",
    dataIndex: "numberItem",
    key: "numberItem",
    width: 70,
  },
  {
    title: "Proveedor",
    dataIndex: "nameProvider",
    key: "nameProvider",
    width: 180,
  },
  {
    title: "Categoria",
    dataIndex: "nameCategory",
    key: "nameCategory",
    width: 180,
  },
  {
    title: "Producto",
    dataIndex: "nameProduct",
    key: "nameProduct",
    width: 180,
  },
  {
    title: "Fecha ingreso",
    dataIndex: "dateInputRecord",
    key: "dateInputRecord",
    width: 180,
  },
  {
    title: "Fecha expiracion",
    dataIndex: "expirationDateIRecord",
    key: "expirationDateIRecord",
    width: 180,
  },
  {
    title: "Cantidad",
    dataIndex: "countIRecord",
    key: "countIRecord",
    width: 180,
  },
  {
    title: "Precio compra",
    dataIndex: "priceBuyIRecord",
    key: "priceBuyIRecord",
    width: 180,
  },
  {
    title: "Estado",
    dataIndex: "statusIRecord",
    key: "statusIRecord",
    render: (statusIRecord: boolean) => {
      const color = statusIRecord ? "green" : "volcano";
      const text = statusIRecord ? "Habilidato" : "Deshabilitado";
      return <Tag color={color}>{text}</Tag>;
    },
    width: 120,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({
      idInputRecord,
      idCategory,
      idProduct,
      idProvider,
    }: {
      idInputRecord: number;
      idCategory: number;
      idProduct: number;
      idProvider: number;
    }) => (
      <div className="flex gap-1">
        <InputRecordButtonModal
          text="Editar"
          action="update"
          idInputRecord={idInputRecord}
          idCategory={idCategory}
          idProduct={idProduct}
          idProvider={idProvider}
        />
        <InputRecordButtonModal
          text="Eliminar"
          action="delete"
          idInputRecord={idInputRecord}
        />
        {/* TODO PRODUCT  */}
        <InputRecordBtnAction idInventoryEntry={idInputRecord} />
      </div>
    ),
  },
];

const rolesMapInfo = (data: IRecordInput[]): RoleTableRow[] => {
  return data?.map(
    (
      {
        idInputRecord,
        idCategory,
        idProduct,
        idProvider,
        nameProvider,
        nameCategory,
        nameProduct,
        dateInputRecord,
        expirationDateIRecord,
        countIRecord,
        priceBuyIRecord,
        statusIRecord,
      }: IRecordInput,
      index: number,
    ) => ({
      key: idInputRecord,
      numberItem: index + 1,
      idInputRecord,
      idCategory,
      idProduct,
      idProvider,
      nameProvider,
      nameCategory,
      nameProduct,
      dateInputRecord,
      expirationDateIRecord,
      countIRecord,
      priceBuyIRecord,
      statusIRecord,
    }),
  );
};

function InputRecodTable({ info }: { info: IRecordInput[] }) {
  return (
    <Table<RoleTableRow>
      columns={columnsUsers}
      dataSource={rolesMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default InputRecodTable;
