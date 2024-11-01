import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatCreatedAt = (date: Date) => {
  return format(date, "dd MMM, yyyy", { locale: ptBR });
};

export const formatUpdateAt = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
};
