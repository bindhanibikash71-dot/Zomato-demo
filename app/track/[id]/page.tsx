"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Star, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function TrackOrder({ params }: { params: { id: string } }) {
  const [scratched, setScratched] = useState(false);

  const handleScratch = () => {
    setScratched(true);
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#FFC107', '#FF5722', '#4CAF50'] });
  };

  return (
    <div className="h-screen w-full relative bg-[#E5E3DF] dark:bg-[#1a1a1a] overflow-hidden">
      {/* Premium Map Background Texture */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      
      {/* Animated Route Line */}
      <svg className="absolute inset-0 w-full h-full" pointerEvents="none">
        <path d="M 80,150 C 200,100 250,400 150,600" stroke="#10b981" strokeWidth="6" strokeLinecap="round" fill="transparent" strokeDasharray="1 15" className="animate-[dash_1s_linear_infinite]" />
      </svg>
      
      {/* Header / Back */}
      <div className="absolute top-6 left-6 z-30">
        <Link href="/" className="bg-white/80 dark:bg-black/80 backdrop-blur-md p-3 rounded-full inline-block shadow-lg">
          <ArrowLeft size={20} />
        </Link>
      </div>

      {/* Moving Delivery Partner */}
      <motion.div 
        animate={{ y: [150, 400, 600], x: [80, 220, 150] }} 
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center z-10 border-4 border-green-500 overflow-hidden"
      >
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Delivery" className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full" />
      </motion.div>

      {/* Floating Status Card */}
      <div className="absolute top-24 left-6 right-6 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 border border-white/50 dark:border-white/10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Arriving in 12 min</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">Order #{params.id}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 rounded-xl">
            <MapPin size={24} />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full mb-6 overflow-hidden">
          <motion.div initial={{ width: "20%" }} animate={{ width: "60%" }} transition={{ duration: 2 }} className="h-full bg-green-500 rounded-full" />
        </div>

        {/* Partner Profile */}
        <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100" className="w-12 h-12 rounded-full object-cover shadow-md" />
          <div className="flex-1">
            <h3 className="font-bold text-sm">Rahul Sharma</h3>
            <div className="flex items-center text-xs text-amber-500 font-bold bg-amber-100 dark:bg-amber-900/30 w-max px-2 py-0.5 rounded-md mt-1"><Star size={10} className="mr-1 fill-current" /> 4.9 (2k+ deliveries)</div>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg shadow-green-500/30 transition-all transform active:scale-95"><Phone size={18} /></button>
        </div>
      </div>

      {/* Gamification Scratch Card */}
      <div className="absolute bottom-10 left-6 right-6 z-20">
        <AnimatePresence mode="wait">
          {!scratched ? (
            <motion.div 
              key="unscratched"
              whileTap={{ scale: 0.95 }}
              onClick={handleScratch}
              className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-[2rem] cursor-pointer shadow-[0_10px_40px_rgba(168,85,247,0.4)]"
            >
              <div className="bg-black/20 backdrop-blur-sm rounded-[1.8rem] p-6 text-center text-white">
                <h3 className="font-black text-xl mb-1 flex items-center justify-center gap-2">🎁 Tap to Scratch</h3>
                <p className="text-sm font-medium opacity-90">Unlock your mystery reward!</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="scratched"
              initial={{ rotateY: 90, opacity: 0 }} 
              animate={{ rotateY: 0, opacity: 1 }} 
              transition={{ duration: 0.5, type: "spring" }}
              className="bg-gradient-to-br from-yellow-300 to-yellow-500 p-6 rounded-[2rem] text-center border-4 border-yellow-200 shadow-[0_10px_50px_rgba(234,179,8,0.5)]"
            >
              <p className="text-yellow-900 font-bold text-sm uppercase tracking-widest mb-1">You Won</p>
              <h3 className="font-black text-4xl text-white drop-shadow-md">₹50 OFF</h3>
              <p className="text-yellow-800 text-sm font-medium mt-2">Added to Crave Wallet</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
