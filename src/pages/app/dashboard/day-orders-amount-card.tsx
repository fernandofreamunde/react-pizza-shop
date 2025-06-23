import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ["metrics", "day-orders-amount"],
    queryFn: getDayOrdersAmount,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-semibold">Orders (day)</span>
          <Utensils className="text-muted-foreground h-4 w-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString("pt-PT")}
            </span>
            <p className="text-muted-foreground text-xs">
              {dayOrdersAmount.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{dayOrdersAmount.diffFromYesterday}%
                  </span>
                  than yesterday
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {dayOrdersAmount.diffFromYesterday}%
                  </span>{" "}
                  than yesterday
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
