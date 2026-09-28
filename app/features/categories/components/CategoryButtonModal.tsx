"use client";
import { useState, useEffect, useMemo } from "react";
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

type CategoryInfo = typeof initialCategoryInfo;
type ValidatedField = "nameCategory";
type FieldErrors = Partial<Record<ValidatedField, string>>;

const validateCategory = (info: CategoryInfo): FieldErrors => {
  const errors: FieldErrors = {};

  // "?? ''" evita errores si el backend devuelve el campo en null
  const name = (info.nameCategory ?? "").trim();
  if (!name) {
    errors.nameCategory = "Ingresa el nombre de la categoría";
  } else if (name.length < 3) {
    errors.nameCategory = "El nombre debe tener al menos 3 caracteres";
  } else if (name.length > 100) {
    errors.nameCategory = "El nombre no puede superar los 100 caracteres";
  }

  return errors;
};

function CategoryButtonModal({ text, action, idCategory }: IUserForm) {
  const canCreate = useHasPermission([1]);
  const canUpdate = useHasPermission([1]);
  const canDelete = useHasPermission([1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    createNewCategory,
    getOneCategory,
    updateOneCategory,
    deleteOneCategory,
    currentCategory,
    clearDataCurrentCategory,
  } = useCategory();

  const [categoryInfo, setCategoryInfo] = useState(initialCategoryInfo);
  // Solo mostramos el error de un campo después de que el usuario lo tocó
  const [touched, setTouched] = useState<
    Partial<Record<ValidatedField, boolean>>
  >({});

  const errors = useMemo(() => validateCategory(categoryInfo), [categoryInfo]);
  const isFormValid = Object.keys(errors).length === 0;
  const requiresValidation = action !== "delete";

  const resetCategoryInfo = () => {
    setCategoryInfo(initialCategoryInfo);
    setTouched({});
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

  const handleBlur = (field: ValidatedField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleStateChange = (checked: boolean) => {
    setCategoryInfo((prev) => ({
      ...prev,
      stateCategory: checked,
    }));
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
      setTouched({ nameCategory: true });
      return;
    }

    // Enviamos el nombre sin espacios sobrantes
    const cleanCategoryInfo: CategoryInfo = {
      ...categoryInfo,
      nameCategory: (categoryInfo.nameCategory ?? "").trim(),
    };

    setIsSubmitting(true);
    try {
      if (action === "create") {
        await createNewCategory(cleanCategoryInfo.nameCategory);
        message.success("Categoría creada correctamente");
        setIsModalOpen(false);
        resetCategoryInfo();
      }

      if (action === "update") {
        await updateOneCategory(cleanCategoryInfo);
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
    } finally {
      setIsSubmitting(false);
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
          id="categoryForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          {action !== "delete" && (
            <>
              <Form.Item
                label="Nombres"
                required
                {...getFieldStatus("nameCategory")}
              >
                <Input
                  name="nameCategory"
                  value={categoryInfo.nameCategory}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("nameCategory")}
                  maxLength={100}
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
