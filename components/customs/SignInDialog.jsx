import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LookUp from "@/data/LookUp";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer" + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);

      // Save this inside out Database
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <>
      <div>
        <Dialog open={openDialog} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>

              {/* Move heading and content outside of DialogDescription */}
              <div
                suppressHydrationWarning
                className="flex flex-col items-center justify-center gap-3"
              >
                <h2
                  className="font-bold text-2xl text-center text-white"
                  suppressHydrationWarning
                >
                  {LookUp.SIGNIN_HEADING}
                </h2>

                <DialogDescription>
                  {LookUp.SIGNIN_SUBHEADING}
                </DialogDescription>

                <Button
                  onClick={googleLogin}
                  className="bg-blue-400 mt-3 text-white hover:bg-blue-500 cursor-pointer"
                >
                  Sign In with Google
                </Button>

                <p className="mt-3 text-gray-400 text-sm">
                  {LookUp?.SIGNIn_AGREEMENT_TEXT}
                </p>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default SignInDialog;
