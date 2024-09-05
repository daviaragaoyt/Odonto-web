import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomText from '../components/CustomText';
import Body from '../components/Body';
import parabensImg from '../../assets/images/Group.png'; // substitua pelo caminho correto da imagem

export default function Index() {
  const navigate = useNavigate();
  const { nome, codPaciente } = useParams(); // usar useParams para pegar parâmetros de URL

  const [opcoesDentes, setOpcoesDentes] = useState([
    { id: 1, dente: 'V11', score: null },
    { id: 2, dente: 'V16', score: null },
    { id: 3, dente: 'V26', score: null },
    { id: 4, dente: 'V31', score: null },
    { id: 5, dente: 'L36', score: null },
    { id: 6, dente: 'L46', score: null },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDenteIndex, setSelectedDenteIndex] = useState(-1);
  const [mediaNotas, setMediaNotas] = useState(0);

  useEffect(() => {
    calcularMedia();
  }, [opcoesDentes]);

  const handleSubmit = async () => {
    try {
      navegarParaResultado();
      await salvarDentes();
    } catch (error) {
      alert('Erro ao processar os dados');
    }
  };

  const salvarDentes = async () => {
    if (!codPaciente || opcoesDentes.some((dente) => dente.score === null)) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('https://bakcend-deploy.vercel.app/adddentes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Avaliacao_arcada: opcoesDentes.map((dente) => dente.score).join(','),
          fk_Paciente_Cod_Paciente: codPaciente,
          fk_Dente_Cod_dente: opcoesDentes.map((dente) => dente.id).join(','),
        }),
      });

      if (response.ok) {
        salvarMedia();
      } else {
        alert('Erro ao salvar os dados dos dentes.');
      }
    } catch (error) {
      alert('Erro ao salvar os dados dos dentes');
    }
  };

  const salvarMedia = async () => {
    try {
      const response = await fetch('https://bakcend-deploy.vercel.app/addmedia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          media: mediaNotas.toFixed(2),
          cod_paciente: codPaciente,
        }),
      });

      if (!response.ok) {
        alert('Erro ao salvar a média das notas.');
      }
    } catch (error) {
      alert('Erro ao salvar a média das notas');
    }
  };

  const calcularMedia = () => {
    const totalNotas = opcoesDentes.reduce(
      (sum, dente) => sum + (dente.score !== null ? dente.score : 0),
      0
    );
    const media = totalNotas / opcoesDentes.filter((dente) => dente.score !== null).length;
    setMediaNotas(media);
    return media;
  };

  const navegarParaResultado = () => {
    if (mediaNotas >= 0 && mediaNotas <= 1) {
      navigate('/resultados/resultado');
    } else if (mediaNotas > 1 && mediaNotas <= 2) {
      navigate('/resultados/resultado1');
    } else if (mediaNotas > 2 && mediaNotas <= 3) {
      navigate('/resultados/resultado2');
    }
  };

  const handleOpenModal = (index: number) => {
    setSelectedDenteIndex(index);
    setModalVisible(true);
  };

  const handleSelecionarNotaDente = (score: number) => {
    if (selectedDenteIndex !== -1) {
      const novasOpcoesDentes = [...opcoesDentes];
      novasOpcoesDentes[selectedDenteIndex] = {
        ...novasOpcoesDentes[selectedDenteIndex],
        score,
      };
      setOpcoesDentes(novasOpcoesDentes);
      setModalVisible(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Body />
      <div className="flex flex-col items-start w-11/12 md:w-1/2 mt-5 space-y-4">
        <button className="p-2 bg-blue-500 text-white rounded-md" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <div className="flex justify-between w-full">
          <CustomText className="text-xl">NOME:</CustomText>
          <CustomText className="text-xl">{nome}</CustomText>
        </div>

        <div className="flex justify-between w-full">
          <CustomText className="text-xl">CÓDIGO:</CustomText>
          <CustomText className="text-xl">{codPaciente}</CustomText>
        </div>

        <CustomText className="text-2xl font-bold text-center">DENTES</CustomText>

        <div className="grid grid-cols-3 gap-4">
          {opcoesDentes.map((dente, index) => (
            <button
              key={index}
              onClick={() => handleOpenModal(index)}
              className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
            >
              <CustomText className="text-lg">{dente.dente}</CustomText>
              <img src={parabensImg} alt="Dente" className="w-10 h-10" />
              <div className="mt-2">
                <CustomText>{dente.score !== null ? ` ${dente.score}` : ""}</CustomText>
              </div>
            </button>
          ))}
        </div>

        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              {[0, 1, 2, 3].map((score) => (
                <button
                  key={score}
                  onClick={() => handleSelecionarNotaDente(score)}
                  className="w-full p-2 border-b text-center"
                >
                  <CustomText className="text-lg">{`Score ${score}`}</CustomText>
                </button>
              ))}
              <button onClick={() => setModalVisible(false)} className="mt-4 text-blue-500">
                Fechar
              </button>
            </div>
          </div>
        )}

        <button className="mt-5 px-6 py-3 bg-blue-500 text-white rounded-md" onClick={handleSubmit}>
          RESULTADO
        </button>
      </div>
    </div>
  );
}
