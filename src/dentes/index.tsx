import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import denteIcon from "../../public/images/Group.png";
import Body from "../components/Body";

interface Paciente {
  cod_paciente: number;
  cpf: string;
  idade: number;
  matricula: number;
  nome: string;
  sexo: string;
}

interface Dente {
  id: number;
  dente: string;
  score: number | null;
}

export default function Dentes() {
  const navigate = useNavigate();
  const { codPaciente } = useParams<{ codPaciente: string }>();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [error, setError] = useState("");
  const [opcoesDentes, setOpcoesDentes] = useState<Dente[]>([
    { id: 1, dente: "V11", score: null },
    { id: 2, dente: "V16", score: null },
    { id: 3, dente: "V26", score: null },
    { id: 4, dente: "V31", score: null },
    { id: 5, dente: "L36", score: null },
    { id: 6, dente: "L46", score: null },
  ]);

  // Faz a requisição para buscar os dados do paciente ao montar o componente
  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await fetch(
          `https://bakcend-deploy.vercel.app/paciente/${codPaciente}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do paciente");
        }
        const data = await response.json();
        setPaciente(data); // Atualiza o estado com os dados do paciente
      } catch {
        setError("Erro ao buscar os dados do paciente");
      }
    };

    if (codPaciente) {
      fetchPaciente();
    }
  }, [codPaciente]);

  // Função para calcular a média dos scores
  const calcularMedia = () => {
    const totalNotas = opcoesDentes.reduce(
      (sum, dente) => sum + (dente.score !== null ? dente.score : 0),
      0
    );
    const media = totalNotas / opcoesDentes.length;
    return media;
  };

  // Submeter o formulário
  const handleSubmit = async () => {
    const media = calcularMedia();

    // Salvando os dados no backend
    try {
      const response = await fetch(
        "https://bakcend-deploy.vercel.app/adddentes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Avaliacao_arcada: opcoesDentes
              .map((dente) => dente.score)
              .join(","),
            fk_Paciente_Cod_Paciente: codPaciente,
            fk_Dente_Cod_dente: opcoesDentes.map((dente) => dente.id).join(","),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao salvar dados dos dentes.");
      }
    } catch {
      alert("Erro ao salvar os dados.");
    }

    // Navegar para a página correta com base na média
    if (media >= 0 && media <= 1) {
      navigate("/resultados/resultado"); // Página para média entre 0 e 1
    } else if (media > 1 && media <= 2) {
      navigate("/resultados/resultado1"); // Página para média entre 1 e 2
    } else if (media > 2 && media <= 3) {
      navigate("/resultados/resultado2"); // Página para média entre 2 e 3
    }
  };

  // Lidar com a alteração de scores dos dentes
  const handleScoreChange = (index: number, score: number) => {
    const novasOpcoesDentes = [...opcoesDentes];
    novasOpcoesDentes[index].score = score;
    setOpcoesDentes(novasOpcoesDentes);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Body>
      <div
        className="w-10  h-10 flex justify-center items-center bg-[#334EA0] rounded"
        onClick={() => navigate("/cadastro")}
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
          value={paciente?.nome}
          className="mt-2 p-2 rounded-lg bg-white text-xl font-bold"
          readOnly
        />
      </div>

      {/* Código do Paciente */}
      <div className="flex flex-col mb-4">
        <h5 className="text-xl text-zinc-50">MATRICULA:</h5>
        <input
          typeof="true"
          value={paciente?.matricula}
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
