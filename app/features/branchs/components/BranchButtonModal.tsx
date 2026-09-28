"use client";
import { useState, useEffect, useMemo } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Switch, message } from "antd";
import { useBranchs, useBranchsActions } from "@/app/features/branchs/hooks";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

type IBranchForm = {
  text: string;
  action: string;
  idBranch?: number;
};

const initialBranchInfo = {
  idBranch: 0,
  nameBranch: "",
  address: "",
  phone: "",
  stateBranch: false,
};

type BranchInfo = typeof initialBranchInfo;
type ValidatedField = "nameBranch" | "address" | "phone";
type FieldErrors = Partial<Record<ValidatedField, string>>;

// Acepta un "+" opcional al inicio y entre 7 y 15 dígitos (sin contar espacios ni guiones)
const PHONE_REGEX = /^\+?\d{7,15}$/;

const validateBranch = (info: BranchInfo): FieldErrors => {
  const errors: FieldErrors = {};

  // "?? ''" evita errores si el backend devuelve algún campo en null
  const name = (info.nameBranch ?? "").trim();
  if (!name) {
    errors.nameBranch = "Ingresa el nombre de la sucursal";
  } else if (name.length < 3) {
    errors.nameBranch = "El nombre debe tener al menos 3 caracteres";
  } else if (name.length > 100) {
    errors.nameBranch = "El nombre no puede superar los 100 caracteres";
  }

  const address = (info.address ?? "").trim();
  if (!address) {
    errors.address = "Ingresa la dirección de la sucursal";
  } else if (address.length < 5) {
    errors.address = "La dirección debe tener al menos 5 caracteres";
  } else if (address.length > 150) {
    errors.address = "La dirección no puede superar los 150 caracteres";
  }

  const phone = (info.phone ?? "").replace(/[\s-]/g, "");
  if (!phone) {
    errors.phone = "Ingresa el celular o teléfono de la sucursal";
  } else if (!PHONE_REGEX.test(phone)) {
    errors.phone = "Usa solo números, entre 7 y 15 dígitos";
  }

  return errors;
};

function BranchButtonModal({ text, action, idBranch }: IBranchForm) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentBranch } = useBranchs();
  const {
    createNewBranch,
    getOneBranchByID,
    updateBranch,
    deleteBranch,
    clearCurrentBranch,
  } = useBranchsActions();

  const [branchInfo, setBranchInfo] = useState(initialBranchInfo);
  // Solo mostramos el error de un campo después de que el usuario lo tocó
  const [touched, setTouched] = useState<
    Partial<Record<ValidatedField, boolean>>
  >({});

  const errors = useMemo(() => validateBranch(branchInfo), [branchInfo]);
  const isFormValid = Object.keys(errors).length === 0;
  const requiresValidation = action !== "delete";

  const resetBranchInfo = () => {
    setBranchInfo(initialBranchInfo);
    setTouched({});
  };

  const showModal = () => {
    if (action === "create") {
      clearCurrentBranch();
      resetBranchInfo();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearCurrentBranch();
    resetBranchInfo();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setBranchInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBlur = (field: ValidatedField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleStateChange = (checked: boolean) => {
    setBranchInfo((prev) => ({
      ...prev,
      stateBranch: checked,
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
      setTouched({ nameBranch: true, address: true, phone: true });
      return;
    }

    // Enviamos los datos sin espacios sobrantes
    const cleanBranchInfo: BranchInfo = {
      ...branchInfo,
      nameBranch: (branchInfo.nameBranch ?? "").trim(),
      address: (branchInfo.address ?? "").trim(),
      phone: (branchInfo.phone ?? "").trim(),
    };

    setIsSubmitting(true);
    try {
      if (action === "create") {
        await createNewBranch(cleanBranchInfo);
        message.success("Sucursal creada correctamente");
        setIsModalOpen(false);
        resetBranchInfo();
      }

      if (action === "update") {
        await updateBranch(cleanBranchInfo);
        message.success("Sucursal actualizada correctamente");
        // setIsModalOpen(false);
        // clearCurrentBranch();
        // resetBranchInfo();
      }

      if (action === "delete" && idBranch) {
        await deleteBranch(idBranch);
        message.success("Sucursal eliminada correctamente");
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

    if (action === "update" && idBranch) {
      getOneBranchByID(idBranch);
    }
  }, [isModalOpen, action, idBranch]);

  useEffect(() => {
    if (!isModalOpen || action !== "update" || !currentBranch) return;
    setBranchInfo(currentBranch);
  }, [currentBranch, isModalOpen, action]);

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
            ? "Eliminar sucursal"
            : action === "create"
              ? "Crear sucursal"
              : "Editar sucursal"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "delete" && <DeleteOutlined />}
          {action === "create" && <PlusOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} sucursal`}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnHidden
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="branchForm"
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
          id="branchForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          {action !== "delete" && (
            <>
              <Form.Item
                label="Nombre"
                required
                {...getFieldStatus("nameBranch")}
              >
                <Input
                  name="nameBranch"
                  value={branchInfo.nameBranch}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("nameBranch")}
                  maxLength={100}
                />
              </Form.Item>

              <Form.Item
                label="Dirección"
                required
                {...getFieldStatus("address")}
              >
                <Input
                  name="address"
                  value={branchInfo.address}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("address")}
                  maxLength={150}
                />
              </Form.Item>

              <Form.Item
                label="Celular/Telefono"
                required
                {...getFieldStatus("phone")}
              >
                <Input
                  name="phone"
                  value={branchInfo.phone}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("phone")}
                  inputMode="tel"
                  maxLength={20}
                />
              </Form.Item>

              {action === "update" && (
                <Form.Item label="Sucursal">
                  <Switch
                    checked={branchInfo.stateBranch}
                    onChange={handleStateChange}
                  />
                </Form.Item>
              )}
            </>
          )}

          {action === "delete" && (
            <h1>Esta seguro que desea eliminar a esta sucursal</h1>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default BranchButtonModal;
