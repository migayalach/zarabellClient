"use client";
import { useState, useEffect } from "react";
import {
  DeleteOutlined,
  UserAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Switch } from "antd";
import { useUsers } from "../hooks/useUsers";
import RoleSelect from "../../roles/components/RoleSelect";
import { useRoles } from "../../roles/hooks/useRoles";
import CustomTooltip from "@/app/shared/components/CustomTooltip";

type IUserForm = {
  text: string;
  action: string;
  idUser?: number;
};

function UserButtonModal({ text, action, idUser }: IUserForm) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    createNewUser,
    getOneUser,
    updateOneUser,
    deleteOneUser,
    currentUser,
    clearDataCurrentUser,
    addInfoWatchAction,
  } = useUsers();
  const { getAllRoles, resetDataRole } = useRoles();

  const [userInfo, setUserInfo] = useState({
    idUser: 0,
    idRole: 1,
    nameRole: "",
    nameUser: "",
    lastNameUser: "",
    emailUser: "",
    phoneUser: "",
    stateUser: true,
  });

  const resetUserInfo = () => {
    setUserInfo({
      idUser: 0,
      idRole: 1,
      nameRole: "",
      nameUser: "",
      lastNameUser: "",
      emailUser: "",
      phoneUser: "",
      stateUser: true,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    if (action !== "delete") {
      getAllRoles();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetDataRole();
    clearDataCurrentUser();
  };

  const onFinish = async () => {
    if (action === "create") {
      createNewUser(userInfo);
      setIsModalOpen(false);
      resetUserInfo();
    }
    if (action === "update") {
      updateOneUser(userInfo);
    }
    if (action === "delete" && idUser) {
      deleteOneUser(idUser);
      setIsModalOpen(false);
    }
    addInfoWatchAction(action);
    resetDataRole();
  };

  const handleRoleChange = (value: number) => {
    setUserInfo((prev) => ({
      ...prev,
      idRole: value,
    }));
  };

  const handleStateChange = (checked: boolean) => {
    setUserInfo((prev) => ({
      ...prev,
      stateUser: checked,
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idUser) {
      getOneUser(idUser);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentUser) return;
    requestAnimationFrame(() => {
      setUserInfo(currentUser);
    });
  }, [currentUser, isModalOpen]);

  return (
    <>
      <CustomTooltip
        text={
          action === "delete"
            ? "Eliminar usuario"
            : action === "create"
              ? "Crear usuario"
              : "Editar usuario"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "delete" && <DeleteOutlined />}
          {action === "create" && <UserAddOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} usuario`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" htmlType="submit" form="userForm">
            {action === "delete" && "Eliminar"}
            {action === "create" && "Crear"}
            {action === "update" && "Editar"}
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Form
          id="userForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          {action !== "delete" && (
            <>
              <Form.Item label="Rol">
                <RoleSelect
                  value={userInfo.idRole}
                  onChange={handleRoleChange}
                />
              </Form.Item>

              <Form.Item label="Nombres">
                <Input
                  name="nameUser"
                  value={userInfo.nameUser}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item label="Apellidos">
                <Input
                  name="lastNameUser"
                  value={userInfo.lastNameUser}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item label="Email">
                <Input
                  name="emailUser"
                  value={userInfo.emailUser}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item label="Celular / Telefono">
                <Input
                  name="phoneUser"
                  value={userInfo.phoneUser}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              {action === "update" && (
                <Form.Item label="Estado">
                  <Switch
                    checked={userInfo.stateUser}
                    onChange={handleStateChange}
                  />
                </Form.Item>
              )}
            </>
          )}

          {action === "delete" && (
            <h1>Esta seguro que desea eliminar a este usuario</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default UserButtonModal;
