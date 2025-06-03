"use client";
import React, { useContext, useEffect, useState } from "react";
import { LuLoaderPinwheel } from "react-icons/lu";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import LookUp from "@/data/LookUp";
import axios from "axios";
import { MessagesContext } from "@/context/MessageContext";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";

function CodeView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(LookUp?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...LookUp.DEFAULT_FILE, ...result?.fileDate };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });
    console.log(result.data);
    const aiResp = result.data;
    const mergedFiles = { ...LookUp.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergedFiles);
    await UpdateFiles({
      workspaceId: id,
      files: aiResp?.files,
    });
    setLoading(false);
  };
  return (
    <>
      <div className="relative">
        <div className="w-full p-2 border border-neutral-700 bg-[#181818]">
          <div className="flex items-center justify-center gap-2 bg-black rounded-full p-1 w-fit">
            <h2
              onClick={() => setActiveTab("code")}
              className={`text-sm cursor-pointer transition-colors duration-200 px-5 py-1 rounded-full ${
                activeTab === "code"
                  ? "bg-blue-500 bg-opacity-25 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Code
            </h2>
            <h2
              onClick={() => setActiveTab("preview")}
              className={`text-sm cursor-pointer transition-colors duration-200 px-5 py-1 rounded-full ${
                activeTab === "preview"
                  ? "bg-blue-500 bg-opacity-25 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Preview
            </h2>
          </div>
        </div>
        <SandpackProvider
          files={files}
          template="react"
          theme={"dark"}
          customSetup={{
            dependencies: {
              ...LookUp.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout>
            {activeTab == "code" ? (
              <>
                <SandpackFileExplorer style={{ height: "74vh" }} />
                <SandpackCodeEditor style={{ height: "74vh" }} />
              </>
            ) : (
              <>
                <SandpackPreview
                  style={{ height: "74vh" }}
                  showNavigator={true}
                />
              </>
            )}
          </SandpackLayout>
        </SandpackProvider>
        {loading && (
          <div className="flex items-center gap-2 p-10 bg-zinc-900 opacity-80 absolute top-0 rounded-lg w-full h-full justify-center">
            <LuLoaderPinwheel className="animate-spin h-9 w-9 text-white" />
            <h2 className="text-white text-lg">Generating your files...</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default CodeView;
