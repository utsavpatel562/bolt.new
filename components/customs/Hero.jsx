"use client";
import { MessagesContext } from "@/context/MessageContext";
import Colors from "@/data/Colors";
import LookUp from "@/data/LookUp";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";
import { SiAstro } from "react-icons/si";
import { SiVite } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { SiNuxtdotjs } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { RiSvelteFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiQwik } from "react-icons/si";
import { FaAngular } from "react-icons/fa";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    const msg = {
      role: "user",
      content: input,
    };
    setMessages[msg];
    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    router.push("/workspace/" + workspaceId);
  };
  return (
    <>
      <div
        className={`flex flex-col items-center mt-24 sm:mt-28 md:mt-32 xl:mt-18 gap-2 px-4 sm:px-6 transition-all duration-300 ${
          openDialog ? "blur-md pointer-events-none select-none" : ""
        }`}
      >
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
        <div className="mt-4 justify-center items-center">
          <p className="text-gray-400 text-center">
            or start a blank app with your favorite stack
          </p>
          <div className="md:flex grid grid-cols-5 gap-4 mt-5">
            <SiAstro className="w-8 h-8 text-amber-600" />
            <SiVite className="w-8 h-8 text-blue-400" />
            <RiNextjsFill className="w-8 h-8 text-gray-400" />
            <SiNuxtdotjs className="w-8 h-8 text-emerald-500 " />
            <FaReact className="w-8 h-8 text-cyan-400 " />
            <IoLogoJavascript className="w-8 h-8 text-yellow-400 " />
            <RiSvelteFill className="w-8 h-8 text-orange-600 " />
            <SiTypescript className="w-8 h-8 text-sky-600 " />
            <SiQwik className="w-8 h-8 text-violet-500 " />
            <FaAngular className="w-8 h-8 text-red-400 " />
          </div>
        </div>
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </>
  );
}

export default Hero;
