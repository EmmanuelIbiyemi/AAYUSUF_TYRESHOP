import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, isOpen, closeCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-[#111] border-l border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#e63946]" />
            <h2 className="text-white font-bold text-lg">Your Cart</h2>
            {items.length > 0 && (
              <span className="bg-[#e63946] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <p className="text-gray-600 text-sm mt-1">Add some tyres to get started</p>
              <button
                onClick={closeCart}
                className="mt-6 px-5 py-2.5 bg-[#e63946] text-white text-sm font-semibold rounded-xl hover:bg-[#c1121f] transition-colors"
              >
                Browse Tyres
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="bg-[#1a1a1a] rounded-xl p-3 flex gap-3 border border-white/5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="text-gray-400 text-xs">{item.brand}</p>
                      <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-gray-500 text-xs font-mono">{item.size}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[#e63946] font-bold text-sm">
                      &#8358;{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5 bg-[#252525] rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white text-sm font-bold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-4 py-4 border-t border-white/5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Subtotal</span>
              <span className="text-white font-bold text-lg">&#8358;{subtotal.toLocaleString()}</span>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-[#e63946] hover:bg-[#c1121f] text-white font-semibold py-3 rounded-xl transition-colors">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={closeCart}
              className="w-full text-gray-400 hover:text-white text-sm font-medium py-2 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
