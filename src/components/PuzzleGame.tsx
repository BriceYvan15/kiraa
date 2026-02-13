
import React, { useState, useEffect } from 'react';
import { Tile } from '../types';

interface PuzzleGameProps {
  imageUrl: string;
  gridSize: number;
  onComplete: () => void;
}

const PuzzleGame: React.FC<PuzzleGameProps> = ({ imageUrl, gridSize, onComplete }) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [isWon, setIsWon] = useState(false);

  // Initialize and shuffle
  useEffect(() => {
    const totalTiles = gridSize * gridSize;
    const initialTiles = Array.from({ length: totalTiles }, (_, i) => ({
      id: i,
      currentPos: i,
      correctPos: i,
    }));

    // Shuffle by swapping
    const shuffled = [...initialTiles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i].currentPos, shuffled[j].currentPos] = [shuffled[j].currentPos, shuffled[i].currentPos];
    }

    setTiles(shuffled.sort((a, b) => a.currentPos - b.currentPos));
  }, [gridSize]);

  const handleTileClick = (index: number) => {
    if (isWon) return;

    if (selectedTileIndex === null) {
      setSelectedTileIndex(index);
    } else {
      if (selectedTileIndex === index) {
        setSelectedTileIndex(null);
        return;
      }

      // Swap tiles
      const newTiles = [...tiles];
      const tempPos = newTiles[selectedTileIndex].currentPos;
      newTiles[selectedTileIndex].currentPos = newTiles[index].currentPos;
      newTiles[index].currentPos = tempPos;

      // Re-sort to maintain grid order
      const sortedTiles = [...newTiles].sort((a, b) => a.currentPos - b.currentPos);
      setTiles(sortedTiles);
      setSelectedTileIndex(null);

      // Check win condition
      const won = sortedTiles.every((tile) => tile.id === tile.currentPos);
      if (won) {
        setIsWon(true);
        setTimeout(onComplete, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="grid gap-1 p-2 bg-white rounded-xl shadow-2xl border-4 border-pink-200"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: 'min(90vw, 400px)',
          height: 'min(90vw, 400px)'
        }}
      >
        {tiles.map((tile, idx) => {
          const row = Math.floor(tile.id / gridSize);
          const col = tile.id % gridSize;
          const bgX = (col / (gridSize - 1)) * 100;
          const bgY = (row / (gridSize - 1)) * 100;

          return (
            <div
              key={tile.id}
              onClick={() => handleTileClick(idx)}
              className={`relative cursor-pointer transition-all duration-300 rounded-md overflow-hidden ${
                selectedTileIndex === idx ? 'ring-4 ring-pink-500 scale-95 z-10 shadow-lg' : 'hover:opacity-90'
              }`}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                backgroundPosition: `${bgX}% ${bgY}%`,
                backgroundRepeat: 'no-repeat',
                aspectRatio: '1/1',
              }}
            >
              {isWon && (
                <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                  <span className="text-white drop-shadow-md">✨</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-pink-700 font-medium animate-pulse">
        {isWon ? "Magnifique ! Prépare-toi..." : "Touche deux cases pour les échanger et reconstituer l'image ❤️"}
      </p>
    </div>
  );
};

export default PuzzleGame;
