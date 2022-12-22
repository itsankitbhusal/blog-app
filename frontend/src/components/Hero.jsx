import React from "react";
import { HiArrowDown } from "react-icons/hi";
import LatestBlogs from "./Hero/LatestBlogs";

const Hero = () => {
  return (
    <>
      <div className="w-auto h-[90vh] grid place-items-center px-[10vw] py-[3vh]">
        <div className="heading text-center flex justify-center items-center flex-col p-4 ">
          <h1 className=" text-8xl font-black">
            All summaries about tech blogs are here
          </h1>
          <p className=" py-7 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit, dolorem
            perspiciatis cupiditate dolores then ducimus.
          </p>
          <button className="flex text-xl text-brand-dark my-7 justify-center items-center gap-2 font-semibold text-brand px-16 py-5 bg-white rounded-full drop-shadow-2xl">
            Scroll to read all articles <HiArrowDown className=" text-2xl" />
          </button>
        </div>
      </div>
      <LatestBlogs />
    </>
  );
};

export default Hero;
