"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { Button } from "@/components/ui/button";

import { CartContext } from "../../contexts/cart";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const { toggleCart } = useContext(CartContext);
  const router = useRouter();

  return (
    <div className="relative h-[300px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-10 rounded-full"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>

      <Image
        priority={true}
        src={product.imageUrl}
        alt={product.name}
        fill
        className="!h-[90%] object-cover"
      />

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-10 rounded-full"
        onClick={toggleCart}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
}
