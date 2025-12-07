import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onGenerate, isLoading }) => {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ex: uma cafeteria chamada 'Aroma Cósmico' com tema espacial..."
        className="w-full flex-grow bg-gray-800 border-2 border-gray-700 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 resize-none h-16 sm:h-auto sm:min-h-[4rem]"
        rows={2}
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt.trim()}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-amber-400 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500"
      >
        <SparklesIcon className="w-6 h-6" />
        <span>{isLoading ? 'Gerando...' : 'Gerar'}</span>
      </button>
    </div>
  );
};
