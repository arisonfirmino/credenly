"use client";

import { useState } from "react";
import SignInLayout from "@/app/(signin)/components/signin-layout";
import SignUpLayout from "../components/signup-layout";

const SignIn = () => {
  const [showSignUp, setShowSignUp] = useState(true);

  return (
    <>
      {showSignUp ? (
        <SignUpLayout changeLayout={() => setShowSignUp(false)} />
      ) : (
        <SignInLayout changeLayout={() => setShowSignUp(true)} />
      )}
    </>
  );
};

export default SignIn;
