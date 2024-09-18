import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './cadastro'; // Importar o componente de Cadastro
import Home from './home';
import Dentes from './dentes';

const App: React.FC = () => {
  return (
    <BrowserRouter >
      <Routes >
        <Route  path="/" element={<Home />} />
        <Route path="/dentes/:codPaciente" element={<Dentes />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;