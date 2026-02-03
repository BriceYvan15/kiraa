
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: 5 + Math.random() * 5,
          size: 15 + Math.random() * 25,
        },
      ]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-red-300 opacity-40 animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            fontSize: `${heart.size}px`,
            animation: `float ${heart.duration}s ease-in-out forwards`,
            animationName: 'floatUp',
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          from { transform: translateY(0); opacity: 0.4; }
          to { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
