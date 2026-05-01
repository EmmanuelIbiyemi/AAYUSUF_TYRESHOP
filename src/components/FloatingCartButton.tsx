import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCartButton() {
  const { openCart, totalItems } = useCart();

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#e63946] hover:bg-[#c1121f] text-white font-semibold px-5 py-3 rounded-full shadow-lg shadow-[#e63946]/30 transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="text-sm">Cart</span>
      {totalItems > 0 && (
        <span className="bg-white text-[#e63946] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  );
}
