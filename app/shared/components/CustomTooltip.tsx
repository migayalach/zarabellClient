import { Tooltip } from "antd";
import { ReactNode } from "react";

function CustomTooltip({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) {
  return <Tooltip title={text}>{children}</Tooltip>;
}

export default CustomTooltip;
