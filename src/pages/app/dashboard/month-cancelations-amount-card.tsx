import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function MonthCancelationsAmountCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-semibold">Cancelations (month)</span>
          <Utensils className="text-muted-foreground h-4 w-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">32</span>
        <p className="text-muted-foreground text-xs">
          <span className="text-emerald-500 dark:text-emerald-400">-5%</span>{" "}
          than last month
        </p>
      </CardContent>
    </Card>
  );
}
