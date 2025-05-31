"use client";
import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

function CodeView() {
  const [activeTab, setActiveTab] = useState("code");
  return (
    <>
      <div>
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
        <SandpackProvider template="react" theme={"dark"}>
          <SandpackLayout>
            <SandpackFileExplorer style={{ height: "74vh" }} />
            <SandpackCodeEditor style={{ height: "74vh" }} />
            <SandpackPreview style={{ height: "74vh" }} />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </>
  );
}

export default CodeView;
