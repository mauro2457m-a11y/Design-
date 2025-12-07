import React from 'react';
import { type Design } from '../types';
import { DesignCard } from './DesignCard';

interface DesignGridProps {
  designs: Design[];
}

export const DesignGrid: React.FC<DesignGridProps> = ({ designs }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {designs.map((design) => (
        <DesignCard key={design.id} design={design} />
      ))}
    </div>
  );
};
