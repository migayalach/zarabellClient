import { useState } from "react";
import { Button, Modal } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

function AuthSignOut() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal} className="flex items-center gap-2">
        <LogoutOutlined />
        <span>Salir</span>
      </button>

      <Modal
        title="Cerrar sesión"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" danger>
            Salir
          </Button>,
          <Button key="cancel" danger onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <p>¿Esta seguro que desea salir?</p>
      </Modal>
    </>
  );
}

export default AuthSignOut;
