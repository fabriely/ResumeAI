'use client';

import React, { useState } from "react";
import { Header } from "components";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { verifyExistingEmail } from "validations/loginValidationSchema";
import { useRouter } from "next/navigation";

export default function RedefinePassword() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleCheckEmailAndCode = async () => {
        try {
            const emailVerification = verifyExistingEmail(email);
            if ((await emailVerification).success) {
                setErrorMessage("Este endereço de email não possui cadastro.");
                return;
            }
            // const codeVerification = TODO;
                // DO WHEN VERIFICATION CODE IS IMPLEMENTED
            // }
            router.push(`/redefine-password/new-password?email=${encodeURIComponent(email)}`);

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
                    <h2 className="text-black font-bold text-2xl">Esqueci a Senha</h2>
                    <p className="text-black text-base text-justify max-w-80 overflow-auto">
                        Por favor, insira seu endereço de email e o código de 
                        verificação enviado para seu email para redefinir sua senha.
                    </p>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label className="text-black text-base font-bold" htmlFor="Endereço de Email">Endereço de Email</Label>
                    <Input
                        className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        required
                    ></Input>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label className="text-black text-base font-bold" htmlFor="Endereço de Email">Código de Verificação</Label>
                    <div className="flex space-x-2">
                        <Input
                            className="bg-white border-2 border-[#004BD4] h-[47px] rounded-[16px]"
                            id="verificationCode"
                            type="verificationCode"
                            placeholder="000000"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        ></Input>
                        <Button 
                            className="m-0 h-[47px] rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
                            // onClick={}
                        >
                            Receber Código
                        </Button>
                    </div>
                </div>
                {errorMessage && (<p className="text-red-500 w-full text-sm mt-0">{errorMessage}</p>)}
                <Button 
                    className="w-full h-[47px] rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
                    onClick={handleCheckEmailAndCode}
                    disabled={!email || !verificationCode}
                >Continuar</Button>
            </div>
        </div>
    )
};