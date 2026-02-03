
import React, { useState } from 'react';
import { AppStage } from './types';
import FloatingHearts from './components/FloatingHearts';
import PuzzleGame from './components/PuzzleGame';
import LoveLetter from './components/LoveLetter';

// The "password" - can be customized by the developer
const SECRET_PASSWORD = (import.meta.env.VITE_SECRET_PASSWORD ?? "amour").toLowerCase().trim();

const FINAL_MESSAGE = `💕 j'ai d'abord  fait ce petit jeu  avec le bouton "Oui" et le "Non" qui s'enfuit dès qu'on s'approche qui était dans la vidéo que je t'ai partagé. Mais je me suis dit que tu devais déjà connaître ce concept, que ce serait trop prévisible. Alors j'ai préféré te créer quelque chose d'un peu plus perso : le mot de passe, le puzzle avec ta photo... C'est pas parfait, mais au moins c'est fait pour toi et j'espère que tu as aimé. 😊

tu sais, on est tous les deux en train de construire nos vies, nos avenirs, notre stabilité. C'est notre priorité à tous les deux en ce moment, et c'est normal. Mais je crois sincèrement qu'on peut aussi construire quelque chose ensemble, à notre façon. On n'a pas besoin de choisir entre nos ambitions et nous. On peut avancer chacun de notre côté tout en avançant ensemble, à notre rythme, sans pression, sans sacrifices.

La distance rend les choses compliquées, c'est vrai. Nos agendas chargés aussi. Mais je veut vraiment, qu'on trouve toujours du temps l'un pour l'autre. Et moi, je veux te faire cette place dans ma vie. Je veux qu'on crée nos moments, même rares, même virtuels parfois, mais qu'ils soient à nous.😊

Je t'aime, Honey. Vraiment. Et j'ai envie de voir jusqu'où on peut aller ensemble, sans forcer les choses, juste en étant nous. ❤️`;

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LOGIN);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // You can change this to any photo URL
  const puzzleImageUrl = import.meta.env.VITE_PUZZLE_IMAGE_URL ?? "https://picsum.photos/seed/valentine/800/800";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.toLowerCase().trim() === SECRET_PASSWORD) {
      setMessage(FINAL_MESSAGE);
      setStage(AppStage.PUZZLE);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handlePuzzleComplete = () => {
    // Trigger confetti - Cast window to any to avoid TypeScript errors for dynamic properties
    if (typeof (window as any).confetti === 'function') {
      (window as any).confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#ec4899', '#db2777', '#ffffff']
      });
    }
    setStage(AppStage.MESSAGE);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-red-50">
      <FloatingHearts />
      
      <main className="z-10 w-full max-w-2xl">
        {stage === AppStage.LOGIN && (
          <div className="max-w-md mx-auto glass-morphism p-10 rounded-3xl shadow-2xl border border-white/40 animate-in slide-in-from-bottom-10 duration-1000">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-serif text-pink-700 mb-2 italic">Coucou toi...</h1>
              <p className="text-pink-600/80">Entre le petit mot secret pour continuer</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Le mot de passe..."
                  className={`w-full px-6 py-4 rounded-full bg-white/60 border-2 focus:outline-none focus:ring-4 focus:ring-pink-200 transition-all text-center text-lg ${
                    error ? 'border-red-400 shake animate-bounce' : 'border-pink-100 focus:border-pink-400'
                  }`}
                />
                {error && <p className="text-red-500 text-xs text-center mt-2 font-medium">Oups ! Ce n'est pas le bon mot secret ❤️</p>}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-pink-300/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Continuer</span>
                    <span className="group-hover:translate-x-1 transition-transform">❤️</span>
                  </>
                )}
              </button>
            </form>
            
            <p className="text-center mt-8 text-pink-300 text-sm italic">
              Indice: Le nom que je t'ai donné 
            </p>
          </div>
        )}

        {stage === AppStage.PUZZLE && (
          <div className="animate-in fade-in duration-1000">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif text-pink-800 italic">Reconstitue le puzzle. J'aurais voulu mettre une photo de nous deux mais on en a pas encore... 😊</h2>
            </div>
            <PuzzleGame 
              imageUrl={puzzleImageUrl} 
              gridSize={3} 
              onComplete={handlePuzzleComplete} 
            />
          </div>
        )}

        {stage === AppStage.MESSAGE && (
          <LoveLetter 
            message={message} 
            onRestart={() => setStage(AppStage.PUZZLE)} 
          />
        )}
      </main>

      {/* Credits/Footer */}
      <footer className="fixed bottom-4 left-0 right-0 text-center text-pink-300/60 text-xs uppercase tracking-widest font-semibold pointer-events-none">
        Fait avec tout mon amour • doudou
      </footer>
    </div>
  );
};

export default App;
