"use client";

import "./dashboard.css";

import {
  BestSellers,
  LessSellers,
  NearExpiration,
  SalesReportToday,
  SalesReportYesterday,
  TotalReport,
} from "@/app/features/dashboard/components";
import { useDashboard } from "@/app/features/dashboard/hooks/useDashoard";
import { useEffect } from "react";
import { FormOutlined } from "@ant-design/icons";
import Loading from "@/app/shared/components/Loading";

export default function Page() {
  const {
    bestSellers,
    lessSellers,
    nearExpiration,
    todaySales,
    yesterdaySales,
    totalProducts,
    totalOutputsCurrentMonth,
    totalLotsToExpiration,
    fetchDashboardInfo,
    resetDashboardInfo,
    loading
  } = useDashboard();

  useEffect(() => {
    fetchDashboardInfo();

    return () => {
      resetDashboardInfo();
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="dashboard">
      <header className="mb-6 text-left max-sm:text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard <FormOutlined />
        </h1>
      </header>

      <section className="flex flex-wrap gap-6 justify-center">
        {todaySales && <SalesReportToday info={todaySales} />}
        {yesterdaySales && <SalesReportYesterday info={yesterdaySales} />}
        <TotalReport text="productos" info={totalProducts} />
        <TotalReport text="ventas" info={totalOutputsCurrentMonth} />
        <TotalReport text="lotes" info={totalLotsToExpiration} />
      </section>

      <section className="dashboard-charts">
        <div className="dashboard-card">
          <BestSellers info={bestSellers} />
        </div>

        <div className="dashboard-card">
          <LessSellers info={lessSellers} />
        </div>

        <div className="dashboard-card">
          <NearExpiration info={nearExpiration} />
        </div>
      </section>
    </main>
  );
}
