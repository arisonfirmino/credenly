import { Address, Prisma, User } from "@prisma/client";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface CreateNewUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateAddressProps {
  zipCode: number;
  street: string;
  number: number;
  neighborhood: string;
  state: string;
  city: string;
  additionalInfo?: string;
  userId: string;
}

export interface UpdatePhoneNumberProps {
  userId: string;
  phoneNumber: string;
}

export interface UpdateEmailVerifiedProps {
  userId: string;
  code: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface AddressFormData {
  street: string;
  neighborhood: string;
  zipCode: string;
  state: string;
  city: string;
  additionalInfo?: string;
  number: number;
}

export interface InputFormProps {
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
  showError?: boolean;
  error: FieldError | undefined;
  value?: string | number | undefined;
}

export interface AdminWrapperProps {
  user: Prisma.UserGetPayload<{
    include: {
      address: true;
    };
  }>;
}

export interface EmailVerificationWrapperProps {
  user: User | null;
}

export interface AddressDataProps {
  address: Address;
}

export interface WarningsProps {
  user: User;
}

export interface PhoneFormProps {
  closeComponent?: () => void;
}

export interface PhoneWrapperProps {
  user: User;
}
