"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const { slug } = useParams<{ slug: string }>();
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
        className="object-contain"
      />

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-10 rounded-full"
        onClick={() => router.push(`/${slug}/orders`)}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
}
