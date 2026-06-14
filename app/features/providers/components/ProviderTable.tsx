"use client";
import { Table, Tag } from "antd";
import { IProvider } from "../types";
import ProviderButtonModal from "./ProviderButtonModal";

type ProviderTableRow = {
  key: number;
  idProvider: number;
  nameProvider: string;
  phoneProvider: string;
  emailProvider: string;
  stateProvider: boolean;
};

const columnsProviders = [
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
    title: "Celular/Telefono",
    dataIndex: "phoneProvider",
    key: "phoneProvider",
    width: 180,
  },
  {
    title: "Email",
    dataIndex: "emailProvider",
    key: "emailProvider",
    width: 180,
  },
  {
    title: "Estado",
    dataIndex: "stateProvider",
    key: "stateProvider",
    render: (stateProvider: boolean) => {
      const color = stateProvider ? "green" : "volcano";
      const text = stateProvider ? "Habilidato" : "Deshabilitado";
      return <Tag color={color}>{text}</Tag>;
    },
    width: 120,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({ idProvider }: { idProvider: number }) => (
      <div className="flex gap-1">
        <ProviderButtonModal
          text="Editar"
          action="update"
          idProvider={idProvider}
        />
        <ProviderButtonModal
          text="Eliminar"
          action="delete"
          idProvider={idProvider}
        />
      </div>
    ),
  },
];

const providerMapInfo = (data: IProvider[]): ProviderTableRow[] => {
  return data?.map(
    (
      {
        idProvider,
        nameProvider,
        phoneProvider,
        emailProvider,
        stateProvider,
      }: IProvider,
      index: number,
    ) => ({
      key: idProvider,
      idProvider,
      numberItem: index + 1,
      nameProvider,
      phoneProvider,
      emailProvider,
      stateProvider,
    }),
  );
};

function ProviderTable({ info }: { info: IProvider[] }) {
  return (
    <Table<ProviderTableRow>
      columns={columnsProviders}
      dataSource={providerMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default ProviderTable;
