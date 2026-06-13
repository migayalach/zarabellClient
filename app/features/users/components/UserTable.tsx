"use client";
import { Table, Tag } from "antd";
import { IUserInfo } from "../types";
import UserButtonModal from "./UserButtonModal";

type UserTableRow = {
  key: number;
  idUser: number;
  idRole: number;
  numberItem: number;
  nameRole: string;
  fullNameUser: string;
  emailUser: string;
  phoneUser: string;
  stateUser: boolean;
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
    title: "Usuario",
    dataIndex: "fullNameUser",
    key: "fullNameUser",
    width: 180,
  },
  {
    title: "Email",
    dataIndex: "emailUser",
    key: "emailUser",
    width: 180,
  },
  {
    title: "Celular",
    dataIndex: "phoneUser",
    key: "phoneUser",
    width: 120,
  },
  {
    title: "Estado",
    dataIndex: "stateUser",
    key: "stateUser",
    render: (stateUser: boolean) => {
      const color = stateUser ? "green" : "volcano";
      const text = stateUser ? "Habilidato" : "Deshabilitado";
      return <Tag color={color}>{text}</Tag>;
    },
    width: 120,
  },
  {
    title: "Acciones",
    key: "actions",
    width: 140,
    render: ({ idUser }: { idUser: number }) => (
      <div className="flex gap-1">
        <UserButtonModal text="Editar" action="update" idUser={idUser} />
        <UserButtonModal text="Eliminar" action="delete" idUser={idUser} />
      </div>
    ),
  },
];

const usersMapInfo = (data: IUserInfo[]): UserTableRow[] => {
  return data?.map(
    (
      {
        idUser,
        idRole,
        nameRole,
        nameUser,
        lastNameUser,
        emailUser,
        phoneUser,
        stateUser,
      }: IUserInfo,
      index: number,
    ) => ({
      key: idUser,
      idUser,
      idRole,
      numberItem: index + 1,
      nameRole,
      fullNameUser: `${nameUser} ${lastNameUser}`,
      emailUser,
      phoneUser,
      stateUser,
    }),
  );
};

function UserTable({ info }: { info: IUserInfo[] }) {
  return (
    <Table<UserTableRow>
      columns={columnsUsers}
      dataSource={usersMapInfo(info)}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}

export default UserTable;
