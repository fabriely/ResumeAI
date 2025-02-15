import React, { useState } from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Checkbox } from '@mui/material';
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword} from "../../validations/loginValidationSchema";
import { boolean, string } from "zod";

const FormRegister = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [boxChecked, setBoxChecked] = useState("");

    const handleRegister = async () => {
        try {
          const emailValidation = validateEmail(email);
          if (!emailValidation.success) {
            setErrorMessage("Insira um email válido.");
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
            }
            else {
                router.push("");
            }
          };
    
        } catch (error) {
          setErrorMessage("An unexpected error occurred. Please try again.");
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
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]" required></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                    <Label className="text-black font-bold" htmlFor="Sobrenome"> Sobrenome </Label>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                    <Label className="text-black font-bold" htmlFor="Email"> Email </Label>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                    <Label className="text-black font-bold" htmlFor="Senha"> Senha </Label>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    ></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                    <Label className="text-black font-bold" htmlFor="Confirmar Senha"> Confirmar Senha </Label>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    ></Input>
                    </div>
                    <div className="flex gap-2 justify-center">
                        <div className="grid gap-2 justify-evenly">
                            <Label className="text-black font-bold" htmlFor="Insira o Código"> Insira o código </Label>
                            <Input className="bg-white border-2 border-[#004BD4] w-[190px] h-[47px] rounded-[16px]"></Input>
                        </div>
                        <Button className="w-[120px] h-[47px] rounded-[24px] mt-6 bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
                            // onClick={}
                        >
                            Receber Código
                        </Button>
                    </div>
                    <div className="flex gap-2 justify-center">
                    <Checkbox
                    ></Checkbox>
                    <Label className="text-black w-[290px]" htmlFor="Concordar">Eu li e concordo com os Termos de Serviço e Política de Privacidade do ResumeAI.</Label>
                    </div>
                    <div className="flex gap-2 justify-center">
                    {errorMessage && (
                        <p className="text-red-500 w-[324px] text-sm mt-0">{errorMessage}</p>)}
                    </div>
                    <div className="flex gap-2 justify-around items-center">
                    <Button className="w-[324px] h-[47px] rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
                        onClick={handleRegister}
                    > Confirmar e Continuar </Button>
                    </div>
                </CardContent>
            </Card>
        </div>


    )
};

export default FormRegister;