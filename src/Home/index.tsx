import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Body from "../Components/Background";
import nome from '../../public/images/nome.png';
import logo from '../../public/images/logo.png';
import { FaSearch } from 'react-icons/fa';

export default function Home() {
    const [matricula, setMatricula] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const [appDisponivel] = useState(() => {
        const startDate = new Date('2024-10-03T00:00:00-03:00'); // Data de início
        const endDate = new Date('2024-10-03T23:59:59-03:00'); // Data de fim
        const currentDate = new Date(); // Data atual

        // Verificando se a data atual está dentro do período
        if (currentDate < startDate || currentDate > endDate) {
            // Alert.alert("Erro!", "Servidor fora do ar");
            return false
        }
        return true
    })

    // Função chamada ao clicar no botão
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!matricula.trim()) {
            setError('Por favor, insira a matrícula do Paciente.');
            return;
        }

        try {
            // Requisição para buscar o paciente pela matrícula
            const response = await fetch(`https://bakcend-deploy.vercel.app/paciente/${matricula}`);



            if (!response.ok) {
                throw new Error('Paciente não encontrado');
            }

            // Verifica se o paciente foi encontrado
            const data = await response.json();
            console.log("response", response)
            if (data) {
                // Redireciona para a página de avaliação dentária e passa os dados do paciente no state
                navigate(`/dentes/${matricula}`, { state: { matricula: matricula } });
            } else {
                setError('Paciente não encontrado');
            }
        } catch {
            setError('Erro ao buscar o paciente. Tente novamente.');
        }
    }
    if (!appDisponivel) {
        window.alert('Servidores Fora de ar!')
        return (

            <div>
                <Body>
                    <div className="flex flex-col items-center justify-center h-screen bg-cover gap-10 mt-14">
                        <h1 className="text-3xl text-white text-shadow  font-lilitaOne">
                            App Indisponivel.
                        </h1>
                        <h1 className="text-xl text-white text-shadow  font-lilitaOne">
                            Volte Novamente Mais Tarde.
                        </h1>
                    </div>
                </Body>

            </div>
        )
    }

    return (
        <div>
            <Body>
                <div className="flex flex-col items-center justify-center h-screen bg-cover gap-10 mt-14">
                    <img className="w-full max-w-xs mb-4" src={nome} alt="Nome" />
                    <form onSubmit={handleSearch} className="flex items-center justify-center">
                        <input
                            type="text"
                            placeholder="Matrícula do Paciente"
                            value={matricula}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
                                if (value.length <= 7) { // Limita o input a 7 dígitos
                                    setMatricula(value); // Atualiza o estado apenas se for menor ou igual a 7
                                }
                                setError('');
                            }}
                            maxLength={7} // Limita o input para no máximo 7 caracteres
                            className="flex-1 p-2 border-3 border-blue-400 rounded-l-md text-xl h-10"
                        />


                        <button
                            type='submit'
                            className=" p-2 bg-[#334EA0] text-white border border-blue-800 rounded-r-md cursor-pointer text-xl h-10"
                        >
                            <FaSearch className='text-xl'></FaSearch>
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    <div className="flex flex-col items-center gap-24 mt-14">
                        <Link to="/cadastro" className="px-6 py-3 bg-[#334EA0] text-white border border-blue-600 rounded-md shadow-md hover:bg-blue-600 text-center w-60 text-2xl">
                            CADASTRO
                        </Link>
                        <Link to="/estatisticas" className="px-6 py-3 bg-[#334EA0] text-white border border-blue-600 rounded-md shadow-md hover:bg-blue-600 text-center w-60 text-2xl">
                            ESTATISTICAS
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
