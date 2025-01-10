"use client";

import { useState } from "react";

import SignUpForm from "@/app/signin/components/signup-form";
import SignInForm from "@/app/signin/components/signin-form";

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <>
      <div className="space-y-1.5">
        <p className="jetbrains-mono t text-xl font-semibold uppercase text-primary">
          {isSignUp ? "Cadastre-se" : "Faça login"}
        </p>

        <p className="text-muted-foreground">
          {isSignUp
            ? "Explore todas as funcionalidades e tenha acesso a um sistema seguro e fácil de usar para gerenciar suas informações."
            : "Faça login para acessar todas as funcionalidades e gerenciar suas informações com segurança e facilidade."}
        </p>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-primary underline hover:text-muted-foreground"
        >
          {isSignUp ? "Já tenho uma conta" : "Ainda não tenho uma conta"}
        </button>
      </div>

      {isSignUp ? <SignUpForm /> : <SignInForm />}
    </>
  );
};

export default SignInPage;
