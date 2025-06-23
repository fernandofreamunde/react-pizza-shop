import { getMonthOrdersAmount } from "@/api/get-month-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function MonthOrdersAmountCard() {
  const { data: monthOrders } = useQuery({
    queryKey: ["metrics", "month-orders-amount"],
    queryFn: getMonthOrdersAmount,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-semibold">Orders (month)</span>
          <Utensils className="text-muted-foreground h-4 w-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrders && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrders.amount.toLocaleString("pt-PT")}
            </span>
            <p className="text-muted-foreground text-xs">
              {monthOrders.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthOrders.diffFromLastMonth}%
                  </span>{" "}
                  than last month
                </>
              ) : (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthOrders.diffFromLastMonth}%
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
