"use client";

import React from "react";
import { Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";

interface BarCodePDFProps {
  barcode: string;
}

function BarCodePDF({ barcode }: BarCodePDFProps) {
  const handleDownload = () => {
    const canvas = document.createElement("canvas");

    JsBarcode(canvas, barcode, {
      format: "CODE128",
      width: 2,
      height: 70,
      displayValue: true,
      fontSize: 16,
      font: "Arial",
      textMargin: 4,
      margin: 5,
    });

    // Tamaño carta: 216 x 279 mm
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });

    const barcodeImage = canvas.toDataURL("image/png");

    // Título
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);

    pdf.text("ZARABELL", 108, 25, {
      align: "center",
    });

    // Código de barras pequeño
    const barcodeWidth = 70;
    const barcodeHeight = 15;

    const x = (216 - barcodeWidth) / 2;

    pdf.addImage(
      barcodeImage,
      "PNG",
      x,
      35,
      barcodeWidth,
      barcodeHeight
    );

    pdf.save(`${barcode}.pdf`);
  };

  return (
    <Button
      type="text"
      danger
      icon={<FilePdfOutlined />}
      onClick={handleDownload}
      title="Descargar PDF"
    />
  );
}

export default BarCodePDF;