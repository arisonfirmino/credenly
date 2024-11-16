"use client";

import WelcomeMessage from "@/app/components/welcome-message";
import SignInForm from "@/app/(signin)/components/signin-form";

const SignInLayout = ({ changeLayout }: { changeLayout: () => void }) => {
  return (
    <>
      <div className="space-y-1.5">
        <WelcomeMessage
          title="Bem-vindo(a) de volta!"
          message="Faça login para acessar todas as funcionalidades e gerenciar suas informações com segurança e facilidade."
        />
        <button
          onClick={changeLayout}
          className="text-sm text-blue-700 underline active:text-gray-400"
        >
          Ainda não tenho uma conta
        </button>
      </div>
      <SignInForm />
    </>
  );
};

export default SignInLayout;
