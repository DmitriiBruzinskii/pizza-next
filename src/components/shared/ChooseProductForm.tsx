import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { Title } from "./Title";

interface Props {
  name: string,
  imageUrl: string;
  className?: string;
};

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  className
}) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за 300 ₽
        </Button>
      </div>
    </div>
  )
}