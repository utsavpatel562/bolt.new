import React from "react";
import { CgBolt } from "react-icons/cg";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import Link from "next/link";
function Header() {
  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <Link href={"/"}>
          <div className="flex items-center gap-1 text-3xl">
            <CgBolt />
            <h2 className="font-semibold italic">BOLT</h2>
          </div>
        </Link>
        <div className="flex gap-3">
          <Button variant={"ghost"} className={"cursor-pointer"}>
            Sign In
          </Button>
          <Button
            className={"text-white cursor-pointer"}
            style={{
              backgroundColor: Colors.BLUE,
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}

export default Header;
