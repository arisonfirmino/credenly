const WelcomeMessage = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <div className="space-y-1.5">
      <h1 className="jetbrains-mono text-xl font-semibold uppercase text-blue-700">
        {title}
      </h1>
      <p
        className="text-gray-400"
        dangerouslySetInnerHTML={{ __html: message as string }}
      />
    </div>
  );
};

export default WelcomeMessage;
