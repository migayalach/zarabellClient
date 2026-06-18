import { useEffect, useState } from "react";
import { Button, List, Skeleton, ConfigProvider, Modal, Input } from "antd";
import { useCategory } from "../hooks/useCategories";

interface DataType {
  idCategory: number;
  nameCategory: string;
}

function CategoryList({
  handleCategory,
}: {
  handleCategory: (idCategory: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const {
    getAllCategories,
    resetDataCategory,
    info,
    results,
    currentCategory,
    clearDataCurrentCategory,
  } = useCategory();
  const [index, setIndex] = useState({
    idCategory: 0,
    nameCategory: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
    setPage(1);
    setInitLoading(true);
    getAllCategories(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetDataCategory();
    // resetCurrentStateClient();
    setList([]);
    setPage(1);
    setInitLoading(false);
  };

  const fetchData = () => {
    const nextPage = page + 1;
    getAllCategories(nextPage);
    setPage(nextPage);
  };

  const handleChooseClient = (idCategory: number) => {
    const category = list.find((item) => item.idCategory === idCategory);
    if (!category) return;
    handleCategory(idCategory);
    setIndex({
      idCategory: category.idCategory,
      nameCategory: category.nameCategory,
    });
    if (currentCategory) {
      clearDataCurrentCategory();
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
    if (currentCategory) {
      setIndex({
        idCategory: currentCategory.idCategory,
        nameCategory: currentCategory.nameCategory,
      });
    }
  }, [currentCategory]);

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
            placeholder="Nombre categoria"
            readOnly
            disabled
            value={index.nameCategory}
          />
          <Button className="ml-4" type="primary" onClick={showModal}>
            ...
          </Button>
        </div>

        <Modal
          title="Lista de clientes"
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
                key={item.idCategory}
                actions={[
                  <a
                    key="select"
                    onClick={() => handleChooseClient(item.idCategory)}
                  >
                    Seleccionar
                  </a>,
                ]}
              >
                <Skeleton loading={false} active>
                  <div>{item.nameCategory}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Modal>
      </>
    </ConfigProvider>
  );
}

export default CategoryList;
