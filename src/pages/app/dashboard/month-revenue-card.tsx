import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Euro, Utensils } from "lucide-react";

export function MonthRevenueAmountCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-semibold">Total Revenue (month)</span>
          <Euro className="text-muted-foreground h-4 w-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">€ 5570.90</span>
        <p className="text-muted-foreground text-xs">
          <span className="text-emerald-500 dark:text-emerald-400">+6%</span>{" "}
          than last month
        </p>
      </CardContent>
    </Card>
  );
}
