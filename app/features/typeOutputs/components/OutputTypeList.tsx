import { useEffect, useState } from "react";
import { Button, List, Skeleton, ConfigProvider, Modal, Input } from "antd";
import { useTOutputs } from "../hooks/useTypeOutputs";

interface DataType {
  idTypeOutput: number;
  nameTypeOutput: string;
}

function OutputTypeList({
  handleTypeOutput,
}: {
  handleTypeOutput: (idUser: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const { currentTOutput, getAllTOutputs, info, results } = useTOutputs();

  const [index, setIndex] = useState({
    idTypeOutput: 0,
    nameTypeOutput: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
    setPage(1);
    setInitLoading(true);
    getAllTOutputs(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = () => {
    const nextPage = page + 1;
    getAllTOutputs(nextPage);
    setPage(nextPage);
  };

  const handleChooseTOutput = (idTypeOutput: number) => {
    const data = list.find((item) => item.idTypeOutput === idTypeOutput);
    if (!data) return;

    setIndex({
      idTypeOutput: data.idTypeOutput,
      nameTypeOutput: data.nameTypeOutput,
    });

    handleTypeOutput(idTypeOutput);

    setIsModalOpen(false);
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
    if (!currentTOutput) {
      setIndex({
        idTypeOutput: 0,
        nameTypeOutput: "",
      });
    }

    if (currentTOutput) {
      setIndex({
        idTypeOutput: currentTOutput.idTypeOutput,
        nameTypeOutput: currentTOutput.nameTypeOutput,
      });
    }
  }, [currentTOutput]);

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
            placeholder="Tipo de salidas"
            readOnly
            disabled
            value={index.nameTypeOutput}
          />
          <Button className="ml-4" type="primary" onClick={showModal}>
            ...
          </Button>
        </div>

        <Modal
          title="Lista de salidas"
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
                key={item.idTypeOutput}
                actions={[
                  <a
                    key="select"
                    onClick={() => handleChooseTOutput(item.idTypeOutput)}
                  >
                    Seleccionar
                  </a>,
                ]}
              >
                <Skeleton loading={false} active>
                  <div>{item.nameTypeOutput}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Modal>
      </>
    </ConfigProvider>
  );
}

export default OutputTypeList;
