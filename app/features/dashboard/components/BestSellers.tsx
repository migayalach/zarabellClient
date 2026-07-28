"use client";

import { ISellersData } from "../types";
import "../styles/best-sellers.css";

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

export default function BestSellers({ info }: Props) {
  if (!info.length) {
    return <p>No hay datos.</p>;
  }

  const max = Math.max(...info.map((i) => i.totalSold));

  return (
    <div className="best-sellers">
      <div className="best-header">
        <h3>Productos más vendidos</h3>
      </div>

      <div className="best-list">
        {info.map((item, index) => {
          const percent = (item.totalSold / max) * 100;

          return (
            <div className="seller-row" key={index}>
              <div className="seller-label">
                <div className="product">{item.nameProduct}</div>
                <div className="provider">{item.nameProvider}</div>
              </div>

              <div className="bar-container">
                <div
                  className="bar"
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