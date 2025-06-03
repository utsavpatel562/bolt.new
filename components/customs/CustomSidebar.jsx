import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { MdBolt } from "react-icons/md";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className={"p-3 md:mt-3 md:mb-1"}>
        <MdBolt className="w-9 h-9" />
      </SidebarHeader>
      <SidebarContent className={"p-3"}>
        <Button className={"cursor-pointer"}>
          <MessageCircleCode />
          Start New Chat
        </Button>
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
