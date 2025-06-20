import {
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Order: 5lntJL4XSZ1M8ZJ</DialogTitle>
        <DialogDescription>Order Details</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" />
                  <span className="text-muted-foreground font-medium">
                    Pending
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Customer</TableCell>
              <TableCell className="flex justify-end">
                {" "}
                Diego Schell Fernandes
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Phone Number
              </TableCell>
              <TableCell className="flex justify-end">
                {" "}
                +351 91 234 56 78
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell className="flex justify-end">
                {" "}
                diego@rocketseat.com.br
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Created At
              </TableCell>
              <TableCell className="flex justify-end"> 25 minutes</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Qt.</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Family Pepperoni Pizza</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">€ 17.75</TableCell>
              <TableCell className="text-right">€ 35.50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Soda Coca-Cola Zero</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">€ 1.75</TableCell>
              <TableCell className="text-right">€ 3.50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Beer Super Bock</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">€ 2.00</TableCell>
              <TableCell className="text-right">€ 4.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Order Total</TableCell>
              <TableCell className="text-right font-medium">€ 43.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
