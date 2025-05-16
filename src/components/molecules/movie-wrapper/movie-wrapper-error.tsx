import { Button } from "@/components/ui/button";
import React, { memo } from "react";

const MovieWrapperError = memo(() => {
  return (
    <section className="w-screen px-20 h-[500px] flex items-center justify-center">
      <div className="bg-red-800 bg-opacity-80 text-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
        <p className="mb-6">
          We couldn&apos;t load the movies right now. Please try refreshing the page
          or come back later.
        </p>
        <Button
          size="sm"
          rounded="full"
          onClick={() => window.location.reload()}
          className="bg-white text-red-800 cursor-pointer font-semibold px-5 py-2 rounded hover:bg-red-50 transition"
        >
          Retry
        </Button>
      </div>
    </section>
  );
});

MovieWrapperError.displayName = "MovieWrapperError";
export default MovieWrapperError;
