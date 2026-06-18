"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Switch } from "antd";
import { useCategory } from "../hooks/useCategories";

type IUserForm = {
  text: string;
  action: string;
  idCategory?: number;
};

function CategoryButtonModal({ text, action, idCategory }: IUserForm) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    createNewCategory,
    getOneCategory,
    getAllCategories,
    updateOneCategory,
    deleteOneCategory,
    currentCategory,
    clearDataCurrentCategory,
  } = useCategory();

  const [categoryInfo, setCategoryInfo] = useState({
    idCategory: 0,
    nameCategory: "",
    stateCategory: true,
  });

  const resetCategoryInfo = () => {
    setCategoryInfo({
      idCategory: 0,
      nameCategory: "",
      stateCategory: true,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    if (action !== "delete") {
      getAllCategories();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearDataCurrentCategory();
  };

  const onFinish = async () => {
    if (action === "create") {
      createNewCategory(categoryInfo.nameCategory);
      setIsModalOpen(false);
      resetCategoryInfo();
    }
    if (action === "update") {
      updateOneCategory(categoryInfo);
    }
    if (action === "delete" && idCategory) {
      deleteOneCategory(idCategory);
      setIsModalOpen(false);
    }
  };

  const handleStateChange = (checked: boolean) => {
    setCategoryInfo((prev) => ({
      ...prev,
      stateCategory: checked,
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setCategoryInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idCategory) {
      getOneCategory(idCategory);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentCategory) return;
    requestAnimationFrame(() => {
      setCategoryInfo(currentCategory);
    });
  }, [currentCategory, isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {action === "delete" && <DeleteOutlined />}
        {action === "create" && <PlusOutlined />}
        {action === "update" && <FormOutlined />}
      </Button>

      <Modal
        title={`${text} categoria`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="categoryForm"
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
          id="categoryForm"
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
                  value={categoryInfo.nameCategory}
                  onChange={handleChangeInput}
                />
              </Form.Item>
            </>
          )}

          {action === "update" && (
            <Form.Item label="Estado">
              <Switch
                checked={categoryInfo.stateCategory}
                onChange={handleStateChange}
              />
            </Form.Item>
          )}

          {action === "delete" && (
            <h1>Esta seguro que desea eliminar la categoria</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default CategoryButtonModal;
