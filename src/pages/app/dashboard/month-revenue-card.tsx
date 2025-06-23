import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Banknote } from "lucide-react";

export function MonthRevenueAmountCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ["metrics", "month-revenue"],
    queryFn: getMonthRevenue,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-semibold">Total Revenue (month)</span>
          <Banknote className="text-muted-foreground h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString("pt-PT", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
            <p className="text-muted-foreground text-xs">
              {monthRevenue.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthRevenue.diffFromLastMonth}%
                  </span>{" "}
                  than last month
                </>
              ) : (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthRevenue.diffFromLastMonth}%
                  </span>{" "}
                  than last month
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
