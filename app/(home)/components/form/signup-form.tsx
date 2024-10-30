import InputForm from "./input-form";
import SubmitButton from "./submit-button";

const SignUpForm = () => {
  return (
    <form className="space-y-10">
      <div className="space-y-5">
        <div className="flex gap-5">
          <InputForm label="Nome" placeholder="Digite seu nome" />
          <InputForm label="Sobrenome" placeholder="Digite seu sobrenome" />
        </div>
        <InputForm label="Email" placeholder="Insira seu endereço de e-mail" />
        <InputForm
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
        />
        <InputForm
          label="Confirmação de senha"
          type="password"
          placeholder="Digite sua senha novamente"
        />
      </div>

      <SubmitButton>Próximo</SubmitButton>
    </form>
  );
};

export default SignUpForm;
