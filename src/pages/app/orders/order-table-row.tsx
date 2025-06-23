import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { OrderStatus } from "./order-status";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import type { GetOrdersResponse } from "@/api/get-orders";

interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    // for this operation it makes sense to not use an optimist interface
    // and wait for the result of the request.
    async onSuccess(_, { orderId }) {
      // get all cached orders by query key
      const orderListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ["orders"],
      });

      // iterate the orders
      orderListCache.forEach(([cacheKey, cacheData]) => {
        // if there is no data skip -- this is mostly to shut up typescript
        if (!cacheData) {
          return;
        }

        // on this particular cacheKey set orders data
        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          // if the orders id are the same
          orders: cacheData.orders.map((order) => {
            // do update the status of the order
            if (order.orderId === orderId) {
              return { ...order, status: "canceled" };
            }

            return order;
          }),
        });
      });
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Order Detail</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: enUS,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("en", {
          style: "currency",
          currency: "EUR",
        })}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Approve
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="xs"
          disabled={!["pendig", "processing"].includes(order.status)}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}
