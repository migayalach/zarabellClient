"use client";

import { useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "antd";
import CustomTooltip from "@/app/shared/components/CustomTooltip";
import { FilePdfOutlined } from "@ant-design/icons";
import {
  IMagazine,
  IPaginationPriceHistory,
} from "../types";
import {
  usePriceHistory,
  usePriceHistoryActions,
} from "../hooks";

function MagazinPDF() {
  const {
    getMagazinePDF,
    resetPDFMagazine,
  } = usePriceHistoryActions();

  const {
    infoPDF,
    resultsPDF,
  } = usePriceHistory();

  const handleListMagazine = () => {
    getMagazinePDF();
  };

  const handleGeneratePDF = (
    infoPDF: IPaginationPriceHistory,
    resultsPDF: IMagazine[],
  ) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "letter",
    });

    doc.setProperties({
      title: "catalogo",
    });

    // =========================
    // ENCABEZADO
    // =========================

    doc.setFontSize(18);

    doc.text(
      "CATÁLOGO DE PRODUCTOS",
      148,
      15,
      {
        align: "center",
      },
    );

    doc.setFontSize(10);

    doc.text(
      "Lista de precios vigente",
      148,
      22,
      {
        align: "center",
      },
    );

    // =========================
    // TABLA
    // =========================

    autoTable(doc, {
      startY: 30,

      head: [
        [
          "N°",
          "Proveedor",
          "Producto",
          "Cantidad",
          "Unitario",
          "Cuarto",
          "Docena",
          "Mayor",
        ],
      ],

      body: resultsPDF.map(
        (item, index) => [
          index + 1,
          item.nameProvider,
          item.nameProduct,
          item.countIRecord,
          item.unitPriceHistory,
          item.quarterPriceHistory,
          item.dozenPriceHistory,
          item.mayorPriceHistory,
        ],
      ),

      styles: {
        fontSize: 11,
      },

      headStyles: {
        fontSize: 11,
      },
    });

    // =========================
    // PAGINACIÓN
    // =========================

    const totalPages = infoPDF.pages;

    const pdfPages = doc.getNumberOfPages();

    for (
      let page = 1;
      page <= pdfPages;
      page++
    ) {
      doc.setPage(page);

      const pageWidth =
        doc.internal.pageSize.getWidth();

      const pageHeight =
        doc.internal.pageSize.getHeight();

      doc.setFontSize(9);

      doc.text(
        `Página ${page} de ${totalPages}`,
        pageWidth / 2,
        pageHeight - 8,
        {
          align: "center",
        },
      );
    }

    // =========================
    // GENERAR PDF
    // =========================

    const pdfBlob =
      doc.output("blob");

    const pdfUrl =
      URL.createObjectURL(pdfBlob);

    // =========================
    // ABRIR PDF
    // =========================

    const newWindow =
      window.open("", "_blank");

    if (!newWindow) {
      URL.revokeObjectURL(pdfUrl);
      return;
    }

    newWindow.document.write(`
      <!DOCTYPE html>

      <html>
        <head>
          <title>Catálogo</title>

          <style>
            html,
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            iframe {
              width: 100%;
              height: 100%;
              border: none;
            }

            .download {
              position: fixed;
              top: 10px;
              right: 10px;
              z-index: 10;

              padding: 10px 16px;

              background: #1677ff;
              color: white;

              border-radius: 6px;

              text-decoration: none;

              font-family: Arial, sans-serif;
            }
          </style>
        </head>

        <body>

          <a
            class="download"
            href="${pdfUrl}"
            download="catalogo.pdf"
          >
            Descargar PDF
          </a>

          <iframe
            src="${pdfUrl}"
          ></iframe>

        </body>
      </html>
    `);

    newWindow.document.close();

    // =========================
    // LIMPIAR ESTADO
    // =========================

    resetPDFMagazine();
  };

  // =========================
  // GENERAR CUANDO LLEGUEN
  // LOS DATOS
  // =========================

  useEffect(() => {
    if (
      infoPDF &&
      resultsPDF.length > 0
    ) {
      handleGeneratePDF(
        infoPDF,
        resultsPDF,
      );
    }
  }, [infoPDF, resultsPDF]);

  return (
    <div className="mr-2">
      <CustomTooltip
        text="Generar catálogo PDF"
      >
        <Button
          color="cyan"
          variant="solid"
          onClick={handleListMagazine}
        >
          <FilePdfOutlined />
        </Button>
      </CustomTooltip>
    </div>
  );
}

export default MagazinPDF;