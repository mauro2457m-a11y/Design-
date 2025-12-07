import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { DesignGrid } from './components/DesignGrid';
import { Loader } from './components/Loader';
import { type Design } from './types';
import { generateDesigns } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setDesigns([]);

    try {
      const result = await generateDesigns(prompt);
      setDesigns(result);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Falha ao gerar os designs. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col items-center">
        <div className="w-full sticky top-4 z-10 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 shadow-lg">
          <PromptInput 
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>
        
        <div className="w-full flex-grow flex items-center justify-center mt-8">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="text-center text-red-400 bg-red-900/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Ocorreu um Erro</h3>
              <p>{error}</p>
            </div>
          ) : designs.length > 0 ? (
            <DesignGrid designs={designs} />
          ) : (
             <div className="text-center text-gray-400">
              <h2 className="text-2xl font-bold text-gray-200">Bem-vindo ao Designer Automático</h2>
              <p className="mt-2 max-w-2xl">
                Descreva sua marca, produto ou ideia no campo acima e clique em "Gerar" para criar 10 peças de design exclusivas e com qualidade premium em segundos.
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;