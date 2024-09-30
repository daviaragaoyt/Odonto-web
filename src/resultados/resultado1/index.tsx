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

export default function Resultado1() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1); // Voltar para a tela principal após 10 segundos
    }, 10000); // 10000 ms = 10 segundos

    return () => clearTimeout(timer); // Limpar o timeout se o componente desmontar
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Header (parabéns) */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-blue-700">PARABÉNS!</h1>
      </div>

      {/* Imagem de congratulação */}
      <div className="mb-6">
        <img
          src="/images/parabens.png"
          alt="Parabéns"
          className="w-48 h-48"
        />
      </div>

      {/* Texto de congratulação */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Parabéns, sua saúde bucal está excelente!
        </h1>
      </div>

      {/* Logo (ou outra imagem) */}
      <div className="mb-6">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-24 h-24"
        />
      </div>

      {/* Botão customizado (se necessário) */}
      <CustomButton text="Voltar" onClick={() => navigate(-1)} />
    </div>
  );
}
