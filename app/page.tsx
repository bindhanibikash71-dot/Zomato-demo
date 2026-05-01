"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, Sparkles, MapPin, ChevronRight, Flame } from 'lucide-react';
import { foodData } from '@/lib/data';
import { useStore } from '@/lib/store';

export default function Home() {
  const { mood, setMood, addToCart, points, level } = useStore();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreeting('Good Morning');
    else if (hour < 16) setGreeting('Lunch Time');
    else if (hour < 22) setGreeting('Dinner Time');
    else setGreeting('Midnight Cravings');
  }, []);

  const filteredFood = mood === 'neutral' ? foodData : foodData.filter(f => f.mood === mood);

  return (
    <div className="p-6 h-screen overflow-y-auto pb-32 scrollbar-hide">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 p-[2px]">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full bg-white dark:bg-black rounded-full object-cover" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
              <MapPin size={12} className="text-red-500" /> Silicon Valley <ChevronRight size={12} />
            </p>
            <h1 className="text-xl font-extrabold tracking-tight">{greeting}!</h1>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
          <p className="text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            {level} • {points}pt
          </p>
        </div>
      </div>

      {/* Search Bar (Sleek) */}
      <div className="relative mb-8 group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400 group-focus-within:text-red-500 transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Search for biryani, pizza..." 
          className="w-full bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 text-gray-900 dark:text-white rounded-3xl py-4 pl-12 pr-14 shadow-[0_2px_10px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-sm"
        />
        <button className="absolute inset-y-2 right-2 bg-red-500 w-10 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]">
          <Mic size={18} />
        </button>
      </div>

      {/* AI Smart Suggestion Banner (Neon Glow) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="relative overflow-hidden rounded-3xl p-6 mb-8 bg-black dark:bg-[#1a1a1a] shadow-[0_10px_40px_rgba(0,0,0,0.15)] group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-3xl rounded-full" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Sparkles size={14} /> AI Suggested for you
            </p>
            <h2 className="text-white text-2xl font-bold leading-tight mb-2">Craving<br/>Something Spicy?</h2>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
              Order Biryani Now
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500" className="w-24 h-24 object-cover rounded-full border-4 border-white/10 shadow-2xl group-hover:rotate-12 transition-transform duration-500" />
        </div>
      </motion.div>

      {/* Mood Selector (Glass Pills) */}
      <div className="flex items-center gap-2 mb-6">
        <Flame size={18} className="text-orange-500" />
        <h3 className="font-extrabold text-lg tracking-tight">What's your mood?</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
        {['Happy', 'Sad', 'Gym', 'Party'].map(m => (
          <button 
            key={m} 
            onClick={() => setMood(m.toLowerCase())}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${mood === m.toLowerCase() ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-lg scale-105' : 'bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Premium Food Grid */}
      <div className="grid grid-cols-2 gap-5 mt-6">
        <AnimatePresence>
          {filteredFood.map((item, idx) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.1 }}
              key={item.id} 
              className="group relative bg-white dark:bg-[#121212] rounded-[2rem] p-3 border border-gray-100 dark:border-white/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
            >
              <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-3">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="px-1 pb-1">
                <h4 className="font-bold text-sm leading-tight line-clamp-1 mb-2">{item.name}</h4>
                <div className="flex justify-between items-end">
                  <span className="font-black text-lg tracking-tight">₹{item.price}</span>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(item)} 
                    className="bg-black dark:bg-white text-white dark:text-black w-8 h-8 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    +
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
