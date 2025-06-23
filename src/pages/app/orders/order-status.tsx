export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Pending",
  canceled: "Canceled",
  delivered: "Delivered",
  delivering: "In Delivery",
  processing: "Processing",
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && (
        <span
          className="h-2 w-2 rounded-full bg-slate-400"
          data-testid="badge"
        />
      )}

      {status === "canceled" && (
        <span
          className="h-2 w-2 rounded-full bg-rose-400"
          data-testid="badge"
        />
      )}

      {status === "delivered" && (
        <span
          className="h-2 w-2 rounded-full bg-emerald-500"
          data-testid="badge"
        />
      )}

      {["processing", "delivering"].includes(status) && (
        <span
          className="h-2 w-2 rounded-full bg-amber-400"
          data-testid="badge"
        />
      )}

      <span className="text-muted-foreground font-medium">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
