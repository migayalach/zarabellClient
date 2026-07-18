"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Switch } from "antd";
import { useCreateInputRecords } from "../hooks/useCreateInputRecord";
import { useUpdateInputRecords } from "../hooks/useUpdateInputRecord";
import { useInputRecordActions } from "../hooks/useInputRecordActions";
import { useDeleteRecordByID } from "../hooks/useDeleteInputRecord";
import { useInputRecordByID } from "../hooks/useInputRecord";
import type { DatePickerProps } from "antd";
import { useProducts } from "../../products/hooks/useProducts";
import { useProviders } from "../../providers/hooks/useProvides";
import { ProviderSelect } from "../../providers/components";
import { ProductList } from "../../products/components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

type IUserForm = {
  text: string;
  action: string;
  idInputRecord?: number;
  idProduct?: number;
  idProvider?: number;
};

function InputRecordButtonModal({
  text,
  action,
  idInputRecord,
  idProduct,
  idProvider,
}: IUserForm) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createRecordInput } = useCreateInputRecords();
  const { updateRecordInput } = useUpdateInputRecords();
  const { deleteRecordInputByID } = useDeleteRecordByID();
  const { getAllProducts, getOneProduct } = useProducts();
  const { getAllProviders, getOneProvider } = useProviders();
  const { clearCurrentData } = useInputRecordActions();
  const { getRecordInputByID, currentInputRecord } = useInputRecordByID();

  const [irecordInfo, setIrecord] = useState({
    idInputRecord: 0,
    idProduct: 0,
    idProvider: 0,
    nameProvider: "",
    nameCategory: "",
    nameProduct: "",
    dateInputRecord: "",
    expirationDateIRecord: "",
    countIRecord: 0,
    priceBuyIRecord: 0,
    statusIRecord: false,
  });

  const resetInfoRecord = () => {
    setIrecord({
      idInputRecord: 0,
      idProduct: 0,
      idProvider: 0,
      nameProvider: "",
      nameCategory: "",
      nameProduct: "",
      dateInputRecord: "",
      expirationDateIRecord: "",
      countIRecord: 0,
      priceBuyIRecord: 0,
      statusIRecord: false,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
    getAllProducts();
    getAllProviders();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearCurrentData();
  };

  const onFinish = async () => {
    if (action === "create") {
      createRecordInput(irecordInfo);
      setIsModalOpen(false);
      resetInfoRecord();
    }
    if (action === "update") {
      updateRecordInput(irecordInfo);
    }
    if (action === "delete" && idInputRecord) {
      deleteRecordInputByID(idInputRecord);
      setIsModalOpen(false);
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIrecord((prev) => ({
      ...prev,
      [name]:
        name === "countIRecord"
          ? Number.parseInt(value, 10) || 0
          : name === "priceBuyIRecord"
            ? Number.parseFloat(value) || 0
            : value,
    }));
  };

  const handleStateChange = (checked: boolean) => {
    setIrecord((prev) => ({
      ...prev,
      statusIRecord: checked,
    }));
  };

  const handleProviderChange = (value: number) => {
    setIrecord((prev) => ({
      ...prev,
      idProvider: value,
    }));
  };

  const handleProductChange = (value: number) => {
    setIrecord((prev) => ({
      ...prev,
      idProduct: value,
    }));
  };

  const onChangeDate =
    (field: keyof typeof irecordInfo): DatePickerProps["onChange"] =>
    (date) => {
      setIrecord((prev) => ({
        ...prev,
        [field]: date && !Array.isArray(date) ? date.format("YYYY-MM-DD") : "",
      }));
    };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idInputRecord && idProduct && idProvider) {
      getRecordInputByID(idInputRecord);
      getOneProduct(idProduct);
      getOneProvider(idProvider);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentInputRecord) return;
    requestAnimationFrame(() => {
      setIrecord(currentInputRecord);
    });
  }, [currentInputRecord, isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {action === "delete" && <DeleteOutlined />}
        {action === "create" && <PlusOutlined />}
        {action === "update" && <FormOutlined />}
      </Button>

      <Modal
        title={`${text} entrada`}
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
                <Form.Item label="Proveedor" name="provider">
                  <ProviderSelect handleProvider={handleProviderChange} />
                </Form.Item>

                <Form.Item label="Producto" name="product">
                  <ProductList handleProduct={handleProductChange} />
                </Form.Item>

                <Form.Item label="Fecha de entrada">
                  <DatePicker
                    value={
                      irecordInfo.dateInputRecord
                        ? dayjs(irecordInfo.dateInputRecord)
                        : null
                    }
                    onChange={onChangeDate("dateInputRecord")}
                    minDate={dayjs("2025-01-01", dateFormat)}
                    maxDate={dayjs("2030-12-31", dateFormat)}
                  />
                </Form.Item>

                <Form.Item label="Fecha de vencimiento">
                  <DatePicker
                    value={
                      irecordInfo.expirationDateIRecord
                        ? dayjs(irecordInfo.expirationDateIRecord)
                        : null
                    }
                    onChange={onChangeDate("expirationDateIRecord")}
                    minDate={dayjs("2025-01-01", dateFormat)}
                    maxDate={dayjs("2030-12-31", dateFormat)}
                  />
                </Form.Item>

                <Form.Item label="Cantidad">
                  <Input
                    type="number"
                    name="countIRecord"
                    value={irecordInfo.countIRecord}
                    onChange={handleChangeInput}
                  />
                </Form.Item>

                <Form.Item label="Precio de compra">
                  <Input
                    type="number"
                    step="0.01"
                    name="priceBuyIRecord"
                    value={irecordInfo.priceBuyIRecord}
                    onChange={handleChangeInput}
                  />
                </Form.Item>
              </>
            )}
            {action === "update" && (
              <Form.Item label="Estado">
                <Switch
                  checked={irecordInfo.statusIRecord}
                  onChange={handleStateChange}
                />
              </Form.Item>
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

export default InputRecordButtonModal;
