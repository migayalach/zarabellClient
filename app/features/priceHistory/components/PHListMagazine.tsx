"use client";
import { Table } from "antd";
import { IMagazine } from "../types";

type MagazineTableRow = {
  key: number;
  nameProvider: string;
  nameProduct: string;
  countIRecord: number;
  unitPriceHistory: number;
  quarterPriceHistory: number;
  dozenPriceHistory: number;
  mayorPriceHistory: number;
};

const columnsRoles = [
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
    title: "Producto",
    dataIndex: "nameProduct",
    key: "nameProduct",
    width: 180,
  },
  {
    title: "Total",
    dataIndex: "countIRecord",
    key: "countIRecord",
    width: 180,
  },
  {
    title: "Precio Unitario",
    dataIndex: "unitPriceHistory",
    key: "unitPriceHistory",
    width: 180,
  },
  {
    title: "Precio Quarta",
    dataIndex: "quarterPriceHistory",
    key: "quarterPriceHistory",
    width: 180,
  },
  {
    title: "Precio Dozena",
    dataIndex: "dozenPriceHistory",
    key: "dozenPriceHistory",
    width: 180,
  },
  {
    title: "Precio Mayor",
    dataIndex: "mayorPriceHistory",
    key: "mayorPriceHistory",
    width: 180,
  },
];

const magazineMapInfo = (data: IMagazine[]): MagazineTableRow[] => {
  return data?.map(
    (
      {
        nameProvider,
        nameProduct,
        countIRecord,
        unitPriceHistory,
        quarterPriceHistory,
        dozenPriceHistory,
        mayorPriceHistory,
      }: IMagazine,
      index: number,
    ) => ({
      key: index,
      numberItem: index + 1,
      nameProvider,
      nameProduct,
      countIRecord,
      unitPriceHistory,
      quarterPriceHistory,
      dozenPriceHistory,
      mayorPriceHistory,
    }),
  );
};

function PHListMagazine({ info }: { info: IMagazine[] }) {
  return (
    <Table<MagazineTableRow>
      columns={columnsRoles}
      dataSource={magazineMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default PHListMagazine;
