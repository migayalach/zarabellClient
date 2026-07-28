"use client";

import "../styles/less-sellers.css";
import { ISellersData } from "../types";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#8dd1e1",
  "#d0ed57",
];

interface Props {
  info: ISellersData[];
}

export default function LessSellers({ info }: Props) {
  if (!info.length) {
    return <p>No hay datos.</p>;
  }

  const max = Math.max(...info.map((i) => i.totalSold));

  return (
    <div className="less-sellers">
      <div className="less-header">
        <h3>Productos menos vendidos</h3>
      </div>

      <div className="less-list">
        {info.map((item, index) => {
          const percent = (item.totalSold / max) * 100;

          return (
            <div className="less-seller-row" key={index}>
              <div className="less-seller-label">
                <div className="less-product">{item.nameProduct}</div>
                <div className="less-provider">{item.nameProvider}</div>
              </div>

              <div className="less-bar-container">
                <div
                  className="less-bar"
                  style={{
                    width: `${Math.max(percent, 8)}%`,
                    background: COLORS[index % COLORS.length],
                  }}
                >
                  <span>{item.totalSold}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}