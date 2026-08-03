import React from "react";
import { Button } from "antd";
import Link from "next/link";
import { FolderViewOutlined } from "@ant-design/icons";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

function OutputBtnAction({ idOutput }: { idOutput: number }) {
  const canSee = useHasPermission([1, 2]);

  if (!canSee) {
    return null;
  }

  return (
    <CustomTooltip text="Ver más">
      <Link href={`/inventory-outputs/${idOutput}`}>
        <Button color="primary" variant="solid">
          <FolderViewOutlined />
        </Button>
      </Link>
    </CustomTooltip>
  );
}

export default OutputBtnAction;
