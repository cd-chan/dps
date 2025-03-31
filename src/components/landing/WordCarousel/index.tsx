import { useEffect, useState } from "react";
import "./styles.css"; // for fade-slide animation

const rotatingMiddleWords = ["Learn", "Teach"];
const finalPhrase = ["Are", "Product Space"];

export default function WordCarousel() {
  const [index, setIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < rotatingMiddleWords.length - 1) {
        setIndex((prev) => prev + 1);
      } else if (!showFinal) {
        setShowFinal(true);
      } else {
        setShowFinal(false);
        setIndex(0);
      }
    }, 1750);

    return () => clearInterval(interval);
  }, [index, showFinal]);

  const middleWords = [...rotatingMiddleWords, finalPhrase[0]];
  const middleIndex = showFinal ? middleWords.length - 1 : index;

  return (
    <div className="text-[2.5rem] sm:text-[4rem] font-medium leading-none flex flex-col gap-1 h-[10.5rem] sm:h-[13.5rem]">
      {/* top line */}
      <span className="text-[#3a3a3a]">We</span>

      {/* middle word scroll */}
      <div className="h-[3rem] sm:h-[4.5rem] overflow-hidden">
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(-${middleIndex * (showFinal ? 3 : 3)}rem)` }} // uses 3rem scroll height for mobile
        >
          {middleWords.map((word, i) => (
            <div
              key={i}
              className={`h-[3rem] sm:h-[4.5rem] ${
                word === "Are"
                  ? "text-[#3a3a3a]"
                  : "bg-gradient-to-r from-[#E06287] to-[#765DF2] bg-clip-text text-transparent"
              }`}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* bottom row */}
      <div className="flex items-baseline gap-2">
        <span
          className={`text-[2.5rem] sm:text-[4rem] leading-none transition-colors duration-500 ${
            showFinal
              ? "bg-gradient-to-r from-[#E06287] to-[#765DF2] bg-clip-text text-transparent"
              : "text-[#3a3a3a]"
          }`}
        >
          Product
        </span>

        {showFinal && (
          <span className="text-[2.5rem] sm:text-[4rem] leading-none animate-fade-slide-delayed bg-gradient-to-r from-[#765DF2] to-[#A594FD] bg-clip-text text-transparent">
            Space.
          </span>
        )}
      </div>
    </div>
  );
}
