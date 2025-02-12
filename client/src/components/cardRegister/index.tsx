import React, { useState } from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Checkbox } from '@mui/material';

import { validateEmail, validatePassword} from "../../validations/loginValidationSchema";

const FormRegister = () => {


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
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                    <Label className="text-black font-bold" htmlFor="Sobrenome"> Sobrenome </Label>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                    <Label className="text-black font-bold" htmlFor="Email"> Email </Label>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                        placeholder="email@example.com"
                    ></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                    <Label className="text-black font-bold" htmlFor="Senha"> Senha </Label>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                    <Label className="text-black font-bold" htmlFor="Confirmar Senha"> Confirmar Senha </Label>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"></Input>
                    </div>
                    <div className="grid gap-2 justify-center">
                        <div className="grid gap-2 justify-evenly">
                            <Label className="text-black font-bold" htmlFor="Insira o Código"> Insira o código </Label>
                            <Input className="bg-white border-2 border-[#004BD4] w-[180px] h-[47px] rounded-[16px]"></Input>
                        </div>
                        <Button className="w-[120px] h-[47px] rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
                            // onClick={}
                        >
                            Receber Código
                        </Button>
                    </div>
                    <div className="overflow-auto grid gap-2 justify-center">
                        <Checkbox></Checkbox>
                        <Label className="text-black" htmlFor="Concordar">Eu li e concordo com os Termos de Serviço e Política de Privacidade do ResumeAI.</Label>
                    </div>
                    <div>
                        <Button className="w-full h-[47px] rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
                            // onClick={}
                        >
                            Confirmar e Continuar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>


    )
};

export default FormRegister;