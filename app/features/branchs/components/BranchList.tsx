import { useEffect, useState } from "react";
import { Button, List, Skeleton, ConfigProvider, Modal, Input } from "antd";
import { useBranchs, useBranchsActions } from "../hooks";

interface DataType {
  idBranch: number;
  nameBranch: string;
}

function BranchList({
  handleBranch,
}: {
  handleBranch: (idBranch: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);

  const { info, results, currentBranch } = useBranchs();
  const { resetBranch, getAllBranchs, clearCurrentBranch } =
    useBranchsActions();

  const [index, setIndex] = useState({
    idBranch: 0,
    nameBranch: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
    setPage(1);
    setInitLoading(true);
    getAllBranchs(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetBranch();
    setList([]);
    setPage(1);
    setInitLoading(false);
  };

  const fetchData = () => {
    const nextPage = page + 1;
    getAllBranchs(nextPage);
    setPage(nextPage);
  };

  const handleChooseBranch = (idBranch: number) => {
    const branch = list.find((item) => item.idBranch === idBranch);
    if (!branch) return;
    handleBranch(idBranch);
    setIndex({
      idBranch: branch.idBranch,
      nameBranch: branch.nameBranch,
    });
    if (currentBranch) {
      clearCurrentBranch();
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
    if (!currentBranch) {
      setIndex({
        idBranch: 0,
        nameBranch: "",
      });
    }

    if (currentBranch) {
      setIndex({
        idBranch: currentBranch.idBranch,
        nameBranch: currentBranch.nameBranch,
      });
    }
  }, [currentBranch]);

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
            placeholder="Sucursal"
            readOnly
            disabled
            value={index.nameBranch}
          />
          <Button className="ml-4" type="primary" onClick={showModal}>
            ...
          </Button>
        </div>

        <Modal
          title="Lista de sucursales"
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
                key={item.idBranch}
                actions={[
                  <a
                    key="select"
                    onClick={() => handleChooseBranch(item.idBranch)}
                  >
                    Seleccionar
                  </a>,
                ]}
              >
                <Skeleton loading={false} active>
                  <div>{item.nameBranch}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Modal>
      </>
    </ConfigProvider>
  );
}

export default BranchList;
