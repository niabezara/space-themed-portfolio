"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Hero from "../components/Hero";
import SpinnerCarousel from "../components/SpinnerCarousel";
import { CarouselApi } from "../components/ui/carousel";
import { data } from "../dummyData/data";

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
    <main className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence>
        {data.map((item, index) =>
          index === currentIndex ? (
            <motion.div
              key={item.bg}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${item.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          ) : null,
        )}
      </AnimatePresence>
      {/* Optional dark overlay for depth */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Content */}
      <Hero rotation={rotation} />
      <SpinnerCarousel setApi={setApi} currentIndex={currentIndex} />
    </main>
  );
}
