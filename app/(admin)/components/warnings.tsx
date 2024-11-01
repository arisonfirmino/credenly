import WarningInfo from "@/app/(admin)/components/warning-info";
import { WarningsProps } from "@/app/types";

const Warnings = ({ user }: WarningsProps) => {
  return (
    <div className="fixed left-1/2 top-5 w-full -translate-x-1/2 transform space-y-5 px-5 md:left-auto md:right-5 md:max-w-96 md:-translate-x-0 md:px-0">
      {user.emailVerified ? (
        ""
      ) : (
        <WarningInfo> Seu e-mail não foi verificado</WarningInfo>
      )}

      {user.phone &&
        (user.phoneVerified ? (
          ""
        ) : (
          <WarningInfo>Seu número de telefone não foi verificado</WarningInfo>
        ))}
    </div>
  );
};

export default Warnings;
