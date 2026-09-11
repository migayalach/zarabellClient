"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Switch, message } from "antd";
import { useCategory } from "../hooks/useCategories";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";
import CustomTooltip from "@/app/shared/components/CustomTooltip";

type IUserForm = {
  text: string;
  action: string;
  idCategory?: number;
};

const initialCategoryInfo = {
  idCategory: 0,
  nameCategory: "",
  stateCategory: true,
};

function CategoryButtonModal({ text, action, idCategory }: IUserForm) {
  const canCreate = useHasPermission([1]);
  const canUpdate = useHasPermission([1]);
  const canDelete = useHasPermission([1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    createNewCategory,
    getOneCategory,
    updateOneCategory,
    deleteOneCategory,
    currentCategory,
    clearDataCurrentCategory,
  } = useCategory();

  const [categoryInfo, setCategoryInfo] = useState(initialCategoryInfo);

  const resetCategoryInfo = () => {
    setCategoryInfo(initialCategoryInfo);
  };

  const showModal = () => {
    if (action === "create") {
      clearDataCurrentCategory();
      resetCategoryInfo();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearDataCurrentCategory();
    resetCategoryInfo();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setCategoryInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleStateChange = (checked: boolean) => {
    setCategoryInfo((prev) => ({
      ...prev,
      stateCategory: checked,
    }));
  };

  const onFinish = async () => {
    try {
      if (action === "create") {
        await createNewCategory(categoryInfo.nameCategory);
        message.success("Categoría creada correctamente");
        setIsModalOpen(false);
        resetCategoryInfo();
      }

      if (action === "update") {
        await updateOneCategory(categoryInfo);
        message.success("Categoría actualizada correctamente");
        setIsModalOpen(false);
        clearDataCurrentCategory();
        resetCategoryInfo();
      }

      if (action === "delete" && idCategory) {
        await deleteOneCategory(idCategory);
        message.success("Categoría eliminada correctamente");
        setIsModalOpen(false);
      }
    } catch {
      message.error("No se pudo realizar la operación");
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idCategory) {
      getOneCategory(idCategory);
    }
  }, [isModalOpen, action, idCategory]);

  useEffect(() => {
    if (!isModalOpen || action !== "update" || !currentCategory) return;
    setCategoryInfo(currentCategory);
  }, [currentCategory, isModalOpen, action]);

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
            ? "Eliminar categoria"
            : action === "create"
              ? "Crear categoria"
              : "Editar categoria"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "delete" && <DeleteOutlined />}
          {action === "create" && <PlusOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} categoria`}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnHidden
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
                  name="nameCategory"
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
