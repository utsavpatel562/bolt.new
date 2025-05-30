import ChatView from "@/components/customs/ChatView";
import CodeView from "@/components/customs/CodeView";
import React, { useContext } from "react";

function Workspace() {
  return (
    <>
      <div className="md:p-7">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <ChatView />
          <div className="col-span-3">
            <CodeView />
          </div>
        </div>
      </div>
    </>
  );
}

export default Workspace;
