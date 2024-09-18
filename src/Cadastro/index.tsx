import { useState } from "react";
import Body from "../components/Body";

import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();
  // Hooks UseState
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("");

  // Função para formatar o CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    setCpf(value); // Atualiza o estado com o CPF formatado
  };

  // Função para quando o botão cadastrar for acionado
  const handleSubmit = async () => {
    if (!nome || !cpf || !matricula || !idade || !genero) {
      // Verificação de campos
      window.alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(
        "https://bakcend-deploy.vercel.app/addpaciente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            cpf: cpf.replace(/\D/g, ""), // Remove a máscara para enviar o CPF limpo
            matricula,
            idade,
            sexo: genero,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigate(`/dentes/${data.cod_paciente}`);
        window.alert("Paciente Cadastrado com Sucesso!");
        
      } else {
        console.error("Erro ao cadastrar");
        window.alert("Erro ao cadastrar!");
      }
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      window.alert("Erro ao cadastrar paciente. Por favor, tente novamente.");
    }
  };

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
      <h1 className="text-center text-white text-shadow text-3xl  font-lilitaOne mb-6 ">
        CADASTRO
      </h1>

      {/* Input de Nome */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl text-white text-shadow  font-lilitaOne">
          NOME:
        </h2>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome"
          className="mt-2 p-2 rounded-lg bg-white text-xl "
        />
      </div>

      {/* Input de CPF com máscara */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl text-white text-shadow  font-lilitaOne">CPF:</h2>
        <input
          type="text"
          value={cpf}
          onChange={handleCpfChange}
          placeholder="Digite o CPF"
          maxLength={14} // Limita o tamanho para 14 caracteres (###.###.###-##)
          className="mt-2 p-2 rounded-lg bg-white text-xl "
        />
      </div>

      {/* Input de Matrícula */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl text-white text-shadow  font-lilitaOne">
          MATRICULA:
        </h2>
        <input
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          placeholder="Digite a matrícula"
          className="mt-2 p-2 rounded-lg bg-white text-xl "
        />
      </div>

      {/* Input de Idade */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl text-white text-shadow  font-lilitaOne">
          IDADE:
        </h2>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Digite a idade"
          className="mt-2 p-2 rounded-lg bg-white text-xl "
        />
      </div>

      {/* Select de Sexo */}
      <div className="flex flex-col mb-6">
        <h2 className="text-xl text-white text-shadow  font-lilitaOne">
          SEXO:
        </h2>
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)} // Atualiza o estado do gênero
          className="mt-2 p-2 rounded-lg bg-white text-xl "
        >
          <option value="">Selecionar</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      {/* Botão Cadastrar */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#334EA0] text-white text-2xl  py-2 rounded-lg"
      >
        CADASTRAR
      </button>
    </Body>
  );
}
