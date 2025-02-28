import React, { useState } from "react";
import { Logo, Google } from "../../assets";
import Image from "next/image";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; 
import { validateEmail, validatePassword} from "../../validations/loginValidationSchema";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const goToRegister = () => {
    router.push("/register/form");
    onClose();
  };

  const goToRedefinePassword = () => {
    router.push("/redefine-password/verify-email")
    onClose();
  }

  const handleLogin = async () => {
    try {
      const emailValidation = validateEmail(email);
      if (!emailValidation.success) {
        setErrorMessage("Insira um email válido.");
        return;
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.success) {
        setErrorMessage("Senha incorreta.");
        return;
      }

      if (emailValidation.success && passwordValidation.success) {
        const result = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
          name: "",
          last_name: "",
        });

        if (result?.error) {
          console.error("Falha no login:", result.error);
          setErrorMessage("Email ou senha incorretos.");
        } else {
          router.push("/chatbot");
          onClose();
        }
      };

    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="fixed -inset-4 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex justify-around items-center p-4">
        <Card className="w-[400px] bg-white relative">
          <button
            className="absolute top-2 right-4 text-black text-3xl"
            onClick={onClose}
          >
            &times;
          </button>
          <CardHeader className="-mt-6">
            <div>
              <Image src={Logo} alt="Logo do ResumeAI" />
            </div>
          </CardHeader>
          <CardContent className="overflow-auto flex flex-col gap-4 p-4 -mt-14">
            <div className="grid gap-2 justify-center">
              <Label className="text-black" htmlFor="email">
                Email
              </Label>
              <Input
                className="bg-white border-2 border-[#004BD4] w-[324px] h-[47px] rounded-[16px]"
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2 justify-center">
              <Label className="text-black" htmlFor="password">
                Senha
              </Label>
                <div className="relative w-[324px]">
                <Input
                  className="bg-white border-2 border-[#004BD4] w-full h-[47px] rounded-[16px] pr-10"
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-0">{errorMessage}</p>
                )}
              <div className="text-center">
                <span className="text-black font-[Roboto] cursor-pointer hover:underline"
                  onClick={goToRedefinePassword}>
                  Esqueci minha senha
                </span>
              </div>
            </div>
            <Button
              className="w-full h-[47px] rounded-[24px] bg-gradient-to-r from-[#004BD4] via-[#5331CF] via-[#7726CD] to-[#A219CA]"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button className="w-full h-[47px] rounded-[24px] bg-[#F0F0F0] text-black"
              onClick={goToRegister}
            >
              Cadastre-se Agora
            </Button>
            <div className="text-center">
              <span className="text-[#B3B3B3]">ou</span>
            </div>

            <Button
              className="w-full h-[47px] rounded-[24px] bg-[#F0F0F0] flex items-center justify-center text-black"
              onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/chatbot" })} // Redireciona após login
            >
              <Image width={20} src={Google} alt="Google Icon" className="mr-2" />
              Continue com Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginModal;
