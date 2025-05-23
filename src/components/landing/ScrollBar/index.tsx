"use client";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

interface ScrollBarProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

export default function ScrollBar({ targetRef }: ScrollBarProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.65) setActiveIndex(0);
    else if (latest < 0.75) setActiveIndex(1);
    else setActiveIndex(2);
  });

  return (
    <div className="absolute top-1/2 right-[-2rem] translate-y-[-50%] flex flex-col items-center gap-2 z-50 text-white font-medium text-xs tracking-wide">
      {/* current card number */}
      <div className="text-[#e06287]">{`0${activeIndex + 1}`}</div>

      {/* scroll track */}
      <div className="relative w-[1.5px] h-[425px] bg-white/20 overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 bg-gradient-to-b from-[#E06287] to-[#765DF2] w-full"
          style={{ height: fillHeight }}
        />
      </div>

      {/* total cards */}
      <div className="text-[#765df2]">03</div>
    </div>
  );
}
