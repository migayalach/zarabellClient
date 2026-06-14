"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useTOutputs } from "../hooks/useTypeOutputs";

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
  });

  const resetTOutputInfo = () => {
    setTOutputInfo({
      idTypeOutput: 0,
      nameTypeOutput: "",
      descriptionTypeOutput: "",
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
    requestAnimationFrame(() => {
      setTOutputInfo(currentTOutput);
    });
  }, [currentTOutput, isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {action === "delete" && <DeleteOutlined />}
        {action === "create" && <PlusOutlined />}
        {action === "update" && <FormOutlined />}
      </Button>

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
          id="typeOutForm"
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
