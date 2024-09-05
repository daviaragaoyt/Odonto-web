import React, { useState } from "react";
import Body from "../Components/Body";

import {useNavigate } from 'react-router-dom'

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  // Hooks UseState
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState(''); // Captura do gênero

  // Função para quando o botão cadastrar for acionado
  const handleSubmit = async () => {
    if (!nome || !matricula || !idade || !genero) { // Verificação de campos
      console.log("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    else{
      console.log("Cadastrado com sucesso")
    }

    try {
      const response = await fetch('https://bakcend-deploy.vercel.app/addpaciente', { // URL da API na Vercel
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          cpf: matricula,
          idade: idade,
          sexo: genero, // Gênero selecionado
        }),
      });

      if (response.ok) {
        console.log('Sucesso', 'Paciente cadastrado com sucesso!');
       
      } else {
        console.log('Erro', 'Esse nome já existe em nosso sistema.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      console.log('Erro', 'Erro ao cadastrar paciente. Por favor, tente novamente.');
    }
  };

  return (
    <Body>
      <div className="w-10  h-10 flex justify-center items-center bg-blue-500 rounded" onClick={() => navigate('/')}>
      <button className="top-50 right-10">
            <div className="text-white text-lg">←</div>
          </button>
      </div>
      <h1 className="text-center text-white text-shadow text-3xl  font-lilitaOne mb-6 ">CADASTRO</h1>

      {/* Input de Nome */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl text-white text-shadow  font-lilitaOne">NOME:</h2>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome"
          className="mt-2 p-2 rounded-lg bg-white text-xl "
        />
      </div>

      {/* Input de Matrícula */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl text-white text-shadow  font-lilitaOne">MATRICULA:</h2>
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
        <h2 className="text-xl text-white text-shadow  font-lilitaOne">IDADE:</h2>
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
        <h2 className="text-xl text-white text-shadow  font-lilitaOne">SEXO:</h2>
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
};

export default Cadastro;
