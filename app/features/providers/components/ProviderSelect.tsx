import { useEffect, useState } from "react";
import { Button, List, Skeleton, ConfigProvider, Modal, Input } from "antd";
import { useProviders } from "../../providers/hooks/useProvides";

interface DataType {
  idProvider: number;
  nameProvider: string;
}

function ProviderSelect({
  handleProvider,
}: {
  handleProvider: (idProvider: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const {
    getAllProviders,
    resetDataProvider,
    clearDataCurrentProvider,
    currentProvider,
    info,
    results,
  } = useProviders();

  const [index, setIndex] = useState({
    idProvider: 0,
    nameProvider: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
    setPage(1);
    setInitLoading(true);
    getAllProviders(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetDataProvider();
    // resetCurrentStateClient();
    setList([]);
    setPage(1);
    setInitLoading(false);
  };

  const fetchData = () => {
    const nextPage = page + 1;
    getAllProviders(nextPage);
    setPage(nextPage);
  };

  const handleChooseClient = (idProvider: number) => {
    const category = list.find((item) => item.idProvider === idProvider);
    if (!category) return;
    handleProvider(idProvider);
    setIndex({
      idProvider: category.idProvider,
      nameProvider: category.nameProvider,
    });
    if (currentProvider) {
      clearDataCurrentProvider();
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
    if (currentProvider) {
      setIndex({
        idProvider: currentProvider.idProvider,
        nameProvider: currentProvider.nameProvider,
      });
    }
  }, [currentProvider]);

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
            placeholder="Nombre proveedor"
            readOnly
            disabled
            value={index.nameProvider}
          />
          <Button className="ml-4" type="primary" onClick={showModal}>
            ...
          </Button>
        </div>

        <Modal
          title="Lista de proveedores"
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
                key={item.idProvider}
                actions={[
                  <a
                    key="select"
                    onClick={() => handleChooseClient(item.idProvider)}
                  >
                    Seleccionar
                  </a>,
                ]}
              >
                <Skeleton loading={false} active>
                  <div>{item.nameProvider}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Modal>
      </>
    </ConfigProvider>
  );
}

export default ProviderSelect;
