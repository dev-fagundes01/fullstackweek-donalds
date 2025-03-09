import { useContext } from "react";

import { Button } from "@/components/ui/button";
import formatCurrency from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartSheet from './cart-sheet';

export default function CartSummary() {
  const { total, totalQuantity,toggleCart } = useContext(CartContext);

  return (
    <div className="fixed bottom-1 z-10 flex w-[89%] justify-between bg-white">
      <div>
        <p>Total dos pedidos</p>
        <p>
          <span className="font-bold">R$ {formatCurrency(total)}</span> /{" "}
          {totalQuantity} item
        </p>
      </div>
      <Button variant="destructive" onClick={() => toggleCart()}>Ver sacola</Button>
      <CartSheet/>
    </div>
  );
}
