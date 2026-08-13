import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { usePriceHistory, usePriceHistoryActions } from "../hooks";

function MagazinePagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);
  const { getProductMagazine, clearErrorInfo } = usePriceHistoryActions();
  const { error } = usePriceHistory();

  const onChange = (page: number) => {
    setCurrent(page);
    getProductMagazine(page);
  };

  useEffect(() => {
    if (error) {
      clearErrorInfo();
    }
  }, [error]);

  return (
    <Pagination
      onChange={onChange}
      total={pages * 10}
      current={current}
      showSizeChanger={false}
    />
  );
}

export default MagazinePagination;
