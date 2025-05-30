"use client";
import { MessagesContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import LookUp from "@/data/LookUp";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex } from "convex/react";
import { ArrowRight, Link } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState();
  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  // Used to get workspace data using workspace id
  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log(result);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: result.data.result,
      },
    ]);
  };

  return (
    <>
      <div className="relative h-[82vh] flex flex-col">
        <div className="flex-1 overflow-y-scroll custom-scrollbar">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-3 items-center"
              style={{
                backgroundColor: Colors.CHAT_BACKGROUND,
              }}
            >
              {msg?.role === "user" && (
                <Image
                  src={userDetail?.picture}
                  alt="Image"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
              <h2 className="text-justify">{msg.content}</h2>
            </div>
          ))}
        </div>
        {/* INPUT */}
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
      </div>
    </>
  );
}

export default ChatView;
