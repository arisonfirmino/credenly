import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date) => {
  return format(date, "MMM 'de' yyyy", { locale: ptBR });
};

export const formatReviewDate = (date: Date) => {
  return format(date, "dd MMM 'de' yyyy", { locale: ptBR });
};
