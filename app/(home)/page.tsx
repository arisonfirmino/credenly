import Container from "@/app/components/container";
import HomeWrapper from "@/app/(home)/components/home-wrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/admin");
  }

  return (
    <Container>
      <HomeWrapper />
    </Container>
  );
};

export default Home;
