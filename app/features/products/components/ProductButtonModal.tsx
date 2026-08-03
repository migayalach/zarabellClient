"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Switch } from "antd";
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

  const [productInfo, setProductInfo] = useState({
    idProduct: 0,
    idCategory: 0,
    nameProduct: "",
    stateProduct: true,
  });

  const resetProductInfo = () => {
    setProductInfo({
      idProduct: 0,
      idCategory: 0,
      nameProduct: "",
      stateProduct: true,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    if (action !== "delete") {
      // getAllRoles();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // resetDataRole();
    clearDataCurrentProduct();
    clearDataCurrentCategory();
  };

  const onFinish = async () => {
    if (action === "create") {
      createNewProduct(productInfo);
      setIsModalOpen(false);
      resetProductInfo();
    }
    if (action === "update") {
      updateOneProduct(productInfo);
    }
    if (action === "delete" && idProduct) {
      deleteOneProduct(idProduct);
      setIsModalOpen(false);
    }
    // resetDataRole();
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
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentProduct) return;
    requestAnimationFrame(() => {
      setProductInfo(currentProduct);
    });
  }, [currentProduct, isModalOpen]);

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
              <Form.Item label="Categoria" name="nameCategory">
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
