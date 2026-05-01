"use client";
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const { cart, removeFromCart, clearCart, addOrder } = useStore();
  const [tip, setTip] = useState(0);
  const [paying, setPaying] = useState(false);
  const router = useRouter();

  const subtotal = cart.reduce((acc, item: any) => acc + item.price, 0);
  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal + delivery + tip;

  const handlePayment = () => {
    setPaying(true);
    setTimeout(() => {
      const orderId = Math.random().toString(36).substring(7).toUpperCase();
      addOrder({ id: orderId, items: cart, total, date: new Date() });
      clearCart();
      router.push(`/track/${orderId}`);
    }, 2500);
  };

  if (cart.length === 0) return (
    <div className="flex flex-col items-center justify-center h-screen px-6">
      <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" className="w-40 h-40 opacity-50 mb-6 grayscale" />
      <h2 className="text-2xl font-bold">Your cart is empty</h2>
      <p className="text-gray-500 text-center mt-2 text-sm">Looks like you haven't added anything yet. Let's explore some delicious food.</p>
      <button onClick={() => router.push('/')} className="mt-8 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold w-full">Browse Menu</button>
    </div>
  );

  return (
    <div className="p-6 flex flex-col h-screen overflow-hidden">
      <h1 className="text-3xl font-black mb-8 tracking-tight">Checkout</h1>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-40 space-y-6">
        {/* Cart Items List */}
        <div className="bg-white dark:bg-[#121212] rounded-[2rem] p-2 border border-gray-100 dark:border-white/5 shadow-sm">
          {cart.map((item: any, i: number) => (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={i} className="flex justify-between items-center p-4 border-b border-gray-50 dark:border-white/5 last:border-0">
              <div className="flex items-center gap-4">
                <img src={item.img} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs font-semibold mt-1">₹{item.price}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(i)} className="text-gray-400 hover:text-red-500 bg-gray-50 dark:bg-white/5 w-8 h-8 rounded-full flex items-center justify-center text-xl transition-colors">×</button>
            </motion.div>
          ))}
        </div>

        {/* AI Smart Upsell */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-500/20">
          <Zap className="absolute -right-4 -top-4 w-24 h-24 text-white opacity-10" />
          <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-1">Frequently Bought Together</p>
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-lg font-bold">Chilled Coca-Cola</h3>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-xs font-black shadow-lg">+ ₹40</button>
          </div>
        </div>

        {/* Tips Box */}
        <div>
          <h3 className="font-bold text-sm mb-3 ml-2 text-gray-500 uppercase tracking-wider">Show Some Love</h3>
          <div className="flex gap-3">
            {[20, 30, 50].map(t => (
              <button key={t} onClick={() => setTip(t)} className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all border ${tip === t ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/30 scale-105' : 'bg-white dark:bg-[#121212] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300'}`}>
                ₹{t}
              </button>
            ))}
          </div>
        </div>

        {/* Receipt */}
        <div className="bg-white dark:bg-[#121212] rounded-[2rem] p-6 border border-gray-100 dark:border-white/5 shadow-sm">
          <div className="space-y-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            <div className="flex justify-between"><p>Item Total</p><p>₹{subtotal}</p></div>
            <div className="flex justify-between"><p>Delivery Partner Fee</p><p className={delivery === 0 ? "text-green-500" : ""}>{delivery === 0 ? "FREE" : `₹${delivery}`}</p></div>
            {tip > 0 && <div className="flex justify-between text-green-500"><p>Tip</p><p>₹{tip}</p></div>}
          </div>
          <div className="border-t border-dashed border-gray-200 dark:border-gray-800 my-4" />
          <div className="flex justify-between font-black text-xl text-black dark:text-white"><p>Grand Total</p><p>₹{total}</p></div>
        </div>
      </div>

      {/* Floating Action Payment Button */}
      <div className="absolute bottom-6 left-0 right-0 px-6 z-50">
        <button onClick={handlePayment} disabled={paying} className="w-full relative overflow-hidden group bg-black dark:bg-white text-white dark:text-black py-5 rounded-[2rem] font-bold text-lg shadow-[0_10px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_rgba(255,255,255,0.2)] transition-all transform active:scale-95">
          <div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-[2rem]" />
          <span className="relative flex justify-center items-center gap-2">
            {paying ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} className="h-6 w-6 border-4 border-white/20 border-t-white dark:border-black/20 dark:border-t-black rounded-full" /> : `Slide to Pay ₹${total}`}
          </span>
        </button>
      </div>

      {/* Full Screen Success Overlay */}
      <AnimatePresence>
        {paying && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-white/80 dark:bg-black/80 z-[100] flex flex-col items-center justify-center backdrop-blur-xl">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
              <div className="bg-green-500 rounded-full p-4 mb-6 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                <CheckCircle2 size={60} className="text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-black mb-2">Payment Done</h2>
            <p className="text-gray-500 font-medium animate-pulse">Connecting to restaurant...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
