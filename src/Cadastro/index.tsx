import {  useState } from "react";
import Background from "../Components/Background";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("");

  // Função para validar CPF
  const validarCpf = (cpf:string) => {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) {
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  };

  // Função para formatar o CPF
  const handleCpfChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedCpf = value;
    if (value.length <= 11) {
      formattedCpf = value.replace(/(\d{3})(\d)/, "$1.$2");
      formattedCpf = formattedCpf.replace(/(\d{3})(\d)/, "$1.$2");
      formattedCpf = formattedCpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    setCpf(formattedCpf);
  };

  // Função para garantir matrícula com 7 números
  const handleMatriculaChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 7) {
      setMatricula(value);
    }
  };

  // Função para filtrar apenas letras para o nome
  const handleNomeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, ''); // Remove tudo que não é letra ou espaço
    setNome(value);
  };

  // Função para quando o botão cadastrar for acionado
  const handleSubmit = async () => {
    if (!nome || !cpf || !matricula || !idade || !genero) {
      window.alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!validarCpf(cpf)) {
      window.alert("CPF inválido. Por favor, verifique e tente novamente.");
      return;
    }

    const idadeNum = parseInt(idade);
    if (isNaN(idadeNum) || idadeNum < 2 || idadeNum > 100) {
      window.alert("A idade deve estar entre 2 e 100 anos.");
      return;
    }

    try {
      const response = await fetch("https://bakcend-deploy.vercel.app/addpaciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          cpf: cpf.replace(/\D/g, ""),
          matricula,
          idade,
          sexo: genero,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/dentes/${data.matricula}`, {
          state: { nome, matricula }
        });
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
    <Background>
      <div
        className="w-10 h-10 flex justify-center items-center bg-[#334EA0] rounded"
        onClick={() => navigate("/")}
      >
        <button className="top-50 right-10">
          <div className="text-white text-lg">←</div>
        </button>
      </div>
      <h1 className="text-center text-white text-shadow text-3xl font-lilitaOne mb-6">
        CADASTRO
      </h1>

      {/* Input de Nome */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl text-white text-shadow font-lilitaOne">NOME:</h2>
        <input
          type="text"
          value={nome}
          onChange={handleNomeChange} // Chama a função que filtra apenas letras
          placeholder="Digite o nome"
          className="mt-2 p-2 rounded-lg bg-white text-xl"
        />
      </div>

      {/* Input de CPF com máscara */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl text-white text-shadow font-lilitaOne">CPF:</h2>
        <input
          type="text"
          value={cpf}
          onChange={handleCpfChange}
          placeholder="Digite o CPF"
          maxLength={14}
          className="mt-2 p-2 rounded-lg bg-white text-xl"
        />
      </div>

      {/* Input de Matrícula */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl text-white text-shadow font-lilitaOne">MATRICULA:</h2>
        <input
          type="text"
          value={matricula}
          onChange={handleMatriculaChange}
          placeholder="Digite a matrícula"
          className="mt-2 p-2 rounded-lg bg-white text-xl"
        />
      </div>

      {/* Input de Idade */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl text-white text-shadow font-lilitaOne">IDADE:</h2>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Digite a idade"
          className="mt-2 p-2 rounded-lg bg-white text-xl"
        />
      </div>

      {/* Select de Sexo */}
      <div className="flex flex-col mb-6">
        <h2 className="text-xl text-white text-shadow font-lilitaOne">SEXO:</h2>
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="mt-2 p-2 rounded-lg bg-white text-xl"
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
        className="w-full bg-[#334EA0] text-white text-2xl py-2 rounded-lg"
      >
        CADASTRAR
      </button>
    </Background>
  );
}
