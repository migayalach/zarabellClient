"use client";
import { useState, useEffect } from "react";
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

function BranchButtonModal({ text, action, idBranch }: IBranchForm) {
  const canCreate = useHasPermission([1, 2]);
  const canUpdate = useHasPermission([1, 2]);
  const canDelete = useHasPermission([1, 2]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentBranch } = useBranchs();
  const {
    createNewBranch,
    getOneBranchByID,
    updateBranch,
    deleteBranch,
    clearCurrentBranch,
  } = useBranchsActions();

  const [branchInfo, setBranchInfo] = useState(initialBranchInfo);

  const resetBranchInfo = () => {
    setBranchInfo(initialBranchInfo);
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

  const handleStateChange = (checked: boolean) => {
    setBranchInfo((prev) => ({
      ...prev,
      stateBranch: checked,
    }));
  };

  const onFinish = async () => {
    try {
      if (action === "create") {
        await createNewBranch(branchInfo);
        message.success("Sucursal creada correctamente");
        setIsModalOpen(false);
        resetBranchInfo();
      }

      if (action === "update") {
        await updateBranch(branchInfo);
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
          id="branchForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          {action !== "delete" && (
            <>
              <Form.Item label="Nombre">
                <Input
                  name="nameBranch"
                  value={branchInfo.nameBranch}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item label="Dirección">
                <Input
                  name="address"
                  value={branchInfo.address}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item label="Celular/Telefono">
                <Input
                  name="phone"
                  value={branchInfo.phone}
                  onChange={handleChangeInput}
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
