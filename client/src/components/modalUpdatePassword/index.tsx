'use client';
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useSession } from "next-auth/react";
import api from "../../services/api";
import { Eye, EyeOff } from "lucide-react";



const ModalUpdate = () => {
    const { data: session } = useSession();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordVerified, setIsPasswordVerified] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    }

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible((prev) => !prev);
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    }

    const handleCheckPassword = async () => {
        if (!password || !newPassword || !confirmNewPassword) {
            setErrorMessage("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await api.post(`/users/checkpassword`, {
                email: session?.user?.email,
                password: password,
            });
            if (response.status === 200) {
                setIsPasswordVerified(true);
                handleUpdate();
            } else {
                setIsPasswordVerified(false);
                setErrorMessage("Senha atual incorreta.");
            }
        } catch (error) {
            setErrorMessage("Ocorreu um erro inesperado. Por favor, tente novamente.");
            console.error(error);
        }
    }

    const handleUpdate = async () => {
        if (newPassword !== confirmNewPassword) {
            setErrorMessage("As novas senhas não coincidem.");
            return;
        }

        try {
            const updateResponse = await api.post(`/users/${session?.user?.email}/${newPassword}`, {});
            if (updateResponse.status === 200) {
                alert("Senha alterada com sucesso.");
                setErrorMessage("");
                setPassword("");
                setNewPassword("");
                setConfirmNewPassword(""); 
            } else {
                setErrorMessage("Falha ao alterar a senha.");
            }
        } catch (error) {
            setErrorMessage("Ocorreu um erro inesperado. Por favor, tente novamente.");
            console.error(error);
        }
    }

    return (
        <div className="flex justify-center items-center p-4">
            <Card className="w-full max-w-md shadow-lg rounded-lg">
                <CardContent className="space-y-4">
                    <CardHeader className="font-bold text-2xl">Alterar Senha</CardHeader>
                    
                    <Label>Senha Atual</Label>
                    <div className="relative">
                        <Input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Digite sua senha atual"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 border-2 border-[#004BD4] rounded-[16px] pr-10"
                        />
                        <button
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <Label>Nova Senha</Label>
                    <div className="relative">
                        <Input
                            type={newPasswordVisible ? "text" : "password"}
                            placeholder="Digite sua nova senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full h-12 border-2 border-[#004BD4] rounded-[16px] pr-10"
                        />
                        <button
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={toggleNewPasswordVisibility}
                        >
                            {newPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <Label>Confirmar Nova Senha</Label>
                    <div className="relative">
                        <Input
                            type={confirmPasswordVisible ? "text" : "password"}
                            placeholder="Confirme sua nova senha"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="w-full h-12 border-2 border-[#004BD4] rounded-[16px] pr-10"
                        />
                        <button
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <Button
                        className="w-full h-12 rounded-full bg-gradient-to-r from-[#004BD4] via-[#5331CF] to-[#A219CA] text-white mt-4"
                        onClick={handleCheckPassword}
                        disabled={newPassword !== confirmNewPassword || !password || !newPassword || !confirmNewPassword || !isPasswordVerified}
                    >
                        Alterar Senha
                    </Button>
                    <p className="text-red-500 text-center mt-2">{errorMessage}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ModalUpdate;
