import { Star, ShoppingCart, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Tyre } from '../data/tyres';
import { useCart } from '../context/CartContext';

interface TyreCardProps {
  tyre: Tyre;
}

export default function TyreCard({ tyre }: TyreCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(tyre);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#e63946]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#e63946]/5 group flex flex-col">
      <div className="relative overflow-hidden h-48 bg-[#111]">
        <img
          src={tyre.image}
          alt={`${tyre.brand} ${tyre.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!tyre.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-[#1a1a1a] text-gray-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-[#e63946] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
            {tyre.type}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-0.5">{tyre.brand}</p>
          <h3 className="text-white font-bold text-base leading-snug">{tyre.name}</h3>
          <p className="text-gray-500 text-xs mt-1 font-mono">{tyre.size}</p>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(tyre.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`}
            />
          ))}
          <span className="text-gray-400 text-xs ml-1">{tyre.rating} ({tyre.reviews})</span>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">{tyre.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-gray-500 text-xs">Price</p>
            <p className="text-white font-bold text-lg">
              &#8358;{tyre.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleAdd}
            disabled={!tyre.inStock}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              added
                ? 'bg-green-600 text-white'
                : tyre.inStock
                ? 'bg-[#e63946] hover:bg-[#c1121f] text-white'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {added ? (
              <><CheckCircle className="w-4 h-4" /> Added</>
            ) : (
              <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
