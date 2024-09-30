import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './Cadastro'; // Importar o componente de Cadastro
import Home from './Home';
import Dentes from './dentes';
import Resultado1 from './resultados/resultado1';

const App: React.FC = () => {
  return (
    <BrowserRouter >
      <Routes >
        <Route  path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dentes/:codPaciente" element={<Dentes />} />
        <Route path="/resultados/resultado1" element={<Resultado1/>}  />
      </Routes>
    </BrowserRouter>
  );
};

export default App;