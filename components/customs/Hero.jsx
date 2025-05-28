import LookUp from "@/data/LookUp";
import { ArrowRight } from "lucide-react";
import React from "react";

function Hero() {
  return (
    <>
      <div className="flex flex-col items-center mt-36 gap-2 xl:mt-52">
        <h2 className="font-bold text-4xl">{LookUp.HERO_HEADING}</h2>
        <p className="text-gray-400 font-medium">{LookUp.HERO_DESC}</p>
        <div className="p-5 border rounded-xl max-w-2xl w-full mt-3">
          <div className="flex gap-2">
            <textarea
              placeholder={LookUp.INPUT_PLACEHOLDER}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            />
            <ArrowRight className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
