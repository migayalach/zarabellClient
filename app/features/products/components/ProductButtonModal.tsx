"use client";
import { useState, useEffect, useMemo } from "react";
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

type ProductInfo = typeof initialProductInfo;
type ValidatedField = "idCategory" | "nameProduct";
type FieldErrors = Partial<Record<ValidatedField, string>>;

const validateProduct = (info: ProductInfo): FieldErrors => {
  const errors: FieldErrors = {};

  if (!info.idCategory) {
    errors.idCategory = "Selecciona una categoría";
  }

  // "?? ''" evita errores si el backend devuelve el campo en null
  const name = (info.nameProduct ?? "").trim();
  if (!name) {
    errors.nameProduct = "Ingresa el nombre del producto";
  } else if (name.length < 3) {
    errors.nameProduct = "El nombre debe tener al menos 3 caracteres";
  } else if (name.length > 100) {
    errors.nameProduct = "El nombre no puede superar los 100 caracteres";
  }

  return errors;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  // Solo mostramos el error de un campo después de que el usuario lo tocó
  const [touched, setTouched] = useState<
    Partial<Record<ValidatedField, boolean>>
  >({});

  const errors = useMemo(() => validateProduct(productInfo), [productInfo]);
  const isFormValid = Object.keys(errors).length === 0;
  const requiresValidation = action !== "delete";

  const resetProductInfo = () => {
    setProductInfo(initialProductInfo);
    setTouched({});
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

  const handleBlur = (field: ValidatedField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Devuelve el estado y el mensaje que espera Form.Item para cada campo
  const getFieldStatus = (field: ValidatedField) => {
    const hasError = touched[field] && errors[field];
    return {
      validateStatus: hasError ? ("error" as const) : ("" as const),
      help: hasError ? errors[field] : undefined,
    };
  };

  const onFinish = async () => {
    // Protección extra: aunque el botón esté deshabilitado, Enter no debe enviar datos inválidos
    if (requiresValidation && !isFormValid) {
      setTouched({ idCategory: true, nameProduct: true });
      return;
    }

    // Enviamos el nombre sin espacios sobrantes
    const cleanProductInfo: ProductInfo = {
      ...productInfo,
      nameProduct: (productInfo.nameProduct ?? "").trim(),
    };

    setIsSubmitting(true);
    try {
      if (action === "create") {
        await createNewProduct(cleanProductInfo);
        message.success("Producto creado correctamente");
        setIsModalOpen(false);
        resetProductInfo();
      }

      if (action === "update") {
        await updateOneProduct(cleanProductInfo);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = (value: number) => {
    setProductInfo((prev) => ({
      ...prev,
      idCategory: value,
    }));
    handleBlur("idCategory");
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
            loading={isSubmitting}
            disabled={requiresValidation && !isFormValid}
          >
            {action === "delete" && "Eliminar"}
            {action === "create" && "Crear"}
            {action === "update" && "Editar"}
          </Button>,
          <Button key="cancel" onClick={handleCancel} disabled={isSubmitting}>
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
              <Form.Item
                label="Categoria"
                required
                {...getFieldStatus("idCategory")}
              >
                <div onBlur={() => handleBlur("idCategory")}>
                  <CategoryList handleCategory={handleRoleChange} />
                </div>
              </Form.Item>

              <Form.Item
                label="Producto"
                required
                {...getFieldStatus("nameProduct")}
              >
                <Input
                  name="nameProduct"
                  value={productInfo.nameProduct}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("nameProduct")}
                  maxLength={100}
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
