import { RevealCard } from "./Card";
import { data } from "./data";
import { Icons } from "./shared/Icons";

import { SlideData } from "./types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";

function SpinnerCarousel({
  setApi,
  currentIndex,
}: {
  setApi: (api: CarouselApi) => void;
  currentIndex: number;
}) {
  return (
    <Carousel setApi={setApi} className="absolute inset-0 ">
      <CarouselContent className="   ">
        {data.map((item: SlideData, index: number) => (
          <CarouselItem
            key={index}
            className="h-full flex flex-col justify-between"
          >
            <div className="pt-[50px] flex flex-col justify-center gap-23.75 items-center">
              <div>
                <Icons.rectangle />
                <span>{item.main}</span>
                <Icons.rectangle />
              </div>
              <h1 className="bg-yellow-500 text-4xl flex justify-center  items-center font-bold text-white ">
                {item.title}
              </h1>
            </div>
            <RevealCard
              title={item.question}
              answer={item.answer}
              key={`${index}-${currentIndex}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNavigation />
    </Carousel>
  );
}

export function CarouselNavigation() {
  return (
    <div className="flex justify-between">
      <CarouselPrevious />
      <CarouselNext />
    </div>
  );
}

export default SpinnerCarousel;
