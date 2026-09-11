"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { useReasons } from "../hooks/useReason";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type IReasonForm = {
  text: string;
  action: string;
  idReason?: number;
};

const initialReasonInfo = {
  idReason: 0,
  nameReason: "",
  descriptionReason: "",
};

function ReasonButtonModal({ text, action, idReason }: IReasonForm) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    createNewReason,
    getOneReason,
    updateOneReason,
    deleteOneReason,
    currentReason,
    clearDataCurrentReason,
  } = useReasons();

  const [reasonInfo, setReasonInfo] = useState(initialReasonInfo);

  const resetReasonInfo = () => {
    setReasonInfo(initialReasonInfo);
  };

  const showModal = () => {
    if (action === "create") {
      clearDataCurrentReason();
      resetReasonInfo();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearDataCurrentReason();
    resetReasonInfo();
  };

  const onFinish = async () => {
    try {
      if (action === "create") {
        await createNewReason(reasonInfo);
        message.success("Razón creada correctamente");
        setIsModalOpen(false);
        resetReasonInfo();
      }

      if (action === "update") {
        await updateOneReason(reasonInfo);
        message.success("Razón actualizada correctamente");
        setIsModalOpen(false);
        clearDataCurrentReason();
        resetReasonInfo();
      }

      if (action === "delete" && idReason) {
        await deleteOneReason(idReason);
        message.success("Razón eliminada correctamente");
        setIsModalOpen(false);
      }
    } catch {
      message.error("No se pudo realizar la operación");
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setReasonInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idReason) {
      getOneReason(idReason);
    }
  }, [isModalOpen, action, idReason]);

  useEffect(() => {
    if (!isModalOpen || action !== "update" || !currentReason) return;
    setReasonInfo(currentReason);
  }, [currentReason, isModalOpen, action]);

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
            ? "Eliminar razón"
            : action === "create"
              ? "Crear razón"
              : "Editar razón"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "delete" && <DeleteOutlined />}
          {action === "create" && <PlusOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} razon`}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnHidden
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="reasonForm"
          >
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
          id="reasonForm"
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
                  name="nameReason"
                  value={reasonInfo.nameReason}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item label="Descripcion">
                <Input
                  name="descriptionReason"
                  value={reasonInfo.descriptionReason}
                  onChange={handleChangeInput}
                />
              </Form.Item>
            </>
          )}

          {action === "delete" && (
            <h1>¿Esta seguro que desea eliminar a esta razon?</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default ReasonButtonModal;
