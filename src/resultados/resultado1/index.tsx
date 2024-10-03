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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#89FFDC]">
      <h1 className="text-4xl font-bold text-zinc-50 text-shadow-lg">PARABÉNS!</h1>
      <img
        src="/images/trofeu.png" // Ajuste o caminho da imagem se necessário
        alt="Parabéns"
        className="w-30 h-30" // Ajustando o tamanho da imagem
      />
      <h1 className="text-3xl font-semibold text-zinc-50 text-shadow-lg">
        Parabéns, sua saúde bucal está excelente!
      </h1>
      <div className="mb-2 flex justify-center">
        <img
          src="/images/logo.png" // Ajuste o caminho da imagem se necessário
          alt="Logo"
          className="w-50 h-25 object-contain" // Ajustando o tamanho da imagem
        />
      </div>

      {/* Botão customizado (se necessário) */}
      <CustomButton text="Voltar" onClick={() => navigate(-1)} />
    </div>
  );
}
