import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function MonthCancelationsAmountCard() {
  const { data: monthCanceledOrders } = useQuery({
    queryKey: ["metrics", "month-canceled-orders-amount"],
    queryFn: getMonthCanceledOrdersAmount,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-semibold">Cancelations (month)</span>
          <Utensils className="text-muted-foreground h-4 w-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrders && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrders.amount.toLocaleString("pt-PT")}
            </span>
            <p className="text-muted-foreground text-xs">
              {monthCanceledOrders.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthCanceledOrders.diffFromLastMonth}%
                  </span>{" "}
                  than last month
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{monthCanceledOrders.diffFromLastMonth}%
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
