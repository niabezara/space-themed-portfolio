"use client";
import { motion } from "framer-motion";
import Image from "next/image";

function Hero({ rotation }: { rotation: number }) {
  return (
    <div className="absolute bottom-0 w-full h-[70vh] overflow-hidden flex justify-center items-top">
      <motion.div
        className="relative flex-shrink-0 "
        style={{ width: "100vw", height: "100vw" }}
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {/* <Icons.hero className="w-full h-[70vh]" /> */}
        <Image
          src="/mainimg.png"
          alt="Main Image"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}

export default Hero;
