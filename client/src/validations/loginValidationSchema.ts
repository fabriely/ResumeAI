import { z } from 'zod';
import api from "../services/api";

// Esquema de validação para o email
export const emailSchema = z
    .string()
    .email({ message: "Insira um email válido." })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Insira um email válido."
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
    return { success: true, message: "Sucesso." };
};

export const verifyExistingEmail = async (email: string) => {
    try {
        const response = await api.get(`/users/${email}`);
        if (response.data) {
            return { success: false, message: "Este email já está em uso." };
        }
        return { success: true, message: "Sucesso." };
    } catch (error) {
        return { success: true, message: "" }; // Must be set to true, otherwise the message shows even if the email is available to use.
    }
};

// Função para validar a senha
export const validatePassword = (password: string) => {
    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
        return { success: false, message: passwordValidation.error.errors[0].message };
    }
    return { success: true, message: "Sucesso." };
};
