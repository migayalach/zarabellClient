import { useEffect, useState } from "react";
import { Button, List, Skeleton, ConfigProvider, Modal, Input } from "antd";
import { IRecordInput } from "../types";
import InputRecordButtonModal from "./InputRecordButtonModal";
import InputRecordBtnAction from "./InputRecordBtnAction";
import { usePagInputRecords } from "../hooks/useInputRecordPagination";
import { useInputRecordByID } from "../hooks/useInputRecord";
import { useInputRecordActions } from "../hooks/useInputRecordActions";

type DataType = {
  idInputRecord: number;
  idCategory: number;
  idProduct: number;
  idProvider: number;
  nameProvider: string;
  nameCategory: string;
  nameProduct: string;
  dateInputRecord: string;
  expirationDateIRecord: string;
  countIRecord: number;
  priceBuyIRecord: number;
  statusIRecord: boolean;
};

function InputRecordListDetail({
  handleInputRecord,
}: {
  handleInputRecord: (idInputRecord: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const { pagRecordInput, results, info } = usePagInputRecords();
  const { currentInputRecord } = useInputRecordByID();
  const { clearCurrentData } = useInputRecordActions();
  const [index, setIndex] = useState({
    idInputRecord: 0,
    idCategory: 0,
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

  const showModal = () => {
    setIsModalOpen(true);
    setPage(1);
    setInitLoading(true);
    pagRecordInput(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    pagRecordInput();
    setList([]);
    setPage(1);
    setInitLoading(false);
  };

  const fetchData = () => {
    const nextPage = page + 1;
    pagRecordInput(nextPage);
    setPage(nextPage);
  };

  const handleChooseInputRecord = (idInputRecord: number) => {
    const data = list.find((item) => item.idInputRecord === idInputRecord);
    if (!data) return;
    handleInputRecord(idInputRecord);
    setIndex({
      idInputRecord: data.idInputRecord,
      idCategory: data.idCategory,
      idProduct: data.idProduct,
      idProvider: data.idProvider,
      nameProvider: data.nameProvider,
      nameCategory: data.nameCategory,
      nameProduct: data.nameProduct,
      dateInputRecord: data.dateInputRecord,
      expirationDateIRecord: data.expirationDateIRecord,
      countIRecord: data.countIRecord,
      priceBuyIRecord: data.priceBuyIRecord,
      statusIRecord: data.statusIRecord,
    });
    if (currentInputRecord) {
      clearCurrentData();
    }
    closeModal();
  };

  useEffect(() => {
    if (page === 1) {
      setList(results);
    } else {
      setList((prev) => [...prev, ...results]);
    }
    setInitLoading(false);
  }, [results, page]);

  useEffect(() => {
    if (currentInputRecord) {
      setIndex({
        idInputRecord: currentInputRecord.idInputRecord,
        idCategory: currentInputRecord.idCategory,
        idProduct: currentInputRecord.idProduct,
        idProvider: currentInputRecord.idProvider,
        nameProvider: currentInputRecord.nameProvider,
        nameCategory: currentInputRecord.nameCategory,
        nameProduct: currentInputRecord.nameProduct,
        dateInputRecord: currentInputRecord.dateInputRecord,
        expirationDateIRecord: currentInputRecord.expirationDateIRecord,
        countIRecord: currentInputRecord.countIRecord,
        priceBuyIRecord: currentInputRecord.priceBuyIRecord,
        statusIRecord: currentInputRecord.statusIRecord,
      });
    }
  }, [currentInputRecord]);

  const loadMore =
    !initLoading && page < (info?.pages || 1) ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={fetchData}>Cargar más</Button>
      </div>
    ) : null;

  return (
    <ConfigProvider
      warning={{
        strict: false,
      }}
    >
      <>
        <div className="flex flex-row">
          <Input
            placeholder="Lote"
            readOnly
            disabled
            value={index.nameCategory}
          />
          <Button className="ml-4" type="primary" onClick={showModal}>
            ...
          </Button>
        </div>

        <Modal
          title="Lista de categorias"
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
        >
          <List
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                key={item.idInputRecord}
                actions={[
                  <a
                    key="select"
                    onClick={() => handleChooseInputRecord(item.idInputRecord)}
                  >
                    Seleccionar
                  </a>,
                ]}
              >
                <Skeleton loading={false} active>
                  <div>{item.nameCategory}</div>
                  <div>{item.nameProduct}</div>
                  <div>{item.countIRecord}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Modal>
      </>
    </ConfigProvider>
  );
}

export default InputRecordListDetail;
