"use client";

import React, { useEffect, useRef, useState } from "react";
import { useViewportCalculations } from "./hooks/useViewPortCalculation";

interface ScalableContentProps {
  children: React.ReactNode;
  className?: string;
  minScale?: number;
  maxScale?: number;
}

const ScalableContent: React.FC<ScalableContentProps> = ({
  children,
  className = "",
  minScale = 0.7,
  maxScale = 1.0,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentReady, setIsContentReady] = useState(false);

  const { scaleFactor, isCalculating, recalculate, isDesktop } =
    useViewportCalculations({
      headerSelector: "[data-header]",
      contentSelector: "[data-scalable-content]",
      debounceMs: 50,
      offsetPadding: 24,
      minScale,
      maxScale,
    });

  // Initialize content after DOM is ready
  useEffect(() => {
    if (contentRef.current) {
      setTimeout(() => {
        setIsContentReady(true);
        recalculate();
      }, 20);
    }
  }, [children, recalculate]);

  // Handle window resize
  useEffect(() => {
    if (!isContentReady || !contentRef.current) return;

    const observer = new ResizeObserver(() => {
      setTimeout(recalculate, 30);
    });

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [recalculate, isContentReady]);

  // Handle resource loading (images, fonts)
  useEffect(() => {
    if (!isContentReady) return;

    const handleResourceLoad = () => {
      setTimeout(recalculate, 50);
    };

    // Handle image loading
    const images = contentRef.current?.querySelectorAll("img") || [];
    if (images.length === 0) {
      handleResourceLoad();
      return;
    }

    let loadedCount = 0;
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        handleResourceLoad();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad, { once: true });
        img.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    // Handle font loading
    document.fonts?.ready?.then(handleResourceLoad);
  }, [recalculate, isContentReady]);

  if (!isContentReady) {
    return (
      <div
        className={`w-full h-full flex items-start justify-center ${className}`}
      >
        <div
          ref={contentRef}
          data-scalable-content
          className="w-full opacity-0"
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start justify-center lg:overflow-hidden ${className}`}
      style={{ minHeight: "100%" }}
    >
      <div
        ref={contentRef}
        data-scalable-content
        className="w-full"
        style={{
          transform: isDesktop ? `scale(${scaleFactor})` : "none",
          transformOrigin: isDesktop ? "center top" : "unset",
          opacity: isCalculating && isDesktop ? 0.95 : 1,
          marginBottom:
            scaleFactor < 1 && isDesktop ? `${(1 - scaleFactor) * 30}vh` : 0,
          willChange: isCalculating && isDesktop ? "transform" : "auto",
          transition: isDesktop ? "all 0.2s ease-out" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScalableContent;
