"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useRoles } from "../../roles/hooks/useRoles";

type IUserForm = {
  text: string;
  action: string;
  idRole?: number;
};

function RoleButtonModal({ text, action, idRole }: IUserForm) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    createNewRole,
    getOneRole,
    getAllRoles,
    updateOneRole,
    deleteOneRole,
    currentRole,
    clearDataCurrentRole,
  } = useRoles();

  const [roleInfo, setRoleInfo] = useState({
    idRole: 0,
    nameRole: "",
  });

  const resetRoleInfo = () => {
    setRoleInfo({
      idRole: 0,
      nameRole: "",
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
    clearDataCurrentRole();
  };

  const onFinish = async () => {
    if (action === "create") {
      createNewRole(roleInfo.nameRole);
      setIsModalOpen(false);
      resetRoleInfo();
    }
    if (action === "update") {
      updateOneRole(roleInfo);
    }
    if (action === "delete" && idRole) {
      deleteOneRole(idRole);
      setIsModalOpen(false);
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setRoleInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idRole) {
      getOneRole(idRole);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentRole) return;
    requestAnimationFrame(() => {
      setRoleInfo(currentRole);
    });
  }, [currentRole, isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {action === "delete" && <DeleteOutlined />}
        {action === "create" && <PlusOutlined />}
        {action === "update" && <FormOutlined />}
      </Button>

      <Modal
        title={`${text} rol`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" htmlType="submit" form="roleForm">
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
          id="roleForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          {action !== "delete" && (
            <>
              <Form.Item label="Nombres">
                <Input
                  name="nameRole"
                  value={roleInfo.nameRole}
                  onChange={handleChangeInput}
                />
              </Form.Item>
            </>
          )}

          {action === "delete" && (
            <h1>Esta seguro que desea eliminar a este role</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default RoleButtonModal;
