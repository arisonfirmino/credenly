import WelcomeMessage from "@/app/components/welcome-message";
import PhoneForm from "@/app/(phone)/components/phone-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { notFound } from "next/navigation";
import { db } from "@/app/lib/prisma";

const Phone = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <>
      <WelcomeMessage
        title="Adicione seu número de telefone ao seu perfil"
        message="Insira um número de telefone válido para completar seu cadastro. Esse dado adicional ajuda a tornar seu perfil mais completo."
      />
      {user.phone ? (
        <p className="text-yellow-500">
          Você já tem um número de telefone cadastrado. Para atualizá-lo, basta
          preencher o formulário abaixo.
        </p>
      ) : (
        ""
      )}
      <PhoneForm />
    </>
  );
};

export default Phone;
