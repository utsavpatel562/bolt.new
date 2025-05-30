import React, { useContext, useState } from "react";
import { CgBolt } from "react-icons/cg";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import Link from "next/link";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./SignInDialog";

function Header() {
  const { userDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);

  const onSignIn = () => {
    if (!userDetail?.name) {
      setOpenDialog(true);
    }
  };

  return (
    <>
      {/* Overlay Blur and Dim */}
      {openDialog && (
        <div className="fixed inset-0 z-30 bg-opacity-10 bg-zinc-900  transition-all duration-300"></div>
      )}

      {/* Header */}
      <div
        className={`p-4 flex justify-between items-center relative z-40 transition-all duration-300 ${
          openDialog ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <Link href={"/"}>
          <div className="flex items-center gap-1 text-3xl">
            <CgBolt />
            <h2 className="font-semibold italic">BOLT</h2>
          </div>
        </Link>
        {!userDetail?.name && (
          <div className="flex gap-2">
            <Button
              onClick={onSignIn}
              variant={"ghost"}
              className={"cursor-pointer bg-zinc-800"}
            >
              Sign In
            </Button>

            <Button
              onClick={onSignIn}
              className={"text-white cursor-pointer"}
              style={{
                backgroundColor: Colors.BLUE,
              }}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </>
  );
}

export default Header;
