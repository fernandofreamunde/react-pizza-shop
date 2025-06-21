import { Helmet } from "react-helmet-async";
import { MonthRevenueAmountCard } from "./month-revenue-card";
import { MonthOrdersAmountCard } from "./month-orders-amount-card";
import { DayOrdersAmountCard } from "./day-orders-amount-card";
import { MonthCancelationsAmountCard } from "./month-cancelations-amount-card";

export function Dashboard() {
  return (
    <>
      <Helmet title="dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">a Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueAmountCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCancelationsAmountCard />
        </div>
      </div>
    </>
  );
}
