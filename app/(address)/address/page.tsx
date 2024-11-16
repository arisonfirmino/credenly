import WelcomeMessage from "@/app/components/welcome-message";
import AddressForm from "@/app/(address)/components/address-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { notFound } from "next/navigation";
import { db } from "@/app/lib/prisma";

const Address = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      address: true,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <>
      <WelcomeMessage
        title="Adicione seu endereço para completar seu perfil"
        message="Insira seu endereço completo para garantir que seus dados estejam atualizados. Isso ajuda a tornar seu cadastro mais completo e preciso."
      />
      {user.address.length === 0 ? (
        ""
      ) : (
        <p className="text-yellow-500">
          Um endereço já está cadastrado para você. Se precisar atualizá-lo, é
          só preencher o formulário abaixo.
        </p>
      )}
      <AddressForm />
    </>
  );
};

export default Address;
