'use client'
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ModalProfileProps {
    onClose: () => void;
}

const ProfileModal: React.FC<ModalProfileProps> = ({ onClose }) => {
    const router = useRouter();

    return (
        <div className="fixed -inset-4 bg-black bg-opacity-50 flex justify-end">
            <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="w-full max-w-md h-full bg-white shadow-lg flex flex-col p-6"
            >
                <Card className="flex flex-col items-center space-y-4 border-0">
                    {/* Botão de Fechar */}
                    <button
                        className="self-end text-black text-3xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>

                    {/* Título */}
                    <h2 className="text-2xl text-black font-semibold">User Profile</h2>

                    {/* Imagem de Perfil */}
                    <div className="w-32 h-32 bg-gray-300 rounded-full"></div>

                    {/* Nome e Email */}
                    <p className="text-xl font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">john.doe@gmail.com</p>

                    {/* Botões */}
                    <div className="w-full space-y-3">
                        <Button 
                            className="w-full rounded-full h-12 bg-gray-200 text-black hover:bg-gray-300"
                            variant="ghost"
                            onClick={() => {/* Lógica para alterar senha */}}
                        >
                            Alterar Minha Senha
                        </Button>
                        <Button 
                            className="w-full h-12 rounded-full bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA] text-white"
                            onClick={() => {router.push("/mydocuments")}}
                        >
                            Meus Documentos
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}

export default ProfileModal;
