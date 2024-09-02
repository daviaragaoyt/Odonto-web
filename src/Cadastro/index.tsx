import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook do React Router para navegação
import CustomText from '../Components/CustomText'; // Usando CustomText como um componente React padrão


export default function Index() {
  const navigate = useNavigate();

  // Hooks de estado
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const sexo = [
    { id: 1, texto: 'Feminino' },
    { id: 2, texto: 'Masculino' },
    { id: 3, texto: 'Outros' },
    { id: 4, texto: 'Voltar' },
  ];

  // Função para quando o botão cadastrar for acionado
  const handleSubmit = async () => {
    if (!nome || !matricula || !idade || !genero) {
      alert("Erro: Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch('https://bakcend-deploy.vercel.app/addpaciente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          cpf: matricula,
          idade: idade,
          sexo: genero,
        }),
      });

      if (response.ok) {
        alert('Sucesso: Paciente cadastrado com sucesso!');
        setNome('');
        setMatricula('');
        setIdade('');
        setGenero('');
        navigate('/'); // Redirecionar para a página inicial
      } else {
        alert('Erro: Esse nome já existe em nosso sistema.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      alert('Erro: Erro ao cadastrar paciente. Por favor, tente novamente.');
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex flex-1 bg-[#1CAAFA] absolute inset-0">
      
      <div className="absolute inset-0 flex justify-center items-center">
        <button className="absolute top-24 left-5 w-10 h-10 flex justify-center items-center bg-blue-500 rounded" onClick={() => navigate(-1)}>
          <CustomText className="text-white text-lg">←</CustomText>
        </button>
        <CustomText className="mt-48 text-white text-4xl shadow-md">CADASTRO</CustomText>
        <div className="flex flex-col items-start mt-18 w-4/5 space-y-2.5">
          <div className="flex items-start flex-row mb-5">
            <CustomText className="text-white text-xl mr-12 shadow-md">NOME:</CustomText>
            <input
              type="text"
              className="flex-1 border border-blue-400 rounded bg-white w-52 h-10 text-lg text-black p-1"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
            />
          </div>

          <div className="flex items-start flex-row mb-5">
            <CustomText className="text-white text-xl mr-2 shadow-md">MATRÍCULA:</CustomText>
            <input
              type="text"
              className="flex-1 border border-blue-400 rounded bg-white w-52 h-10 text-lg text-black p-1"
              onChange={(e) => setMatricula(e.target.value)}
              value={matricula}
            />
          </div>

          <div className="flex items-start flex-row mb-5">
            <CustomText className="text-white text-xl mr-12 shadow-md">IDADE:</CustomText>
            <input
              type="number"
              className="flex-1 border border-blue-400 rounded bg-white w-52 h-10 text-lg text-black p-1"
              onChange={(e) => setIdade(e.target.value)}
              value={idade}
            />
          </div>

          <div className="flex items-start flex-row mb-5">
            <CustomText className="text-white text-xl mr-12 shadow-md">SEXO:</CustomText>
            <button className="flex-1 border border-blue-400 rounded bg-white w-52 h-10 text-lg text-black p-1" onClick={openModal}>
              <CustomText className="text-black shadow-md text-xl">{genero || 'Selecionar'}</CustomText>
            </button>
          </div>

          <button className="text-center justify-center items-center h-18 ml-2.5 w-72 p-3.5 mt-25 rounded border border-blue-700 bg-blue-500" onClick={handleSubmit}>
            <CustomText className="text-white text-2xl shadow-md">CADASTRAR </CustomText>
          </button>
        </div>

        {modalVisible && (
          <div className="flex-1 flex justify-center items-center mt-5.5">
            <div className="m-5 bg-white rounded p-9 flex items-center shadow-md w-52">
              {sexo.map(item => (
                <button
                  key={item.id}
                  className="w-full p-3.5 flex items-center border-b rounded"
                  onClick={() => {
                    if (item.texto !== 'Voltar') {
                      setGenero(item.texto);
                    }
                    closeModal();
                  }}
                >
                  <CustomText className="text-base text-black text-center">{item.texto}</CustomText>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
