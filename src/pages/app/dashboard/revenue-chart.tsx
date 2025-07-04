import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import colors from "tailwindcss/colors";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Loader2 } from "lucide-react";

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-period", dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  });

  const data = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        revenue: chartItem.receipt / 100,
      };
    });
  }, [dailyRevenueInPeriod]);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Period Revenue
          </CardTitle>
          <CardDescription>Period Daily Revenue</CardDescription>

          <div className="flex items-center gap-3">
            <Label>Period</Label>
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {data ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString("en", {
                    style: "currency",
                    currency: "EUR",
                  })
                }
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                stroke={colors.violet[500]}
                type="linear"
                strokeWidth={2}
                dataKey="revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="text-muted-foreground h-8 animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
