"use client";
import { MessagesContext } from "@/context/MessageContext";
import Colors from "@/data/Colors";
import LookUp from "@/data/LookUp";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";

function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const onGenerate = (input) => {
    setMessages({
      role: "user",
      content: input,
    });
  };
  return (
    <>
      <div className="flex flex-col items-center mt-24 sm:mt-28 md:mt-32 xl:mt-52 gap-2 px-4 sm:px-6">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">
          {LookUp.HERO_HEADING}
        </h2>
        <p className="text-gray-400 font-medium text-center text-sm sm:text-base">
          {LookUp.HERO_DESC}
        </p>
        <div
          className="p-4 sm:p-5 border rounded-xl w-full max-w-xl mt-3"
          style={{
            backgroundColor: Colors.BACKGROUND,
          }}
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              onChange={(event) => setUserInput(event.target.value)}
              placeholder={LookUp.INPUT_PLACEHOLDER}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-sm"
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-blue-400 p-2 h-9 w-9 rounded-md cursor-pointer self-end sm:self-auto"
              />
            )}
          </div>
          <div className="mt-2 sm:mt-1">
            <Link className="h-5 w-5 cursor-pointer" />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap max-w-xl items-center justify-center gap-2 px-2">
          {LookUp?.SUGGSTIONS.map((suggestion, index) => (
            <h2
              onClick={() => onGenerate(suggestion)}
              key={index}
              className="p-1 px-2 text-sm text-gray-400 hover:text-white border rounded-full cursor-pointer hover:bg-zinc-900"
            >
              {suggestion}
            </h2>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
