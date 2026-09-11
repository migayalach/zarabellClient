"use client";

import { useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { useRoles } from "../../roles/hooks/useRoles";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type IUserForm = {
  text: string;
  action: string;
  idRole?: number;
};

function RoleButtonModal({ text, action, idRole }: IUserForm) {
  const canCreate = useHasPermission([1]);
  const canUpdate = useHasPermission([1]);
  const canDelete = useHasPermission([1]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const { createNewRole, getOneRole, updateOneRole, deleteOneRole } =
    useRoles();

  const [roleInfo, setRoleInfo] = useState({
    idRole: 0,
    nameRole: "",
  });

  const resetRoleInfo = () => {
    setRoleInfo({
      idRole: 0,
      nameRole: "",
    });

    form.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);

    if (action === "create") {
      resetRoleInfo();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetRoleInfo();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRoleInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFinish = async () => {
    try {
      if (action === "create") {
        await createNewRole(roleInfo.nameRole);
        message.success("Rol creado correctamente");
        setIsModalOpen(false);
        resetRoleInfo();
        return;
      }

      if (action === "update" && idRole) {
        await updateOneRole({
          idRole,
          nameRole: roleInfo.nameRole,
        });
        message.success("Rol actualizado correctamente");
        return;
      }

      if (action === "delete" && idRole) {
        await deleteOneRole(idRole);
        message.success("Rol eliminado correctamente");
        setIsModalOpen(false);
        resetRoleInfo();
        return;
      }
    } catch {
      message.error("No se pudo realizar la operación");
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action !== "update") return;
    if (!idRole) return;

    const loadRole = async () => {
      try {
        const result = await getOneRole(idRole);

        setRoleInfo({
          idRole: result.value.idRole,
          nameRole: result.value.nameRole,
        });
      } catch {
        message.error("No se pudo cargar el rol");
      }
    };

    loadRole();
  }, [isModalOpen, action, idRole]);

  if (
    (action === "create" && !canCreate) ||
    (action === "update" && !canUpdate) ||
    (action === "delete" && !canDelete)
  ) {
    return null;
  }

  return (
    <>
      <CustomTooltip
        text={
          action === "delete"
            ? "Eliminar rol"
            : action === "create"
              ? "Crear rol"
              : "Editar rol"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "create" && <PlusOutlined />}
          {action === "delete" && <DeleteOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} rol`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            {action === "create" && "Crear"}
            {action === "delete" && "Eliminar"}
            {action === "update" && "Editar"}
          </Button>,

          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          autoComplete="off"
        >
          {action !== "delete" && (
            <Form.Item label="Nombres">
              <Input
                name="nameRole"
                value={roleInfo.nameRole}
                onChange={handleChangeInput}
              />
            </Form.Item>
          )}

          {action === "delete" && (
            <h1>¿Está seguro que desea eliminar este rol?</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default RoleButtonModal;
