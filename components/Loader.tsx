import React from 'react';

export const Loader: React.FC = () => {
  const messages = [
    "Desenhando logos...",
    "Esboçando banners...",
    "Criando capas...",
    "Finalizando posts...",
    "Consultando as musas da IA...",
    "Polindo os pixels...",
  ];
  
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-amber-300 font-semibold transition-opacity duration-500">{message}</p>
      <p className="mt-2 text-gray-400">Isso pode levar alguns instantes.</p>
    </div>
  );
};
