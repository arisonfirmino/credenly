import Review from "@/app/components/banner/review";
import Title from "@/app/components/banner/title";

const Banner = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-gradient-to-b from-blue-600 to-blue-700 p-5 text-white">
      <Title />
      <div className="space-y-2.5">
        <h2 className="text-4xl font-semibold">
          Crie sua conta e explore todas as possibilidades.
        </h2>
        <p className="text-gray-300">
          Complete o formulário com suas informações e finalize cada etapa para
          ter acesso completo ao sistema.
        </p>
      </div>
      <Review />
    </div>
  );
};

export default Banner;
