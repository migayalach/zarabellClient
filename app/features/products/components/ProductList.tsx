import { useEffect, useState } from "react";
import { Button, List, Skeleton, ConfigProvider, Modal, Input } from "antd";
import { useProducts } from "../../products/hooks/useProducts";

interface DataType {
  idProduct: number;
  nameProduct: string;
}

function ProductList({
  handleProduct,
}: {
  handleProduct: (idProduct: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const {
    getAllProducts,
    resetDataProduct,
    clearDataCurrentProduct,
    currentProduct,
    info,
    results,
  } = useProducts();

  const [index, setIndex] = useState({
    idProduct: 0,
    nameProduct: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
    setPage(1);
    setInitLoading(true);
    getAllProducts(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetDataProduct();
    // resetCurrentStateClient();
    setList([]);
    setPage(1);
    setInitLoading(false);
  };

  const fetchData = () => {
    const nextPage = page + 1;
    getAllProducts(nextPage);
    setPage(nextPage);
  };

  const handleChooseClient = (idProduct: number) => {
    const category = list.find((item) => item.idProduct === idProduct);
    if (!category) return;
    handleProduct(idProduct);
    setIndex({
      idProduct: category.idProduct,
      nameProduct: category.nameProduct,
    });
    if (currentProduct) {
      clearDataCurrentProduct();
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
    if (currentProduct) {
      setIndex({
        idProduct: currentProduct.idProduct,
        nameProduct: currentProduct.nameProduct,
      });
    }
  }, [currentProduct]);

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
            placeholder="Nombre producto"
            readOnly
            disabled
            value={index.nameProduct}
          />
          <Button className="ml-4" type="primary" onClick={showModal}>
            ...
          </Button>
        </div>

        <Modal
          title="Lista de productos"
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
                key={item.idProduct}
                actions={[
                  <a
                    key="select"
                    onClick={() => handleChooseClient(item.idProduct)}
                  >
                    Seleccionar
                  </a>,
                ]}
              >
                <Skeleton loading={false} active>
                  <div>{item.nameProduct}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Modal>
      </>
    </ConfigProvider>
  );
}

export default ProductList;
