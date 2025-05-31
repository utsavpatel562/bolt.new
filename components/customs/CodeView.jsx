"use client";
import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

function CodeView() {
  return (
    <>
      <SandpackProvider template="react" theme={"dark"}>
        <SandpackLayout>
          <SandpackFileExplorer style={{ height: "82vh" }} />
          <SandpackCodeEditor />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
}

export default CodeView;
