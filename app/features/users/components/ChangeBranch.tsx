import React, { useState } from "react";
import { Modal, Select } from "antd";
import { InteractionOutlined } from "@ant-design/icons";

const ChangeBranch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal} className="flex items-center gap-2">
        <InteractionOutlined />
        <span>Cambiar Sucursal</span>
      </button>
      <Modal
        title="Selecciona una sucursal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          allowClear
          options={[{ value: "lucy", label: "Lucy" }]}
          placeholder="select it"
        />
      </Modal>
    </>
  );
};

export default ChangeBranch;
