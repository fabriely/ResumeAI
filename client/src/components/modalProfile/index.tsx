'use client'
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "../../services/api";
import { useSession } from "next-auth/react";


interface ModalProfileProps {
    onClose: () => void;
}

const ProfileModal: React.FC<ModalProfileProps> = ({ onClose }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (session?.user?.email) {
                    const response = await api.get(`/users/${session.user.email}`);
                        setName(response.data.data.user.name); 
                        setEmail(response.data.data.user.email);  
                    
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário', error);
            }
        };
    
        fetchUserData();
    }, [session?.user?.email]);  
    
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


                    {/* Imagem de Perfil */}
                    <div className="w-52 h-52 bg-gray-300 rounded-full"></div>

                    {/* Nome e Email */}
                    <p className="text-4xl font-semibold">{name}</p>
                    <p className="text-2xl font-semibold text-gray-500">{email}</p>

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
