import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "components";
import { Button } from "components/ui/button";
import { Check } from "lucide-react";

interface SuccessMessageProps {
    message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
    const router = useRouter();

    return (
        <div className="flex justify-center h-screen bg-gray-100 pt-24 pb-8 px-40">
            <Header />
            <div className="flex flex-col items-center space-y-8 p-8 w-[388px] max-h-fit rounded-xl shadow-md bg-white">
                <div className="flex w-24 h-24 text-white bg-green-500 rounded-full justify-center items-center">
                    <Check className="w-12 h-12"/>
                </div>
                <div className="flex flex-col space-y-2 items-center">
                    <h2 className="text-black font-bold text-2xl">Sucesso!</h2>
                    <p className="text-black text-base text-justify max-w-80 overflow-auto">
                        {message}
                    </p>
                </div>
                <Button 
                    className="w-full h-[47px] rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
                    onClick={() => router.push("/")}  
                >Continuar</Button>
            </div>
        </div>
    )
};

export default SuccessMessage;