import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Body from "../Components/Body";
import nome from '../../public/images/nome.png';
import logo from '../../public/images/logo.png';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o valor da entrada
    const [error, setError] = useState(''); // Estado para armazenar possíveis erros
    const navigate = useNavigate(); // Hook para navegação programática

    // Função chamada ao clicar no botão
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setError('Por favor, insira o nome do paciente.');
            return;
        }

        try {
            // Requisição para buscar o paciente pelo nome
            const response = await fetch(``);
            if (!response.ok) {
                throw new Error('Paciente não encontrado');
            }

            const paciente = await response.json();
            
            // Verifica se o paciente foi encontrado
            if (paciente && paciente.codPaciente) {
                // Redireciona para a página de avaliação dentária com o código do paciente.
                navigate(`/dentes/${paciente.codPaciente}`);
            } else {
                setError('Paciente não encontrado');
            }
        } catch (error) {
            setError('Erro ao buscar o paciente. Tente novamente.');
        }
    };

    return (
        <div>
            <Body>
                <div className="flex flex-col items-center justify-center h-screen bg-cover gap-10 mt-14">
                    <img className="w-full max-w-xs mb-4" src={nome} alt="Nome" />
                    <div className="flex items-center justify-center">
                        <input
                            type="text"
                            placeholder="Nome do Paciente"
                            value={searchTerm} // Define o valor do input como o estado
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setError(''); // Limpa o erro ao digitar
                            }}
                            className="flex-1 p-2 border-2 border-blue-400 rounded-l-md text-xl h-10"
                        />
                        <button
                            onClick={handleSearch} // Chama a função handleSearch ao clicar
                            className="p-2 bg-[#334EA0] text-white border border-blue-800 rounded-r-md cursor-pointer text-xl h-10"
                        >
                            &#128269;
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    <div className="flex flex-col items-center gap-24 mt-14">
                        <Link
                            to="/cadastro"
                            className="px-6 py-3 bg-[#334EA0] text-white border border-blue-600 rounded-md shadow-md hover:bg-blue-600 text-center w-60 text-2xl"
                        >
                            Cadastro
                        </Link>
                        <Link
                            to="/estatisticas"
                            className="px-6 py-3 bg-[#334EA0] text-white border border-blue-600 rounded-md shadow-md hover:bg-blue-600 text-center w-60 text-2xl"
                        >
                            Estatísticas
                        </Link>
                    </div>
                    <Link to="/app">
                        <img src={logo} className="w-40 mt-20" alt="Logo" />
                    </Link>
                </div>
            </Body>
        </div>
    );
}
