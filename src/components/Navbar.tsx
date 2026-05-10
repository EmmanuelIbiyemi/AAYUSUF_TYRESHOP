import { Menu, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/Tooglecontext';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { totalItems, openCart } = useCart();
  // const [dark, setDark] = useState(false);
  const { toggleTheme , dark} = useTheme();
  // useEffect(() => {
  //   if (dark) {
  //     document.documentElement.classList.add("dark");
  //   } 
  //   else{
  //     document.documentElement.classList.remove("dark");
  //   } 
  // }, [dark])

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#111]/90 backdrop-blur-md border-b border-white/5 h-16 dark:bg-white">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors dark:text-black"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#e63946] rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3.5" fill="white"/>
                <path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none tracking-tight dark:text-black">AA Koko</p>
              <p className="text-gray-500 text-xs">Tyre Shop</p>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-12 h-12 rounded-full 
                      bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
          >
            {dark ? (
              <span className="text-yellow-400 text-xl">🌞</span>
            ) : (
              <span className="text-blue-600 text-xl">🌙</span>
            )}
          </button>

          <button
            onClick={openCart}
            className="relative p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors dark:hover:text-black dark:hover:bg-gray-300/10"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e63946] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
