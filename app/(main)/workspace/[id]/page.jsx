import ChatView from "@/components/customs/ChatView";
import CodeView from "@/components/customs/CodeView";
import React from "react";

function Workspace() {
  return (
    <div className="p-3 md:p-5">
      {" "}
      {/*  Add padding for smaller screens */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
        {" "}
        {/*  Responsive spacing */}
        <div className="order-2 md:order-1">
          {" "}
          {/*  Show ChatView below CodeView on mobile */}
          <ChatView />
        </div>
        <div className="col-span-1 md:col-span-3 order-1 md:order-2">
          {" "}
          {/* CodeView comes first on mobile */}
          <CodeView />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
