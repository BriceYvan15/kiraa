
import React from 'react';

interface LoveLetterProps {
  message: string;
  onRestart: () => void;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ message, onRestart }) => {
  return (
    <div className="max-w-md mx-auto p-8 glass-morphism rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-700">
      <div className="text-center">
        <div className="mb-6 inline-block p-4 bg-pink-100 rounded-full animate-bounce">
          <svg className="w-12 h-12 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-serif text-pink-800 mb-6 italic">Pour toi, mon amour</h2>
        
        <div className="bg-white/50 p-6 rounded-2xl border border-pink-100 italic text-lg leading-relaxed text-gray-800 font-cursive whitespace-pre-line shadow-inner">
          {message}
        </div>
        
        <div className="mt-10 flex flex-col gap-4">
          <p className="text-pink-600 font-semibold tracking-widest uppercase text-xs">Joyeuse Saint-Valentin</p>
          <button 
            onClick={onRestart}
            className="text-pink-400 hover:text-pink-600 transition-colors text-sm underline underline-offset-4"
          >
            Recommencer le puzzle
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;
