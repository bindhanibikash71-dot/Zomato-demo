import './globals.css';
import { Home, PlaySquare, ShoppingBag, Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${jakarta.className} bg-gray-100 dark:bg-[#050505] text-gray-900 dark:text-white antialiased selection:bg-red-500 selection:text-white`}>
        <main className="max-w-md mx-auto min-h-screen bg-white/50 dark:bg-[#0a0a0a] shadow-2xl relative overflow-hidden ring-1 ring-gray-200 dark:ring-white/5">
          {children}
          
          {/* PREMIUM FLOATING GLASS NAVIGATION */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] z-50">
            <nav className="bg-white/70 dark:bg-[#121212]/80 backdrop-blur-3xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full flex justify-around items-center py-3 px-6">
              <Link href="/" className="group flex flex-col items-center transition-all duration-300">
                <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-500/10 transition-colors">
                  <Home size={22} className="text-gray-500 group-hover:text-red-500" />
                </div>
              </Link>
              <Link href="/reels" className="group flex flex-col items-center transition-all duration-300">
                <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-500/10 transition-colors">
                  <PlaySquare size={22} className="text-gray-500 group-hover:text-red-500" />
                </div>
              </Link>
              <Link href="/cart" className="group flex flex-col items-center transition-all duration-300 relative">
                <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-500/10 transition-colors">
                  <ShoppingBag size={22} className="text-gray-500 group-hover:text-red-500" />
                  {/* Notification Dot */}
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
              </Link>
              <Link href="/admin-secret" className="group flex flex-col items-center transition-all duration-300">
                <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-500/10 transition-colors">
                  <Fingerprint size={22} className="text-gray-500 group-hover:text-red-500" />
                </div>
              </Link>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
