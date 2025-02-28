import React, { useState } from "react";
import api from "services/api";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Checkbox } from '@mui/material';
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; 
import { 
    validateEmail, 
    validatePassword, 
    verifyExistingEmail, 
} from "../../validations/loginValidationSchema";
import { boolean, string } from "zod";

const FormRegister = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [boxChecked, setBoxChecked] = useState(false);
    const [code, setCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const handleSendRegisterCredentials = async () => {
        try {
            const response = await api.post("/users/", {
                name,
                last_name,
                email,
                password,
            });

            if (response.status === 200) {
                router.push("/chatbot");
            }
        } catch (error) {
            setErrorMessage("Um erro inesperado ocorreu. Por favor, tente novamente.");
            console.error(error);
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await api.post("/users/checkcode", { email, code });
            if (response.status === 200) {
                return true;
            } else {
                setErrorMessage("Código de verificação inválido.");
                return false;
            }
        } catch (error) {
            setErrorMessage("Falha ao verificar o código de verificação. Por favor, tente novamente.");
            console.error(error);
            return false;
        }
    };

    const handleRegister = async () => {
        try {
            const emailValidation = validateEmail(email);
            if (!emailValidation.success) {
                setErrorMessage(emailValidation.message);
                return;
            }

            const emailVerification = verifyExistingEmail(email);
            if (!(await emailVerification).success) {
                setErrorMessage((await emailVerification).message);
                return;
            }
        
            const passwordValidation = validatePassword(password);
            if (!passwordValidation.success) {
                setErrorMessage(passwordValidation.message);
                return;
            }
        
            if (emailValidation.success && passwordValidation.success) {
                if (password != confirmPassword) {
                    setErrorMessage("A Senha e a Confirmação de Senha precisam ser iguais.")
                } else {
                    const isCodeValid = await handleVerifyCode();
                    if (isCodeValid) {
                        await handleSendRegisterCredentials();
                    }
                }
            };
        
            if (!boxChecked) {
                setErrorMessage("Você deve concordar com os Termos de Serviço e Política de Privacidade.");
                return;
            }
        } catch (error) {
            setErrorMessage("Um erro inesperado ocorreu. Por favor, tente novamente.");
            console.error(error);
        }
    };

    const handleSendCode = async () => {
        try {
            setErrorMessage("");
            const response = await api.post("/users/sendcode", { email });
            if (response.status === 200) {
                setIsCodeSent(true);
                setIsCooldown(true);
                setTimeout(() => setIsCooldown(false), 60000); // 1 minute cooldown
            } else {
                setErrorMessage("Falha ao enviar o código de verificação. Por favor, tente novamente.");
            }
        } catch (error) {
            setErrorMessage("Falha ao enviar o código de verificação. Por favor, tente novamente.");
            console.error(error);
        }
    };

    return (
        <div className="flex justify-around items-center p-24">
            <Card className="w-[400px] bg-white relative">
                <CardHeader>
                    <h2 className="text-black font-bold flex justify-around items-center text-2xl">
                        Crie Sua Conta ResumeAI!
                    </h2>
                </CardHeader>
                <CardContent className="overflow-auto flex flex-col gap-4 p-4 -mt-8">
                    <div className="grid gap-2 justify-center">
                        <Label className="text-black font-bold" htmlFor="Nome"> Nome </Label>
                        <Input 
                            className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                            id="name"
                            type="name"
                            placeholder="João"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        ></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                        <Label className="text-black font-bold" htmlFor="Sobrenome"> Sobrenome </ Label>
                        <Input 
                            className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                            id="last_name"
                            type="last_name"
                            placeholder="Silva"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        ></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                        <Label className="text-black font-bold" htmlFor="Email"> Email </ Label>
                        <Input 
                            className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                        <Label className="text-black font-bold" htmlFor="Senha"> Senha </ Label>
                        <div className="relative w-[324px]">
                            <Input 
                                className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            ></Input>
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="grid gap-2 justify-center">
                        <Label className="text-black font-bold" htmlFor="Confirmar Senha"> Confirmar Senha </ Label>
                        <div className="relative w-[324px]">
                            <Input 
                                className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                                id="confirmPassword"
                                type={confirmPasswordVisible ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            ></Input>
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center">
                        <div className="grid gap-2 justify-evenly">
                            <Label className="text-black font-bold" htmlFor="Insira o Código"> Insira o código </ Label>
                            <Input 
                                className="bg-white border-2 border-[#004BD4] w-[190px] h-[47px] rounded-[16px]"
                                id="code"
                                type="text"
                                placeholder="000000"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            ></Input>
                        </div>
                        <Button 
                            className="w-[120px] h-[47px] rounded-[24px] mt-6 bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
                            onClick={handleSendCode}
                            disabled={isCooldown}
                        >
                            Receber Código
                        </Button>
                    </div>
                    <div className="flex gap-2 justify-center">
                        <Checkbox
                            checked={boxChecked}
                            onChange={(e) => setBoxChecked(e.target.checked)}
                        ></Checkbox>
                        <Label className="text-black w-[290px]" htmlFor="Concordar">Eu li e concordo com os Termos de Serviço e Política de Privacidade do ResumeAI.</Label>
                    </div>
                    <div className="flex gap-2 justify-center">
                        {errorMessage && (
                            <p className="text-red-500 w-[324px] text-sm mt-0">{errorMessage}</p>)}
                    </div>
                    <div className="flex gap-2 justify-around items-center">
                        <Button 
                            className="w-[324px] h-[47px] rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
                            onClick={handleRegister}
                            disabled={!name || !last_name || !email || !password || !confirmPassword || !code || !boxChecked}
                        > Confirmar e Continuar </ Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};

export default FormRegister;