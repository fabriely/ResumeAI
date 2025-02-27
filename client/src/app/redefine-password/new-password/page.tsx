'use client';

import React, { useState } from "react";
import api from "../../../services/api";
import { Header } from "components";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; 

export default function RedefinePassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
    const [isPasswordVerified, setIsPasswordVerified] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible((prev) => !prev);
    }

    const toggleConfirmNewPasswordVisibility = () => {
        setConfirmNewPasswordVisible((prev) => !prev);
    }

    const handleUpdatePassword = async () => {
        if (!newPassword || !confirmNewPassword) {
            setErrorMessage("Todos os campos são obrigatórios.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setErrorMessage("As novas senhas não coincidem.");
            return;
        }

        try {
            const updateResponse = await api.post(`/users/${email}/${newPassword}`, {});
            if (updateResponse.status === 200) {
                setErrorMessage("");
                setNewPassword("");
                setConfirmNewPassword(""); 
                router.push("/redefine-password/success")
            } else {
                setErrorMessage("Falha ao alterar a senha.");
            }
        } catch (error) {
            setErrorMessage("Ocorreu um erro inesperado. Por favor, tente novamente.");
            console.error(error);
        }
    }
    
    return (
        <div className="flex justify-center h-screen bg-gray-100 pt-24 pb-8 px-40">
            <Header />
            <div className="flex flex-col items-center space-y-8 p-8 w-[388px] max-h-fit rounded-xl shadow-md bg-white">
                <div className="flex flex-col space-y-2">
                    <h2 className="text-black font-bold text-2xl">Defina uma Nova Senha</h2>
                    <p className="text-black text-base text-justify max-w-80 overflow-auto">
                        Crie e confirme sua nova senha. Assegure-se de que a nova
                        senha seja diferente da senha anterior para a sua segurança.
                    </p>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label className="text-black text-base font-bold" htmlFor="Endereço de Email">Endereço de Email</Label>
                    <div className="relative">
                        <Input
                            className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                            id="newPassword"
                            type={newPasswordVisible ? "text" : "password"}
                            placeholder="Digite sua nova senha"
                            value={newPassword}
                            onChange={(e) => {setNewPassword(e.target.value)}}
                            required
                        ></Input>
                        <button
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={toggleNewPasswordVisibility}
                        >
                            {newPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label className="text-black text-base font-bold" htmlFor="Endereço de Email">Confirmar Nova Senha</Label>
                    <div className="relative">
                        <Input
                            className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                            id="confirmNewPassword"
                            type={confirmNewPasswordVisible ? "text" : "password"}
                            placeholder="Confirme sua nova senha"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        ></Input>
                        <button
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={toggleConfirmNewPasswordVisibility}
                        >
                            {confirmNewPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                </div>
                {errorMessage && (<p className="text-red-500 w-full text-sm mt-0">{errorMessage}</p>)}
                <Button 
                    className="w-full h-[47px] rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
                    onClick={handleUpdatePassword}
                    disabled={!newPassword || !confirmNewPassword}
                >Redefinir Senha</Button>
            </div>
        </div>
    )
};