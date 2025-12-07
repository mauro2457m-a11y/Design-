import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center my-8 md:my-12">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
          Designer Automático Premium
        </span>
      </h1>
      <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
        Crie 10 designs profissionais com um único clique. Logos, capas, banners e posts, todos com um estilo premium e prontos para usar.
      </p>
    </header>
  );
};
