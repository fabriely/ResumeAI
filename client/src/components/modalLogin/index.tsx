'use client';

import { Logo, Google, LinkedIn, GitHub } from '../../assets';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';

export default function Login() {

return (
    <div className="flex justify-around items-center">
        <Card className="w-[400px] h-[805px] bg-white">
            <CardHeader>
                <div>
                    <Image src={Logo} alt="Logo do ResumeAI" />
                </div>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2 justify-center">
                    <Label className='text-black' htmlFor="email">Email</Label>
                    <Input
                        className='bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]'
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2 justify-center">
                    <Label className='text-black' htmlFor="password">Password</Label>
                    <Input className='bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]' id="password" type="password" required />
                    <div className="text-center">
                        <span className="text-black font-[Roboto]">Esqueci minha senha</span>
                    </div>
                </div>
                <Button className="w-full h-[47px] rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]">Login</Button>
                <Button className="w-full h-[47px] rounded-[24px] bg-[#F0F0F0] text-black">Cadastre-se Agora </Button>
                    <div className="text-center">
                            <span className="text-[#B3B3B3]">ou</span>
                    </div>
                <Button className="w-full h-[47px] rounded-[24px] bg-[#F0F0F0] flex items-center justify-center text-black">
                    <Image width={20} src={Google} alt="Google Icon" className="mr-2" />
                    Continue com Google
                </Button>
                <Button className="w-full h-[47px] rounded-[24px] bg-[#F0F0F0] flex items-center justify-center text-black">
                    <Image width={20} src={GitHub} alt="GitHub Icon" className="mr-2" />
                    Continue com Github
                </Button>
                <Button className="w-full h-[47px] rounded-[24px] bg-[#F0F0F0] flex items-center justify-center text-black">
                    <Image width={20} src={LinkedIn} alt="LinkedIn Icon" className="mr-2" />
                    Continue com LinkedIn
                </Button>
            </CardContent>
        </Card>
    </div>
);

}
