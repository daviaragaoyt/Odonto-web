import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './Cadastro/index'; // Importar o componente de Cadastro

import Home from './Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
