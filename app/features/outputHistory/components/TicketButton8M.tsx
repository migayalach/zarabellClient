"use client";
import jsPDF from "jspdf";
import { useEffect } from "react";
import { FilePdfOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useOutputHistoryActions, useOutputHistory } from "../hooks";
import { IListProductsData } from "../types";
import { numberToSpanishWords } from "@/app/helpers/numberToText";
import { printDate } from "@/app/helpers/currentHour";
import { useAuth } from "@/app/features/auth/hooks/useAuth";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { useHasPermission } from "@/app/features/auth/hooks/useHasPermission";

function TicketButton8M({ idOutput }: { idOutput: number }) {
  const canSee = useHasPermission([1, 2, 3]);
  const { getListProductsOutput, resetListOutputProducts } =
    useOutputHistoryActions();
  const { listProducts } = useOutputHistory();
  const { user } = useAuth();

  const handleListOutputProduct = () => {
    getListProductsOutput(idOutput);
  };

  const handleGeneratePDF = async (
    listProducts: IListProductsData,
    nameAcount: string,
  ) => {
    let y = 40;

    listProducts.listProducts.forEach(() => {
      y += 14;
    });

    y += 60;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, y],
    });

    y = 40;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("ZARABELL", 40, 9, { align: "center" });

    pdf.setFontSize(16);

    pdf.text("- - - - - - - - - - - - - - - - - - - - -", 40, 13, {
      align: "center",
    });

    const infoUser = listProducts.userInfo;
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("NOMBRE RECEPTOR:", 9.1, 16);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${infoUser.nameUser} ${infoUser.lastNameUser}`, 43, 16);

    pdf.setFont("helvetica", "bold");
    pdf.text("TIPO DE SALIDA:", 15.5, 20);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${infoUser.nameTypeOutput}`, 43, 20);

    pdf.setFont("helvetica", "bold");
    pdf.text("COD. SALIDA:", 19.9, 24);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${infoUser.codeOutput}`, 43, 24);

    pdf.setFont("helvetica", "bold");
    pdf.text("FECHA DE SALIDA:", 12.7, 28);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${infoUser.dateOutput}`, 43, 28);

    pdf.setFont("helvetica", "bold");
    pdf.text("FECHA DE IMPRESION:", 7.2, 32);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${printDate}`, 43, 32);

    pdf.setFontSize(16);
    pdf.text("- - - - - - - - - - - - - - - - - - - - -", 40, 36, {
      align: "center",
    });
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("DETALLE", 40, 40, { align: "center" });

    y = 44;

    const productLists = listProducts.listProducts;
    // let totalPrice = 0;

    productLists.forEach(
      (item: {
        nameProduct: string;
        nameProvider: string;
        quantity: number;
        totalPrice: number;
      }) => {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.text(`Proveedor: ${item.nameProvider}`, 5, y);

        y += 4;

        pdf.setFont("helvetica", "normal");
        pdf.text(`Producto: ${item.nameProduct}`, 7, y);

        y += 4;

        pdf.text(`Cantidad: ${Number(item.quantity).toFixed(2)}`, 7, y);

        // pdf.text(`Total: ${Number(item.totalPrice).toFixed(2)}`, 74, y, {
        //   align: "right",
        // });

        // totalPrice += item.totalPrice;

        y += 6;
      },
    );

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("- - - - - - - - - - - - - - - - - - - - -", 40, y, {
      align: "center",
    });

    y += 15;

    // pdf.setFont("helvetica", "normal");
    // pdf.setFontSize(8);
    // pdf.text(`Total: Bs. ${Number(totalPrice).toFixed(2)}`, 5, y);

    // y += 4;

    // pdf.setFont("helvetica", "normal");
    // pdf.setFontSize(8);
    // pdf.text(`Son: ${numberToSpanishWords(totalPrice)} Bolivianos`, 5, y);

    // pdf.setFont("helvetica", "bold");
    // pdf.setFontSize(16);
    // pdf.text("- - - - - - - - - - - - - - - - - - - - -", 40, y + 5, {
    //   align: "center",
    // });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);

    // Entregué conforme
    pdf.text("__________________________", 40, y, { align: "center" });
    pdf.text("Entregué conforme", 40, y + 5, { align: "center" });
    pdf.text(`Nombre: ${nameAcount}`, 40, y + 9, { align: "center" });

    // Recibí conforme
    y += 24;

    pdf.text("__________________________", 40, y, { align: "center" });
    pdf.text("Recibí conforme", 40, y + 5, { align: "center" });
    pdf.text(
      `Nombre: ${infoUser.nameUser} ${infoUser.lastNameUser}`,
      40,
      y + 9,
      { align: "center" },
    );

    pdf.save(`Boleta_de_Salida_${infoUser.codeOutput}.pdf`);
    resetListOutputProducts();
  };

  useEffect(() => {
    if (listProducts && user) {
      const nameAcount = `${user.nameUser} ${user.lastNameUser}`;
      handleGeneratePDF(listProducts, nameAcount);
    }
  }, [listProducts, user]);

  if (!canSee) {
    return null;
  }

  return (
    <div className="mr-2">
      <CustomTooltip text="Descargar pdf">
        <Button color="cyan" variant="solid" onClick={handleListOutputProduct}>
          <FilePdfOutlined />
        </Button>
      </CustomTooltip>
    </div>
  );
}

export default TicketButton8M;
