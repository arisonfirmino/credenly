export const formatPhoneNumber = (phone: string): string => {
  if (phone.length !== 13) {
    return phone;
  }

  return `+${phone.slice(0, 2)} (${phone.slice(2, 4)}) ${phone.slice(4, 9)}-${phone.slice(9)}`;
};
