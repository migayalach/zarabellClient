"use client";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Switch } from "antd";
import { useInputRecord, useInputRecordActions } from "../hooks";
import type { DatePickerProps } from "antd";
import { useProducts } from "../../products/hooks/useProducts";
import { useProviders } from "../../providers/hooks/useProvides";
import { ProviderSelect } from "../../providers/components";
import { ProductList } from "../../products/components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

type IRecordInputForm = {
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
}: IRecordInputForm) {
  const canCreate = useHasPermission([1]);
  const canUpdate = useHasPermission([1]);
  const canDelete = useHasPermission([1]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentInputRecord } = useInputRecord();
  const {
    createNewInputRecord,
    updateInputRecord,
    deleteInputRecord,
    getOneInputRecordByID,
    clearCurrentInputRecord,
  } = useInputRecordActions();
  const { getAllProducts, getOneProduct, resetDataProduct } = useProducts();
  const { getAllProviders, getOneProvider, resetDataProvider } = useProviders();

  const [irecordInfo, setIrecord] = useState({
    idInputRecord: 0,
    idProduct: 0,
    idProvider: 0,
    idCategory: 0,
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
      idCategory: 0,
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
    clearCurrentInputRecord();
    resetDataProduct();
    resetDataProvider();
    resetInfoRecord();
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

  const onFinish = () => {
    if (action === "create") {
      createNewInputRecord(irecordInfo);
      setIsModalOpen(false);
      resetInfoRecord();
    }
    if (action === "update" && idInputRecord && idProduct && idProvider) {
      updateInputRecord(irecordInfo);
    }
    if (action === "delete" && idInputRecord) {
      deleteInputRecord(idInputRecord);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;
    if (action === "update" && idInputRecord && idProduct && idProvider) {
      getOneInputRecordByID(idInputRecord);
      getOneProduct(idProduct);
      getOneProvider(idProvider);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !currentInputRecord) return;
    setIrecord(currentInputRecord);
  }, [currentInputRecord, isModalOpen]);

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
            ? "Eliminar entrada"
            : action === "create"
              ? "Crear entrada"
              : "Editar entrada"
        }
      >
        <Button type="primary" onClick={showModal}>
          {action === "create" && <PlusOutlined />}
          {action === "delete" && <DeleteOutlined />}
          {action === "update" && <FormOutlined />}
        </Button>
      </CustomTooltip>

      <Modal
        title={`${text} entrada`}
        open={isModalOpen}
        onCancel={handleCancel}
        destroyOnHidden
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="inputInputRecordForm"
          >
            {action === "create" && "Crear"}
            {action === "delete" && "Eliminar"}
            {action === "update" && "Editar"}
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Form
          id="inputInputRecordForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          {action !== "delete" && (
            <>
              <Form.Item label="Proveedor">
                <ProviderSelect handleProvider={handleProviderChange} />
              </Form.Item>

              <Form.Item label="Producto">
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
        </Form>
      </Modal>
    </>
  );
}

export default InputRecordButtonModal;
