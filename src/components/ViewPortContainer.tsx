// "use client";

// import dynamic from "next/dynamic";
// import React, { useEffect } from "react";
// import { useMediaQuery } from "react-responsive";
// import { useViewportCalculations } from "../hooks/useViewPortCalculation";

// interface ViewportContainerProps {
//   children: React.ReactNode;
//   className?: string;
// }

// // The actual component logic
// const ViewportContainerInner: React.FC<ViewportContainerProps> = ({
//   children,
//   className = "",
// }) => {
//   const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
//   const { availableHeight, isCalculating } = useViewportCalculations({
//     headerSelector: "[data-header]",
//     contentSelector: "[data-content]",
//     debounceMs: 100,
//     offsetPadding: 0,
//   });

//   useEffect(() => {
//     if (!isDesktop) return;

//     const originalStyle = {
//       overflow: document.body.style.overflow,
//       height: document.body.style.height,
//       htmlOverflow: document.documentElement.style.overflow,
//       htmlHeight: document.documentElement.style.height,
//     };

//     document.body.style.overflow = "hidden";
//     document.body.style.height = "100vh";
//     document.documentElement.style.overflow = "hidden";
//     document.documentElement.style.height = "100vh";

//     return () => {
//       document.body.style.overflow = originalStyle.overflow;
//       document.body.style.height = originalStyle.height;
//       document.documentElement.style.overflow = originalStyle.htmlOverflow;
//       document.documentElement.style.height = originalStyle.htmlHeight;
//     };
//   }, [isDesktop]);

//   return (
//     <div
//       className={`flex flex-col w-full transition-opacity duration-200 ${
//         isCalculating ? "opacity-90" : "opacity-100"
//       } ${className}`}
//       style={{
//         height: isDesktop ? "100vh" : "auto",
//         maxHeight: isDesktop ? "100vh" : "none",
//         overflow: isDesktop ? "hidden" : "visible",
//       }}
//     >
//       {children}
//     </div>
//   );
// };

// // Loading component that accepts the same props
// const ViewportContainerLoading: React.FC<ViewportContainerProps> = ({
//   children,
//   className = "",
// }) => (
//   <div
//     className={`flex flex-col w-full transition-opacity duration-200 opacity-90 ${className}`}
//     style={{
//       height: "auto",
//       maxHeight: "none",
//       overflow: "visible",
//     }}
//   >
//     {children}
//   </div>
// );

// const ViewportContainer = dynamic(
//   () => Promise.resolve({ default: ViewportContainerInner }),
//   {
//     ssr: false,
//     loading: (props) => (
//       <ViewportContainerLoading {...(props as ViewportContainerProps)} />
//     ),
//   },
// ) as React.FC<ViewportContainerProps>;

// export default ViewportContainer;
