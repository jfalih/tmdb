"use client";

import React, { memo } from 'react';
const skeletonCount = 12;

const MovieWrapperLoading = memo(() => {
  return (
    <section className="w-screen px-20 max-h-screen h-full overflow-y-auto">
      <div className="flex flex-wrap justify-between gap-5">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <div key={idx} className="w-[180px] animate-pulse">
            <div className="bg-gray-700 rounded-md h-[270px] mb-3" />
            <div className="h-5 bg-gray-600 rounded mb-1 w-3/4" />
            <div className="h-4 bg-gray-600 rounded w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
});

MovieWrapperLoading.displayName = 'MovieWrapperLoading';
export default MovieWrapperLoading;
