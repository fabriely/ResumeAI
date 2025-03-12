'use client';
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "../../services/api";
import { useSession } from "next-auth/react";
import { ArrowLeftCircle } from "lucide-react";
import ModalUpdate from "components/modalUpdatePassword";

interface ModalProfileProps {
    onClose: () => void;
}

const ProfileModal: React.FC<ModalProfileProps> = ({ onClose }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

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
                className="w-full max-w-lg h-full bg-white shadow-lg flex flex-col p-6 relative rounded-lg sm:max-w-md sm:w-auto"
            >

                <Card className="shadow-none flex flex-col items-center space-y-6 border-0 w-full">
                    {isUpdatingPassword ? (
                    <>
                        <div className="absolute top-6 left-2 right-0 text-3xl text-gray-700">
                            <ArrowLeftCircle 
                                size={40} 
                                className="cursor-pointer" 
                                onClick={() => setIsUpdatingPassword(false)} 
                            />
                        </div>
                        <ModalUpdate />
                    </>
                    ) : (
                        <>
                        <button
                            className="absolute top-6 right-3 text-4xl text-gray-700"
                            onClick={onClose}
                            >   
                            &times;
                        </button>
                            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 mx-auto"></div>
                            <p className="text-3xl font-semibold">{name}</p>
                            <p className="text-lg font-medium text-gray-500">{email}</p>
                            <div className="w-full space-y-3 mt-4">
                                <Button 
                                    className="w-full rounded-full h-12 bg-gray-200 text-black hover:bg-gray-300"
                                    onClick={() => setIsUpdatingPassword(true)}
                                >
                                    Alterar Minha Senha
                                </Button>
                                <Button 
                                    className="w-full h-12 rounded-full bg-gradient-to-r from-[#004BD4] via-[#5331CF] to-[#A219CA] text-white"
                                    onClick={() => router.push("/mydocuments")}
                                >
                                    Meus Documentos
                                </Button>
                            </div>
                        </>
                    )}
                </Card>
            </motion.div>
        </div>
    );
};

export default ProfileModal;
