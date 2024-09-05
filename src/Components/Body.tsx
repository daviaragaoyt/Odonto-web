import React from 'react';

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center "
      style={{ backgroundImage: `url(/images/body.png)`, backgroundSize:'contain'} as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default Body;
