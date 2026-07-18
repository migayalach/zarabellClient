"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useOutputHistory, useOutputHistoryActions } from "../hooks/index";
import { usePagInputRecords } from "@/app/features/inputRecord/hooks/useInputRecordPagination";
import { InputRecordListDetail } from "../../inputRecord/components";
import { useInputRecordByID } from "../../inputRecord/hooks/useInputRecord";

type IOutputHistoryForm = {
  text: string;
  action: string;
  idOutput: number;
  idInputRecord?: number;
};

function OutputHistoryModalAction({
  text,
  action,
  idOutput,
  idInputRecord,
}: IOutputHistoryForm) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pagRecordInput } = usePagInputRecords();
  const { currentOutputHistory } = useOutputHistory();
  const {
    clearCurrentOutputHistory,
    getByIDOutputHistory,
    createNewOutputHistory,
    updateOutputHistory,
    deleteOutputHistory,
  } = useOutputHistoryActions();
  const { getRecordInputByID } = useInputRecordByID();

  const [outputHisInfo, setOutputHis] = useState({
    idOutput: 0,
    idInputRecord: 0,
    nameProduct: "",
    quantity: 0,
    totalPrice: 0,
  });

  const resetOutputHistory = () => {
    setOutputHis({
      idOutput: 0,
      idInputRecord: 0,
      nameProduct: "",
      quantity: 0,
      totalPrice: 0,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    pagRecordInput();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearCurrentOutputHistory();
  };

  const onFinish = () => {
    if (action === "create") {
      createNewOutputHistory({
        ...outputHisInfo,
        idOutput,
      });
      setIsModalOpen(false);
      resetOutputHistory();
    }
    if (action === "update") {
      updateOutputHistory(outputHisInfo);
    }
    if (action === "delete" && idOutput && idInputRecord) {
      deleteOutputHistory(idOutput, idInputRecord);
      setIsModalOpen(false);
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOutputHis((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleInputRecord = (value: number) => {
    setOutputHis((prev) => ({
      ...prev,
      idInputRecord: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idInputRecord && idOutput) {
      getByIDOutputHistory(idOutput, idInputRecord);
      // getRecordInputByID();
      pagRecordInput();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentOutputHistory) return;
    setOutputHis(currentOutputHistory);
  }, [currentOutputHistory, isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {action === "delete" && <DeleteOutlined />}
        {action === "create" && <PlusOutlined />}
        {action === "update" && <FormOutlined />}
      </Button>

      <Modal
        title={`${text} salida`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="inputRecordForm"
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
          id="inputRecordForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          <>
            {action !== "delete" && (
              <>
                <Form.Item label="Lote" name="lote">
                  <InputRecordListDetail
                    handleInputRecord={handleInputRecord}
                  />
                </Form.Item>

                <Form.Item label="Cantidad">
                  <Input
                    type="number"
                    name="quantity"
                    value={outputHisInfo.quantity}
                    onChange={handleChangeInput}
                  />
                </Form.Item>
              </>
            )}

            {action === "delete" && (
              <h1>¿Esta seguro que desea eliminar a este registro?</h1>
            )}
          </>
        </Form>
      </Modal>
    </>
  );
}

export default OutputHistoryModalAction;
