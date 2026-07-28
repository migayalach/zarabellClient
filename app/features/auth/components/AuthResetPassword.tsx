"use client";

import { useState } from "react";
import { Button, Modal, message } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useResetPassword } from "../hooks/useResetPassword";
import CustomTooltip from "@/app/shared/components/CustomTooltip";

function AuthResetPassword({ idUser }: { idUser: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useResetPassword();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    if (loading) return;
    setIsModalOpen(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      const result = await resetPassword(idUser);

      if (result.success) {
        message.success("Contraseña restablecida con éxito");
      } else {
        message.error("No se pudo restablecer la contraseña");
      }
    } catch {
      message.error("No se pudo restablecer la contraseña");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <CustomTooltip text="Restablecer contraseña">
        <Button type="primary" onClick={showModal}>
          <RedoOutlined />
        </Button>
      </CustomTooltip>

      <Modal
        title="Restablecer contraseña"
        open={isModalOpen}
        closable={!loading}
        mask={{ closable: !loading }}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            disabled={loading}
            onClick={handleResetPassword}
          >
            Realizar
          </Button>,
          <Button key="cancel" onClick={handleCancel} disabled={loading}>
            Cancelar
          </Button>,
        ]}
      >
        <p>¿Está seguro que desea restablecer la contraseña?</p>
      </Modal>
    </>
  );
}

export default AuthResetPassword;
