"use client";

import { useState } from "react";
import ActionButton from "@/app/components/action-button";
import SignUpForm from "./form/signup-form";
import SignInForm from "./form/signin-form";

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
    <div className="flex flex-col items-center gap-2.5 p-5 pl-0">
      <ActionButton showComponent={showSignUp} handleClick={handleClick}>
        Cadastre-se
      </ActionButton>

      {showSignUp && (
        <div className="w-full max-w-lg space-y-10 py-10">
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
        <div className="w-full max-w-lg space-y-10 py-10">
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
