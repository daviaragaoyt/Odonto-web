import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import nome from './assets/nome.png';

import logo from './assets/logo.png';
import Cadastro from './Cadastro/index'; // Importar o componente de Cadastro
import Estatisticas from './Estatisticas/index'; // Importar o componente de Estatísticas

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center justify-center h-screen bg-cover gap-10 mt-14"
       >
        <img className="w-full max-w-xs mb-4" src={nome} alt="Nome" />
        <div className="flex items-center justify-center ">
          <input type="text" placeholder="Nome do Paciente" className="flex-1 p-2 border-2 border-blue-400 rounded-l-md text-xl h-10" />
          <button className="p-2 bg-blue-400 text-white border border-blue-800 rounded-r-md cursor-pointer text-xl h-10">&#128269;</button>
        </div>
        <div className="flex flex-col items-center gap-24 mt-14 ">
          <Link to="/cadastro" className="px-6 py-3  bg-blue-400 text-white border border-blue-600 rounded-md shadow-md hover:bg-blue-600 text-center w-60 text-2xl">
            Cadastro
          </Link>
          <Link to="/estatisticas" className="px-6 py-3 bg-blue-400 text-white border border-blue-600 rounded-md shadow-md hover:bg-blue-600 text-center w-60 text-2xl">
            Estatísticas
          </Link>
        </div>
        <Link to='/app'><img src={logo} className="w-40 mt-20" alt="Logo"/></Link>
        
      </div>

      {/* Definindo as rotas */}
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/estatisticas" element={<Estatisticas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;