import React from "react";
import StatsCard from "./dashboard/StatsCard";
const BlogStats = () => {
  return (
    <>
      <div className="m-5 overflow-auto w-full pr-5 h-full grid place-items-center">
        <div className="flex flex-wrap gap-8 justify-center items-center">
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>
      </div>
    </>
  );
};

export default BlogStats;
