"use client";
import { useState, useEffect, useMemo } from "react";
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
const MIN_DATE = dayjs("2025-01-01", dateFormat);
const MAX_DATE = dayjs("2030-12-31", dateFormat);

type IRecordInputForm = {
  text: string;
  action: string;
  idInputRecord?: number;
  idProduct?: number;
  idProvider?: number;
};

const initialInputRecordInfo = {
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
};

type InputRecordInfo = typeof initialInputRecordInfo;
type ValidatedField =
  | "idProvider"
  | "idProduct"
  | "dateInputRecord"
  | "expirationDateIRecord"
  | "countIRecord"
  | "priceBuyIRecord";
type FieldErrors = Partial<Record<ValidatedField, string>>;

const ALL_FIELDS_TOUCHED: Record<ValidatedField, boolean> = {
  idProvider: true,
  idProduct: true,
  dateInputRecord: true,
  expirationDateIRecord: true,
  countIRecord: true,
  priceBuyIRecord: true,
};

const validateInputRecord = (info: InputRecordInfo): FieldErrors => {
  const errors: FieldErrors = {};

  if (!info.idProvider) {
    errors.idProvider = "Selecciona un proveedor";
  }

  if (!info.idProduct) {
    errors.idProduct = "Selecciona un producto";
  }

  if (!info.dateInputRecord) {
    errors.dateInputRecord = "Selecciona la fecha de entrada";
  }

  if (!info.expirationDateIRecord) {
    errors.expirationDateIRecord = "Selecciona la fecha de vencimiento";
  } else if (
    info.dateInputRecord &&
    dayjs(info.expirationDateIRecord).isBefore(
      dayjs(info.dateInputRecord),
      "day",
    )
  ) {
    errors.expirationDateIRecord =
      "El vencimiento no puede ser anterior a la fecha de entrada";
  }

  if (!Number.isInteger(info.countIRecord) || info.countIRecord <= 0) {
    errors.countIRecord = "La cantidad debe ser un número entero mayor a 0";
  }

  if (!(info.priceBuyIRecord > 0)) {
    errors.priceBuyIRecord = "El precio de compra debe ser mayor a 0";
  }

  return errors;
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

  const [irecordInfo, setIrecord] = useState(initialInputRecordInfo);
  // Solo mostramos el error de un campo después de que el usuario lo tocó
  const [touched, setTouched] = useState<
    Partial<Record<ValidatedField, boolean>>
  >({});

  const errors = useMemo(() => validateInputRecord(irecordInfo), [irecordInfo]);
  const isFormValid = Object.keys(errors).length === 0;
  const requiresValidation = action !== "delete";

  const resetInfoRecord = () => {
    setIrecord(initialInputRecordInfo);
    setTouched({});
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

  const handleBlur = (field: ValidatedField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
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
    handleBlur("idProvider");
  };

  const handleProductChange = (value: number) => {
    setIrecord((prev) => ({
      ...prev,
      idProduct: value,
    }));
    handleBlur("idProduct");
  };

  const onChangeDate =
    (
      field: "dateInputRecord" | "expirationDateIRecord",
    ): DatePickerProps["onChange"] =>
    (date) => {
      setIrecord((prev) => ({
        ...prev,
        [field]: date && !Array.isArray(date) ? date.format("YYYY-MM-DD") : "",
      }));
      handleBlur(field);
    };

  // Devuelve el estado y el mensaje que espera Form.Item para cada campo
  const getFieldStatus = (field: ValidatedField) => {
    const hasError = touched[field] && errors[field];
    return {
      validateStatus: hasError ? ("error" as const) : ("" as const),
      help: hasError ? errors[field] : undefined,
    };
  };

  const onFinish = () => {
    // Protección extra: aunque el botón esté deshabilitado, Enter no debe enviar datos inválidos
    if (requiresValidation && !isFormValid) {
      setTouched(ALL_FIELDS_TOUCHED);
      return;
    }

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
            disabled={requiresValidation && !isFormValid}
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
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
        >
          {action !== "delete" && (
            <>
              <Form.Item
                label="Proveedor"
                required
                {...getFieldStatus("idProvider")}
              >
                <div onBlur={() => handleBlur("idProvider")}>
                  <ProviderSelect handleProvider={handleProviderChange} />
                </div>
              </Form.Item>

              <Form.Item
                label="Producto"
                required
                {...getFieldStatus("idProduct")}
              >
                <div onBlur={() => handleBlur("idProduct")}>
                  <ProductList handleProduct={handleProductChange} />
                </div>
              </Form.Item>

              <Form.Item
                label="Fecha de entrada"
                required
                {...getFieldStatus("dateInputRecord")}
              >
                <DatePicker
                  value={
                    irecordInfo.dateInputRecord
                      ? dayjs(irecordInfo.dateInputRecord)
                      : null
                  }
                  onChange={onChangeDate("dateInputRecord")}
                  onBlur={() => handleBlur("dateInputRecord")}
                  minDate={MIN_DATE}
                  maxDate={MAX_DATE}
                />
              </Form.Item>

              <Form.Item
                label="Fecha de vencimiento"
                required
                {...getFieldStatus("expirationDateIRecord")}
              >
                <DatePicker
                  value={
                    irecordInfo.expirationDateIRecord
                      ? dayjs(irecordInfo.expirationDateIRecord)
                      : null
                  }
                  onChange={onChangeDate("expirationDateIRecord")}
                  onBlur={() => handleBlur("expirationDateIRecord")}
                  // No permite elegir un vencimiento anterior a la fecha de entrada
                  minDate={
                    irecordInfo.dateInputRecord
                      ? dayjs(irecordInfo.dateInputRecord)
                      : MIN_DATE
                  }
                  maxDate={MAX_DATE}
                />
              </Form.Item>

              <Form.Item
                label="Cantidad"
                required
                {...getFieldStatus("countIRecord")}
              >
                <Input
                  type="number"
                  min={1}
                  step={1}
                  name="countIRecord"
                  value={irecordInfo.countIRecord}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("countIRecord")}
                />
              </Form.Item>

              <Form.Item
                label="Precio de compra"
                required
                {...getFieldStatus("priceBuyIRecord")}
              >
                <Input
                  type="number"
                  min={0.01}
                  step="0.01"
                  name="priceBuyIRecord"
                  value={irecordInfo.priceBuyIRecord}
                  onChange={handleChangeInput}
                  onBlur={() => handleBlur("priceBuyIRecord")}
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
