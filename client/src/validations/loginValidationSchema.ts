import { z } from 'zod';

// Esquema de validação para o email
export const emailSchema = z
    .string()
    .email({ message: "O email precisa ser válido." })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "O email precisa ser válido."
    });

// Esquema de validação para a senha
export const passwordSchema = z
    .string()
    .min(8, { message: "A senha precisa ter pelo menos 8 caracteres." })
    .regex(/\d/, { message: "A senha precisa ter pelo menos um número." })
    .regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;'/]/, {
        message: "A senha precisa ter pelo menos um caractere especial.",
    });

// Função para validar o email
export const validateEmail = (email: string) => {
    const emailValidation = emailSchema.safeParse(email);
    if (!emailValidation.success) {
        return { success: false, message: emailValidation.error.errors[0].message };
    }
    return { success: true };
};

// Função para validar a senha
export const validatePassword = (password: string) => {
    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
        return { success: false, message: passwordValidation.error.errors[0].message };
    }
    return { success: true, message: "A senha é válida!" };
};
