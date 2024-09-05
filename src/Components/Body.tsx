import React from 'react';

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(/images/body.png)`, backgroundSize: 'contain' } as React.CSSProperties}
    >
      {/* Camada escura sobre a imagem */}
      <div className="absolute inset-0  bg-sky-600 opacity-50"></div>
      
      {/* Conteúdo acima da imagem e da camada de escurecimento */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Body;
