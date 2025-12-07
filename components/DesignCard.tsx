import React from 'react';
import { type Design } from '../types';

interface DesignCardProps {
  design: Design;
}

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
)


export const DesignCard: React.FC<DesignCardProps> = ({ design }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = design.imageUrl;
    link.download = `${design.type.toLowerCase().replace(' ', '_')}_${design.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="group relative aspect-square bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700/50 transition-all duration-300 hover:shadow-amber-500/20 hover:border-amber-500/50 transform hover:-translate-y-1">
      <img 
        src={design.imageUrl} 
        alt={`Design do tipo ${design.type}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100" />
      
      <div className="absolute bottom-0 left-0 p-3 w-full flex justify-between items-center">
        <span className="text-xs font-bold bg-gray-900/80 text-amber-300 px-2 py-1 rounded-md">
          {design.type}
        </span>
      </div>

      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={downloadImage}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-amber-400 transition-all transform scale-90 group-hover:scale-100 duration-300"
          >
              <DownloadIcon className="w-5 h-5"/>
              Baixar
          </button>
      </div>
    </div>
  );
};
