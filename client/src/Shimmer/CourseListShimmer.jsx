import React from "react";

const ShimmerCard = () => (
  <div className="w-[22rem] h-[430px] animate-pulse bg-gray-300 rounded-lg"></div>
);

export const ShimmerCards = () => {
  return (
    <>
      {new Array(12).fill(0).map((element, index) => {
        return <ShimmerCard key={index} />;
      })}
    </>
  );
};
