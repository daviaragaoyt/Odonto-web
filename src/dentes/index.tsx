import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import denteIcon from "../../public/images/Group.png";
import Body from "../Components/Background";

interface Dente {
  id: number;
  dente: string;
  score: number | null
}

interface Paciente {
  cod_paciente: number;
  nome: string;
  idade: number;
  sexo: string;
  cpf: string;
  matricula: number;
}

export default function Dentes() {
  const navigate = useNavigate();
  const { matricula } = useParams<{ matricula: string }>();
  const [paciente, setPaciente] = useState<Paciente | null>()
  const [isLoading, setIsLoading] = useState(false);
  // const location = useLocation();
  // const { nome, matricula } = location.state || {};

  const [opcoesDentes, setOpcoesDentes] = useState<Dente[]>([
    { id: 1, dente: "V11", score: null },
    { id: 2, dente: "V16", score: null },
    { id: 3, dente: "V26", score: null },
    { id: 4, dente: "V31", score: null },
    { id: 5, dente: "L36", score: null },
    { id: 6, dente: "L46", score: null }
    // Continue para os outros dentes...
  ]);

  useEffect(() => {
    const fetchPaciente = async () => {
      if (!matricula) return;
      try {
        setIsLoading(true)
        const response = await fetch(`https://bakcend-deploy.vercel.app/paciente/${matricula}`);
       
        

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Erro ao buscar os dados do paciente: ${errorData}`);
        }

        const data = await response.json()
        setIsLoading(false)
        setPaciente(data)
      } catch {
        setIsLoading(false)
        console.log('Deu ruim!')
      }
    };

    fetchPaciente();
  }, [matricula]);

  const calcularMedia = () => {
    const totalNotas = opcoesDentes.reduce(
      (sum, dente) => sum + (dente.score ?? 0), // Usa 0 se o score for null
      0
    );
    return totalNotas / opcoesDentes.length;
  };

  const handleSubmit = async () => {
    const media = calcularMedia();
    console.log({
      avaliacao_arcada: opcoesDentes.map(dente => dente.score).join(','),
      fk_paciente_cod_paciente: matricula,
      fk_dente_cod_dente: opcoesDentes.map(dente => dente.id).join(','),
    });

    try {
      const response = await fetch("https://bakcend-deploy.vercel.app/adddentes", {
     
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avaliacao_arcada: opcoesDentes.map(dente => dente.score).join(','),
          fk_paciente_cod_paciente: paciente?.cod_paciente,
          fk_dente_cod_dente: opcoesDentes.map(dente => dente.id).join(','),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Captura o erro em formato JSON
        throw new Error(`Erro ao salvar dados dos dentes: ${errorData.message || 'Erro desconhecido'}`);
      }

      if (media <= 1) {
        navigate("/resultados/resultado1");
      } else if (media <= 2) {
        navigate("/resultados/resultado2");
      } else if (media <= 3) {
        navigate("/resultados/resultado3");
      }
    } catch {

      alert('Erro ao enviar os dados, por favor tente novamente.');
    }
  };


  const handleScoreChange = (index: number, score: number) => {
    const novasOpcoesDentes = [...opcoesDentes];
    novasOpcoesDentes[index].score = score;
    setOpcoesDentes(novasOpcoesDentes);
  };

  if (!paciente) {

    return (
      <Body>
        <h1 text-xl text-zinc-50>{isLoading ? 'Carregando...' : 'Paciente não cadastrado!'}</h1>
      </Body>
    )
  }

  return (
    <Body>
      <div
        className="w-10  h-10 flex justify-center items-center bg-[#334EA0] rounded"
        onClick={() => navigate("/")}
      >
        <button className="top-50 right-10">
          <div className="text-white text-lg">←</div>
        </button>
      </div>
      <h1 className="text-center text-3xl text-zinc-50">DENTES</h1>

      {/* Nome do Paciente */}
      <div className="flex flex-col mb-6">
        <h3 className="text-xl text-zinc-50">NOME:</h3>
        <input
          value={paciente.nome}
          className="mt-2 p-2 rounded-lg bg-white text-xl font-bold"
          readOnly
        />
      </div>

      {/* Código do Paciente */}
      <div className="flex flex-col mb-4">
        <h5 className="text-xl text-zinc-50">MATRICULA:</h5>
        <input
          typeof="true"
          value={matricula}
          className="mt-2 p-2 rounded-lg bg-white text-xl font-bold"
          readOnly
        />
      </div>

      {/* Dentes */}
      <div className="grid grid-cols-2 gap-4 my-6">
        {opcoesDentes.map((dente, index) => (
          <div key={index} className="flex items-center">
            {/* Nome do Dente */}
            <span className="text-xl font-bold mr-2 text-zinc-50">{dente.dente}</span>

            {/* Imagem do Dente */}
            <img src={denteIcon} alt="Dente" className="w-10 h-10 mr-2" />

            {/* Input para Condição do Dente */}
            <select
              className="p-2 w-16 h-16 bg-white rounded-lg shadow-lg text-center text-xl"
              value={dente.score !== null ? dente.score : ""}
              onChange={(e) =>
                handleScoreChange(index, parseInt(e.target.value))
              }
            >
              <option value=""></option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        ))}
      </div>

      {/* Botão Resultado */}
      <button
        className="w-full bg-[#334EA0] text-white text-2xl py-2 rounded-lg"
        onClick={handleSubmit}
      >
        RESULTADO
      </button>
    </Body>
  );
}