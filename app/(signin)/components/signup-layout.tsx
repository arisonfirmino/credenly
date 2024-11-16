import SignUpForm from "@/app/(signin)/components/signup-form";
import WelcomeMessage from "@/app/components/welcome-message";

const SignUpLayout = ({ changeLayout }: { changeLayout: () => void }) => {
  return (
    <>
      <div className="space-y-1.5 w-full">
        <WelcomeMessage
          title="Cadastre-se agora e descubra uma experiência completa"
          message="Explore todas as funcionalidades e tenha acesso a um sistema seguro e fácil de usar para gerenciar suas informações."
        />
        <button
          onClick={changeLayout}
          className="text-sm text-blue-700 underline active:text-gray-400"
        >
          Já tenho uma conta
        </button>
      </div>
      <SignUpForm />
    </>
  );
};

export default SignUpLayout;
