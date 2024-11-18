import WelcomeMessage from "@/app/components/welcome-message";
import EmailVerificationForm from "@/app/(email-verification)/components/email-verification-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { notFound } from "next/navigation";
import { db } from "@/app/lib/prisma";
import Link from "next/link";

const EmailVerification = async () => {
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
        title="Confirme seu e-mail para ativar sua conta"
        message={`1. Clique em <span style="color: #1D4ED8; font-weight: 500;">"Enviar código"</span> para receber um código de verificação no seu e-mail. <br /> 2. Insira o código recebido no campo abaixo e clique em <span style="color: #1D4ED8; font-weight: 500;">"Confirmar"</span> para concluir o processo.`}
      />
      {user.emailVerified ? (
        <>
          <p className="text-green-600">Já verificamos seu e-mail.</p>
          <Link
            href="/"
            prefetch
            className="jetbrains-mono rounded-lg bg-blue-700 px-5 py-2.5 uppercase text-white active:bg-gray-400"
          >
            Ver meus dados
          </Link>
        </>
      ) : (
        <EmailVerificationForm
          hasCode={user.verificationCode || ""}
          email={user.email}
        />
      )}
    </>
  );
};

export default EmailVerification;
