import InputForm from "./input-form";
import SubmitButton from "./submit-button";

const SignInForm = () => {
  return (
    <form className="space-y-10">
      <div className="space-y-5">
        <InputForm label="Email" placeholder="Insira seu endereço de e-mail" />
        <InputForm
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
        />
        <p className="cursor-pointer text-sm text-blue-700 hover:underline">
          Esqueci minha senha
        </p>
      </div>
      <SubmitButton>Entrar</SubmitButton>
    </form>
  );
};

export default SignInForm;
