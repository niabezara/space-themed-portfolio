import { useState, useEffect, useCallback, useRef } from "react";

interface ViewportCalculations {
  viewportHeight: number;
  viewportWidth: number;
  availableHeight: number;
  availableWidth: number;
  headerHeight: number;
  contentHeight: number;
  scaleFactor: number;
  isCalculating: boolean;
  isDesktop: boolean;
}

interface UseViewportCalculationsOptions {
  headerSelector?: string;
  contentSelector?: string;
  debounceMs?: number;
  offsetPadding?: number;
  minScale?: number;
  maxScale?: number;
}

export const useViewportCalculations = (
  options: UseViewportCalculationsOptions = {},
) => {
  const {
    headerSelector = "[data-header]",
    contentSelector = "[data-content]",
    debounceMs = 50,
    offsetPadding = 24,
    minScale = 0.7,
    maxScale = 1.0,
  } = options;

  const [calculations, setCalculations] = useState<ViewportCalculations>({
    viewportHeight: 0,
    viewportWidth: 0,
    availableHeight: 0,
    availableWidth: 0,
    headerHeight: 0,
    contentHeight: 0,
    scaleFactor: 1,
    isCalculating: true,
    isDesktop: typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculateDimensions = useCallback(() => {
    requestAnimationFrame(() => {
      try {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const isDesktop = viewportWidth >= 1024;

        const headerElement = document.querySelector(
          headerSelector,
        ) as HTMLElement;
        const contentElement = document.querySelector(
          contentSelector,
        ) as HTMLElement;
        const headerHeight = headerElement?.offsetHeight || 0;

        let contentHeight = 0;
        if (contentElement) {
          const originalTransform = contentElement.style.transform;
          contentElement.style.transform = "none";
          contentHeight = contentElement.scrollHeight;
          contentElement.style.transform = originalTransform;
        }

        const availableHeight = viewportHeight - headerHeight - offsetPadding;
        const availableWidth = viewportWidth - offsetPadding;

        // Simplified scale factor calculation based on height
        let scaleFactor = 1;
        if (isDesktop && contentHeight > 0 && availableHeight > 200) {
          if (availableHeight < 800) {
            scaleFactor = 0.9;
          } else if (availableHeight < 840) {
            scaleFactor = 0.95;
          } else if (availableHeight < 880) {
            scaleFactor = 0.97;
          } else if (availableHeight < 1024) {
            scaleFactor = 0.99;
          } else {
            scaleFactor = 1;
          }
        }

        setCalculations({
          viewportHeight,
          viewportWidth,
          availableHeight,
          availableWidth,
          headerHeight,
          contentHeight,
          scaleFactor,
          isCalculating: false,
          isDesktop,
        });
      } catch (error) {
        console.warn("Error calculating viewport dimensions:", error);
        setCalculations((prev) => ({
          ...prev,
          scaleFactor: prev.isDesktop ? 0.9 : 1,
          isCalculating: false,
        }));
      }
    });
  }, [headerSelector, contentSelector, offsetPadding]);

  const debouncedCalculate = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCalculations((prev) => ({ ...prev, isCalculating: true }));
    timeoutRef.current = setTimeout(calculateDimensions, debounceMs);
  }, [calculateDimensions, debounceMs]);

  useEffect(() => {
    const initialTimeout = setTimeout(calculateDimensions, 50);
    const handleResize = () => debouncedCalculate();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [calculateDimensions, debouncedCalculate]);

  const recalculate = useCallback(() => {
    calculateDimensions();
  }, [calculateDimensions]);

  return {
    ...calculations,
    recalculate,
  };
};
