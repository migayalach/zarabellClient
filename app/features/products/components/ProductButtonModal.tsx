"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Switch, message } from "antd";
import { useProducts } from "../hooks/useProducts";
import { CategoryList } from "../../categories/components";
import { useCategory } from "../../categories/hooks/useCategories";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type IProductForm = {
  text: string;
  action: string;
  idProduct?: number;
  idCategory?: number;
};

const initialProductInfo = {
  idProduct: 0,
  idCategory: 0,
  nameProduct: "",
  stateProduct: true,
};

function ProductButtonModal({
  text,
  action,
  idProduct,
  idCategory,
}: IProductForm) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    createNewProduct,
    getOneProduct,
    updateOneProduct,
    deleteOneProduct,
    currentProduct,
    clearDataCurrentProduct,
  } = useProducts();
  const { getOneCategory, clearDataCurrentCategory } = useCategory();

  const [productInfo, setProductInfo] = useState(initialProductInfo);

  const resetProductInfo = () => {
    setProductInfo(initialProductInfo);
  };

  const showModal = () => {
    if (action === "create") {
      clearDataCurrentProduct();
      clearDataCurrentCategory();
      resetProductInfo();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearDataCurrentProduct();
    clearDataCurrentCategory();
    resetProductInfo();
  };

  const onFinish = async () => {
    try {
      if (action === "create") {
        await createNewProduct(productInfo);
        message.success("Producto creado correctamente");
        setIsModalOpen(false);
        resetProductInfo();
      }

      if (action === "update") {
        await updateOneProduct(productInfo);
        message.success("Producto actualizado correctamente");
        setIsModalOpen(false);
        clearDataCurrentProduct();
        clearDataCurrentCategory();
        resetProductInfo();
      }

      if (action === "delete" && idProduct) {
        await deleteOneProduct(idProduct);
        message.success("Producto eliminado correctamente");
        setIsModalOpen(false);
      }
    } catch {
      message.error("No se pudo realizar la operación");
    }
  };

  const handleRoleChange = (value: number) => {
    setProductInfo((prev) => ({
      ...prev,
      idCategory: value,
    }));
  };

  const handleStateChange = (checked: boolean) => {
    setProductInfo((prev) => ({
      ...prev,
      stateProduct: checked,
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setProductInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idProduct && idCategory) {
      getOneProduct(idProduct);
      getOneCategory(idCategory);
    }
  }, [isModalOpen, action, idProduct, idCategory]);

  useEffect(() => {
    if (!isModalOpen || action !== "update" || !currentProduct) return;
    setProductInfo(currentProduct);
  }, [currentProduct, isModalOpen, action]);

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
            ? "Eliminar producto"
            : action === "create"
              ? "Crear producto"
              : "Editar producto"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "delete" && <DeleteOutlined />}
          {action === "create" && <PlusOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} producto`}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnHidden
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="productForm"
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
          id="productForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          {action !== "delete" && (
            <>
              <Form.Item label="Categoria">
                <CategoryList handleCategory={handleRoleChange} />
              </Form.Item>

              <Form.Item label="Producto">
                <Input
                  name="nameProduct"
                  value={productInfo.nameProduct}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              {action === "update" && (
                <Form.Item label="Estado">
                  <Switch
                    checked={productInfo.stateProduct}
                    onChange={handleStateChange}
                  />
                </Form.Item>
              )}
            </>
          )}

          {action === "delete" && (
            <h1>¿Esta seguro que desea eliminar a este producto?</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default ProductButtonModal;
