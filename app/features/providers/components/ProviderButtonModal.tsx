"use client";
import { useState, useEffect } from "react";
import {
  DeleteOutlined,
  UserAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Switch } from "antd";
import { useProviders } from "../hooks/useProvides";

type IProviderForm = {
  text: string;
  action: string;
  idProvider?: number;
};

function ProviderButtonModal({ text, action, idProvider }: IProviderForm) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    createNewProvider,
    getOneProvider,
    updateOneProvider,
    deleteOneProvider,
    currentProvider,
    clearDataCurrentProvider,
  } = useProviders();

  const [providerInfo, setProviderInfo] = useState({
    idProvider: 0,
    nameProvider: "",
    phoneProvider: "",
    emailProvider: "",
    stateProvider: true,
  });

  const resetProviderInfo = () => {
    setProviderInfo({
      idProvider: 0,
      nameProvider: "",
      phoneProvider: "",
      emailProvider: "",
      stateProvider: true,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    if (action !== "delete") {
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearDataCurrentProvider();
  };

  const onFinish = async () => {
    if (action === "create") {
      createNewProvider(providerInfo);
      setIsModalOpen(false);
      resetProviderInfo();
    }
    if (action === "update") {
      updateOneProvider(providerInfo);
    }
    if (action === "delete" && idProvider) {
      deleteOneProvider(idProvider);
      setIsModalOpen(false);
    }
  };

  const handleStateChange = (checked: boolean) => {
    setProviderInfo((prev) => ({
      ...prev,
      stateProvider: checked,
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setProviderInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idProvider) {
      getOneProvider(idProvider);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentProvider) return;
    requestAnimationFrame(() => {
      setProviderInfo(currentProvider);
    });
  }, [currentProvider, isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {action === "delete" && <DeleteOutlined />}
        {action === "create" && <UserAddOutlined />}
        {action === "update" && <FormOutlined />}
      </Button>

      <Modal
        title={`${text} proveedor`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="providerForm"
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
          id="providerForm"
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
                  name="nameProvider"
                  value={providerInfo.nameProvider}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item label="Email">
                <Input
                  name="emailProvider"
                  value={providerInfo.emailProvider}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item label="Celular / Telefono">
                <Input
                  name="phoneProvider"
                  value={providerInfo.phoneProvider}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              {action === "update" && (
                <Form.Item label="Estado">
                  <Switch
                    checked={providerInfo.stateProvider}
                    onChange={handleStateChange}
                  />
                </Form.Item>
              )}
            </>
          )}

          {action === "delete" && (
            <h1>Esta seguro que desea eliminar a este proveedor</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default ProviderButtonModal;
