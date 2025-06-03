"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

function WorkspaceHistory() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState();
  const { toggleSideBar } = useSidebar();
  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);
  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id,
    });
    setWorkspaceList(result);
    console.log(result);
  };
  return (
    <>
      <div>
        <h2 className="font-medium text-lg">Your chats</h2>
        <div>
          {workspaceList &&
            workspaceList?.map((workspace, index) => (
              <a href={"/workspace/" + workspace?._id} key={index}>
                <h2
                  onClick={toggleSideBar}
                  className="text-sm text-gray-400 mt-2 font-light hover:text-white"
                >
                  {workspace?.messages[0]?.content}
                </h2>
              </a>
            ))}
        </div>
      </div>
    </>
  );
}

export default WorkspaceHistory;
