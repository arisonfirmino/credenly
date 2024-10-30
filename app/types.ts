import { UseFormRegisterReturn } from "react-hook-form";

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

// input form types

export interface InputFormProps {
  label: string;
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
  error: string | undefined;
  value: string;
}
