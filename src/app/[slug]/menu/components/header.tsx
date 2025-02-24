"use client"

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name">;
}

export default function RestaurantHeader({
  restaurant
}: RestaurantHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-10 rounded-full"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src="/restaurant-header.png"
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-10 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
}
