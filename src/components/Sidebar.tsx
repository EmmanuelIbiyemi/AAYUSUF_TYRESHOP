import { X, Home, ShoppingCart, Package, Settings, LogOut, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, signOut } = useAuth();
  const { openCart, totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Package, label: 'My Orders', path: '/orders' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#111] border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} dark:bg-white`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#e63946] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3.5" fill="white"/>
                <path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none dark:text-black">AA Koko</p>
              <p className="text-gray-500 text-xs dark:text-gray-600">Tyre Shop</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User info */}
        <div className="px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e63946] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate dark:text-black">{displayName}</p>
              <p className="text-gray-500 text-xs truncate dark:text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                location.pathname === path
                  ? 'bg-[#e63946] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 dark:hover:text-black'
              }`}
            >
              <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
              {label}
            </Link>
          ))}

          <button
            onClick={() => { onClose(); openCart(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white dark:hover:text-black hover:bg-white/5 transition-colors text-sm font-medium"
          >
            <ShoppingCart className="w-[18px] h-[18px]" />
            Cart
            {totalItems > 0 && (
              <span className="ml-auto bg-[#e63946] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 pt-2 border-t border-white/5">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm font-medium"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
