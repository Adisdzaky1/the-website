'use client';

import { useState } from 'react';

export default function Home() {
  // --- 1. STATE (Data yang bisa berubah) ---
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [isHovered, setIsHovered] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [btnText, setBtnText] = useState("JANGAN KLIK GW!");
  const [isWinner, setIsWinner] = useState(false);

  const taunts = [
    "Eits! Meleset!", "Kurang Cepat!", "Wleee 😜", "Skill Issue?", 
    "Lambat Banget!", "Hampir...", "Coba Lagi!", "Nyerah Aja!"
  ];

  // --- 2. FUNGSI LOGIC (TARUH DI SINI) ---

  // Fungsi buat mindahin tombol
  const moveButton = () => {
    if (isWinner) return;

    // Hitung posisi acak
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);

    setPosition({ top: `${y}px`, left: `${x}px` });
    setAttempts((prev) => prev + 1);
    
    // Ganti kata-kata ejekan
    const randomText = taunts[Math.floor(Math.random() * taunts.length)];
    setBtnText(randomText);
    
    if (!isHovered) setIsHovered(true);
  };

  // Fungsi saat tombol DIKLIK (Logic anti menang instan)
  const handleButtonClick = () => {
    if (isWinner) return;

    // Trick: 90% peluang tombol malah kabur saat diklik biar user kesel
    if (Math.random() > 0.1) {
      moveButton();
    } else {
      setIsWinner(true); // Cuma 10% peluang buat benar-benar menang
    }
  };

  const resetGame = () => {
    setIsWinner(false);
    setAttempts(0);
    setBtnText("JANGAN KLIK GW!");
    setIsHovered(false);
    setPosition({ top: '50%', left: '50%' });
  };

  // --- 3. TAMPILAN (RETURN) ---
  return (
    <main className="h-screen w-full bg-slate-900 text-white overflow-hidden relative font-mono select-none">
      
      {/* Judul & Skor */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse text-center">
          LEVEL: MUSTAHIL
        </h1>
        <p className="text-slate-400 text-lg mb-8 text-center">Coba klik tombol merah di bawah.</p>
        
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shadow-2xl text-center">
            <p className="text-xs text-slate-500 uppercase">Gagal Nangkep</p>
            <span className="text-4xl font-bold text-red-500">{attempts}</span>
        </div>
      </div>

      {/* TOMBOL UTAMA */}
      <button
        onPointerOver={moveButton} // Lari saat kursor mendekat (PointerOver lebih sakti dari Hover)
        onClick={handleButtonClick} // Logic saat diklik
        style={{ 
            top: position.top, 
            left: position.left,
            transform: isHovered ? 'none' : 'translate(-50%, -50%)',
            transition: 'all 0.15s ease-out' 
        }}
        className={`
            absolute z-20 font-bold py-3 px-8 rounded-full border-2 
            shadow-[0_0_20px_rgba(239,68,68,0.6)]
            ${isWinner ? 'hidden' : 'block'} 
            ${isHovered ? 'bg-orange-600 border-orange-400' : 'bg-red-600 border-red-400'}
            text-white cursor-pointer pointer-events-auto touch-none
        `}
      >
        {btnText}
      </button>

      {/* Modal Menang */}
      {isWinner && (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-6xl mb-4">👑</h2>
          <h2 className="text-4xl font-bold text-green-400 mb-2">GG WP!</h2>
          <p className="text-slate-300 mb-8">Anda resmi menjadi orang paling sabar sedunia.</p>
          <button 
            onClick={resetGame}
            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition"
          >
            Main Lagi
          </button>
        </div>
      )}

    </main>
  );
}
