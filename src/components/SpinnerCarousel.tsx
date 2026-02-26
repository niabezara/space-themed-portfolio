import { RevealCard } from "./Card";
import { data } from "./data";
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
      <CarouselContent className="h-full absolute -bottom-50 w-full ">
        {data.map((item, index) => (
          <CarouselItem key={index}>
            <RevealCard
              title={item.title}
              answer={item.answer}
              key={`${index}-${currentIndex}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* navigation buttons */}
      <div className="flex justify-between w-full px-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

export default SpinnerCarousel;
