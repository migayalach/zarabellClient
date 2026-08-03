"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useTOutputs } from "../hooks/useTypeOutputs";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type IOutputTypeForm = {
  text: string;
  action: string;
  idTypeOutput?: number;
};

function OutputTypeButtonModal({
  text,
  action,
  idTypeOutput,
}: IOutputTypeForm) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    createNewTOutput,
    getOneTOutput,
    updateOneTOutput,
    deleteOneTOutput,
    currentTOutput,
    clearDataCurrentTOutput,
  } = useTOutputs();

  const [tOutputInfo, setTOutputInfo] = useState({
    idTypeOutput: 0,
    nameTypeOutput: "",
    descriptionTypeOutput: "",
    prefix: "",
  });

  const resetTOutputInfo = () => {
    setTOutputInfo({
      idTypeOutput: 0,
      nameTypeOutput: "",
      descriptionTypeOutput: "",
      prefix: "",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    if (action !== "delete") {
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearDataCurrentTOutput();
  };

  const onFinish = async () => {
    if (action === "create") {
      createNewTOutput(tOutputInfo);
      setIsModalOpen(false);
      resetTOutputInfo();
    }
    if (action === "update") {
      updateOneTOutput(tOutputInfo);
    }
    if (action === "delete" && idTypeOutput) {
      deleteOneTOutput(idTypeOutput);
      setIsModalOpen(false);
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setTOutputInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idTypeOutput) {
      getOneTOutput(idTypeOutput);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentTOutput) return;
    setTOutputInfo(currentTOutput);
  }, [currentTOutput, isModalOpen]);

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
            ? "Eliminar tipo de salida"
            : action === "create"
              ? "Crear tipo de salida"
              : "Editar tipo de salida"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "delete" && <DeleteOutlined />}
          {action === "create" && <PlusOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} tipo`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="typeOutputForm"
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
          id="typeOutputForm"
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
                  name="nameTypeOutput"
                  value={tOutputInfo.nameTypeOutput}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item label="Descripcion">
                <Input
                  name="descriptionTypeOutput"
                  value={tOutputInfo.descriptionTypeOutput}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item label="Prefijo">
                <Input
                  name="prefix"
                  value={tOutputInfo.prefix}
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

export default OutputTypeButtonModal;
