import React from 'react';

interface LoaderProps {
  message?: string;
  showSubtext?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ message, showSubtext = true }) => {
  const defaultMessages = [
    "Desenhando logos...",
    "Esboçando banners...",
    "Criando capas...",
    "Finalizando posts...",
    "Consultando as musas da IA...",
    "Polindo os pixels...",
  ];
  
  const [dynamicMessage, setDynamicMessage] = React.useState(defaultMessages[0]);

  React.useEffect(() => {
    if (message) return; // Don't cycle if a static message is provided

    const intervalId = setInterval(() => {
      setDynamicMessage(prevMessage => {
        const currentIndex = defaultMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % defaultMessages.length;
        return defaultMessages[nextIndex];
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-amber-300 font-semibold transition-opacity duration-500">
        {message || dynamicMessage}
      </p>
      {showSubtext && <p className="mt-2 text-gray-400">Isso pode levar alguns instantes.</p>}
    </div>
  );
};
