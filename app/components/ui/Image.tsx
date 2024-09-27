import React from "react";
import cn from "../../lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

export function FeaturesSectionDemo() {
  const features = [
    {
      //   title: "Capture pictures with AI",
      //   description:
      //     "Capture stunning photos effortlessly using our advanced AI technology.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 border-neutral-800",
    },
  ];
  return (
    <div className="relative z-20 mx-auto">
      <div className="relative ">
        <div className="grid grid-cols-1  rounded-md ">
          {features.map((feature) => (
            <FeatureCard key={1} className={feature.className}>
              {/* <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription> */}
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`relative overflow-hidden`, className)}>{children}</div>
  );
};

// const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
//   return (
//     <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
//       {children}
//     </p>
//   );
// };

// const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
//   return (
//     <p
//       className={cn(
//         "text-sm md:text-base  max-w-4xl text-left mx-auto",
//         "text-neutral-500 text-center font-normal dark:text-neutral-300",
//         "text-left max-w-sm mx-0 md:text-sm my-2"
//       )}
//     >
//       {children}
//     </p>
//   );
// };

export const SkeletonTwo = () => {
  const images = ["/email.PNG", "/community.PNG"];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1  bg-neutral-800 border-neutral-700 border  flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="socially Blind"
              width="500"
              height="500"
              className="h-52 w-40 rounded-lg sm:w-32 sm:h-32 lg:w-64 lg:h-64 md:w-32 md:h-64 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-black to-transparent  h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-black  to-transparent h-full pointer-events-none" />
    </div>
  );
};
