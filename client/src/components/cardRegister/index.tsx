import React, { useState } from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Checkbox } from '@mui/material';

import { validateEmail, validatePassword} from "../../validations/loginValidationSchema";

const FormRegister = () => {


    return (
        <div className="flex justify-around items-center p-4">
            <Card className="w-[400px] bg-white relative">
                <CardHeader>
                    <h2 className="text-black font-bold">
                      Crie Sua Conta ResumeAI!
                    </h2>
                </CardHeader>
                <CardContent>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px] mt-4">
                    </Input>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px] mt-4">
                    </Input>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px] mt-4">
                    </Input>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px] mt-4">
                    </Input>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px] mt-4">
                    </Input>
                    <Input className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px] mt-4">
                    </Input>
                </CardContent>
            </Card>
        </div>


    )
};

export default FormRegister;