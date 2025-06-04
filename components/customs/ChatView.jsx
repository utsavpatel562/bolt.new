"use client";
import { MessagesContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import LookUp from "@/data/LookUp";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { LuLoaderPinwheel } from "react-icons/lu";
import React, { useContext, useEffect, useState } from "react";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
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
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    const aiResp = {
      role: "ai",
      content: result.data.result,
    };
    setMessages((prev) => [...prev, aiResp]);
    await UpdateMessages({
      messages: [...messages, aiResp], // Update messages
      workspaceId: id,
    });
    setLoading(false);
  };

  const onGenerate = (input) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  return (
    <>
      <div className="relative h-[82vh] flex flex-col">
        <div className="flex-1 overflow-y-scroll custom-scrollbar rounded-lg">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-3 items-center leading-7"
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
              <div className="chat-response prose max-w-full text-sm whitespace-pre-wrap">
                {msg.role === "ai" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div
              className="p-3 rounded-lg md:mt-2 gap-2 flex items-center justify-center"
              style={{
                backgroundColor: Colors.CHAT_BACKGROUND,
              }}
            >
              <LuLoaderPinwheel className="animate-spin w-6 h-6" />
              <h2 className="animate-pulse">Generating reponse...</h2>
            </div>
          )}
        </div>
        {/* INPUT */}
        {/* <div className="flex gap-2 items-end">
          {userDetail && (
            <Image
              onClick={toogleSidebar}
              className="rounded-full cursor-pointer"
              src={userDetail?.picture}
              alt="user"
              width={30}
              height={30}
            />
          )}*/}

        <div
          className="p-4 sm:p-5 border rounded-xl w-full max-w-xl mt-3"
          style={{
            backgroundColor: Colors.BACKGROUND,
          }}
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              value={userInput}
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
