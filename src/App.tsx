import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadastroPaciente from './Cadastro/index'; // Importar o componente de Cadastro
import Home from './Home';
import DenteForm from './Dentes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes >
        <Route  path="/" element={<Home />} />
        <Route path="/Dentes" element={<DenteForm />} />
        <Route path="/cadastro" element={<CadastroPaciente />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
