import { data } from "./data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";

function SpinnerCarousel({ setApi }: { setApi: (api: CarouselApi) => void }) {
  return (
    <Carousel setApi={setApi} className="absolute inset-0 z-10">
      <CarouselContent className="h-full">
        {data.map((item, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-full flex items-center justify-center text-black text-4xl font-bold z-20">
              {item.title}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* navigation buttons */}
      <div className="absolute flex justify-between w-full top-1/2 -translate-y-1/2 px-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

export default SpinnerCarousel;
