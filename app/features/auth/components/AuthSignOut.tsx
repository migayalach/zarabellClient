import { useState } from "react";
import { Button, Modal } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useSignOut } from "../hooks/useSignOut";

function AuthSignOut() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const { signOutUser } = useSignOut();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setIsModalOpen(false);
      router.replace("/auth");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
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
          <Button key="submit" type="primary" danger onClick={handleSignOut}>
            Salir
          </Button>,

          <Button key="cancel" danger onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <p>¿Está seguro que desea salir?</p>
      </Modal>
    </>
  );
}

export default AuthSignOut;
