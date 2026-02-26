"use client";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import SpinnerCarousel from "../components/SpinnerCarousel";
import { CarouselApi } from "../components/ui/carousel";

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const rotation = currentIndex * 90;

  return (
    <main className="w-full h-screen">
      <Hero rotation={rotation} />
      <SpinnerCarousel setApi={setApi} currentIndex={currentIndex} />
    </main>
  );
}
