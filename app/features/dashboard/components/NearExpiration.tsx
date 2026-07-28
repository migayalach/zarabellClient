"use client";

import "../styles/near-expiration.css";
import { INearExpirationData } from "../types";

interface Props {
  info: INearExpirationData[];
}

export default function NearExpiration({ info }: Props) {
  if (!info.length) {
    return <p>No hay datos.</p>;
  }

  const data = info
    .map((item) => ({
      ...item,
      daysNumber: Number(item.days) || 0,
    }))
    .sort((a, b) => a.daysNumber - b.daysNumber);

  const maxDays = Math.max(...data.map((i) => i.daysNumber), 1);

  const getColor = (days: number) => {
    if (days <= 15) return "#ef4444"; // rojo
    if (days <= 30) return "#f97316"; // naranja
    if (days <= 45) return "#eab308"; // amarillo
    return "#22c55e"; // verde
  };

  return (
    <div className="near-expiration">
      <div className="near-header">
        <h3>Productos próximos a vencer</h3>
        <span>{data.length} productos</span>
      </div>

      <div className="near-list">
        {data.map((item, index) => {
          const width = (item.daysNumber / maxDays) * 100;
          const color = getColor(item.daysNumber);

          return (
            <div className="near-item" key={`${item.nameProduct}-${index}`}>
              <div className="near-info">
                <div className="product">
                  {item.nameProduct}
                </div>

                <div className="provider">
                  {item.nameProvider}
                </div>
              </div>

              <div className="near-bar-wrapper">
                <div className="near-bar-bg">
                  <div
                    className="near-bar"
                    style={{
                      width: `${Math.max(width, 8)}%`,
                      background: color,
                    }}
                  />
                </div>
              </div>

              <div
                className="near-days"
                style={{
                  color,
                }}
              >
                {item.daysNumber} día{item.daysNumber !== 1 ? "s" : ""}
              </div>
            </div>
          );
        })}
      </div>

      <div className="near-legend">
        <div>
          <span className="legend red" />
          0 - 15 días
        </div>

        <div>
          <span className="legend orange" />
          16 - 30 días
        </div>

        <div>
          <span className="legend yellow" />
          31 - 45 días
        </div>

        <div>
          <span className="legend green" />
          46 - 60+ días
        </div>
      </div>
    </div>
  );
}