import { useEffect, useState } from "react";
import { Button, List, Skeleton, ConfigProvider, Modal, Input } from "antd";
import { useUsers } from "../hooks/useUsers";

interface DataType {
  idUser: number;
  nameUser: string;
}

function UserList({ handleUser }: { handleUser: (idUser: number) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const {
    clearDataCurrentUser,
    currentUser,
    getAllUsers,
    info,
    resetDataUser,
    results,
  } = useUsers();

  const [index, setIndex] = useState({
    idUser: 0,
    nameUser: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
    setPage(1);
    setInitLoading(true);
    getAllUsers(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetDataUser();
    setList([]);
    setPage(1);
    setInitLoading(false);
  };

  const fetchData = () => {
    const nextPage = page + 1;
    getAllUsers(nextPage);
    setPage(nextPage);
  };

  const handleChooseClient = (idUser: number) => {
    const category = list.find((item) => item.idUser === idUser);
    if (!category) return;
    handleUser(idUser);
    setIndex({
      idUser: category.idUser,
      nameUser: category.nameUser,
    });
    if (currentUser) {
      clearDataCurrentUser();
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
    if (!currentUser) {
      setIndex({
        idUser: 0,
        nameUser: "",
      });
    }

    if (currentUser) {
      setIndex({
        idUser: currentUser.idUser,
        nameUser: currentUser.nameUser,
      });
    }
  }, [currentUser]);

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
            placeholder="Nombre usuario"
            readOnly
            disabled
            value={index.nameUser}
          />
          <Button className="ml-4" type="primary" onClick={showModal}>
            ...
          </Button>
        </div>

        <Modal
          title="Lista de usuarios"
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
                key={item.idUser}
                actions={[
                  <a
                    key="select"
                    onClick={() => handleChooseClient(item.idUser)}
                  >
                    Seleccionar
                  </a>,
                ]}
              >
                <Skeleton loading={false} active>
                  <div>{item.nameUser}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Modal>
      </>
    </ConfigProvider>
  );
}

export default UserList;
