"use client";

import { useState } from "react";

import ActionButton from "@/app/components/action-button";

import SignUpForm from "@/app/(home)/components/form/signup-form";
import SignInForm from "@/app/(home)/components/form/signin-form";

const HomeWrapper = () => {
  const [showSignUp, setShowSignUp] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleClick = () => {
    if (showSignUp) {
      setShowSignIn(true);
      setShowSignUp(false);
    } else {
      setShowSignIn(false);
      setShowSignUp(true);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2.5 md:w-auto md:justify-normal md:p-5 md:pl-0">
      <ActionButton showComponent={showSignUp} handleClick={handleClick}>
        Cadastre-se
      </ActionButton>

      {showSignUp && (
        <div className="w-full space-y-10 py-10 md:max-w-lg">
          <h3 className="jetbrains-mono text-xl font-semibold uppercase">
            Vamos começar
          </h3>
          <SignUpForm />
        </div>
      )}

      <ActionButton showComponent={showSignIn} handleClick={handleClick}>
        Já tenho uma conta
      </ActionButton>

      {showSignIn && (
        <div className="w-full space-y-10 py-10 md:max-w-lg">
          <h3 className="jetbrains-mono text-xl font-semibold uppercase">
            Faça login
          </h3>
          <SignInForm />
        </div>
      )}
    </div>
  );
};

export default HomeWrapper;
