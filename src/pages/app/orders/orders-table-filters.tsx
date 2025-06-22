import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFilterSchema = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } = useForm<OrderFilterSchema>(
    {
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        orderId: orderId ?? "",
        customerName: customerName ?? "",
        status: status ?? "all",
      },
    },
  );

  function handleFilter({ customerName, orderId, status }: OrderFilterSchema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set("orderId", orderId);
      } else {
        state.delete("orderId");
      }

      if (customerName) {
        state.set("customerName", customerName);
      } else {
        state.delete("customerName");
      }

      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }

      state.set("page", "1");

      return state;
    });
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("status");
      state.delete("customerName");
      state.set("page", "1");

      return state;
    });

    //reset form
    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filters:</span>
      <Input
        placeholder="Order Id"
        className="h-8 w-auto"
        {...register("orderId")}
      />
      <Input
        placeholder="Customer Name"
        className="h-8 w-[320px]"
        {...register("customerName")}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              value={value}
              onValueChange={onChange}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="delivering">Delivering</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />

      <Button variant="secondary" size="xs" type="submit">
        Filter Results
      </Button>
      <Button
        variant="outline"
        size="xs"
        type="button"
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remove Filters
      </Button>
    </form>
  );
}
