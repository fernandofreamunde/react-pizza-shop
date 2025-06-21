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

const data = [
  { date: "23/6", revenue: 1506 },
  { date: "24/6", revenue: 1085 },
  { date: "25/6", revenue: 1192 },
  { date: "26/6", revenue: 1651 },
  { date: "27/6", revenue: 951 },
  { date: "28/6", revenue: 1495 },
  { date: "29/6", revenue: 1213 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Period Revenue
          </CardTitle>
          <CardDescription>Period Daily Revenue</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
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
      </CardContent>
    </Card>
  );
}
