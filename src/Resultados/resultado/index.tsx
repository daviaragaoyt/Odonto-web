import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import parabensImg from '../../assets/images/parabens.png'; // substitua pelo caminho correto da imagem
import logoImg from '../../assets/images/logo.png'; // substitua pelo caminho correto da imagem



export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Voltar para a tela principal após 10 segundos
    }, 10000); // 10000 ms = 10 segundos

    return () => clearTimeout(timer); // Limpar o timeout se o componente desmontar
  }, );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <div className="text-center mt-10">

      </div>

      <div className="mt-10">
        <img src={parabensImg} alt="Parabéns" className="w-64 h-64" />
      </div>

      <div className="mt-8">
       
      </div>

      <div className="mt-16">
        <img src={logoImg} alt="Logo" className="w-32 h-32" />
      </div>
    </div>
  );
}
