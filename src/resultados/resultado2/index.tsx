import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Tipagem para o botão customizado, estendendo as propriedades nativas de <button>
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, ...props }) => (
  <button {...props} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    <h1>{text}</h1>
  </button>
);

export default function Resultado2() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1); // Voltar para a tela principal após 10 segundos
    }, 10000); // 10000 ms = 10 segundos

    return () => clearTimeout(timer); // Limpar o timeout se o componente desmontar
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-400">
      {/* Header (parabéns) */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-zinc-50 text-shadow-lg">OK!</h1>
      </div>

      {/* Imagem de congratulação */}
      <div className="mt-6">
        <img
          src="/images/dentinho.png"
          alt="Parabéns"
          className="w-50 h-25"
        />
      </div>

      {/* Texto de congratulação */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-zinc-50 text-shadow-lg">
         Sua saúde bucal está boa, mas pode melhorar.
        </h1>
      </div>

      {/* Logo (ou outra imagem) */}
      <div className="mb-2">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-50 h-25"
        />
      </div>

      {/* Botão customizado (se necessário) */}
      <CustomButton text="Voltar" onClick={() => navigate(-1)} />
    </div>
  );
}
