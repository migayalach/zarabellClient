import React from "react";
import { useEffect, useState } from "react";
import { Pagination } from "antd";

function OutputPagination({ pages }: { pages: number }) {
  const [current, setCurrent] = useState(1);

  const onChange = (page: number) => {
    setCurrent(page);
  };

  return (
    <Pagination
      onChange={onChange}
      total={pages * 10}
      current={current}
      showSizeChanger={false}
    />
  );
}

export default OutputPagination;
