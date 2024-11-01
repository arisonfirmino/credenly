import { Address, Prisma, User } from "@prisma/client";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

// user action types

export interface CreateNewUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// address action types

export interface UpdateAddressProps {
  zipCode: number;
  street: string;
  number: number;
  neighborhood: string;
  state: string;
  city: string;
  additionalInfo?: string;
  userId: string;
}

// phone number action types

export interface UpdatePhoneNumberProps {
  userId: string;
  phoneNumber: string;
}

// signin form types

export interface SignInFormData {
  email: string;
  password: string;
}

// signup form types

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// address form types

export interface AddressFormData {
  street: string;
  neighborhood: string;
  zipCode: string;
  state: string;
  city: string;
  additionalInfo?: string;
  number: number;
}

// input form types

export interface InputFormProps {
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
  showError?: boolean;
  error: FieldError | undefined;
  value?: string | number | undefined;
}

// admin wrapper types

export interface AdminWrapperProps {
  user: Prisma.UserGetPayload<{
    include: {
      address: true;
    };
  }>;
}

// address data types

export interface AddressDataProps {
  address: Address;
}

// warnings types

export interface WarningsProps {
  user: User;
}
