import { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CartDrawer from '../components/CartDrawer';
import FloatingCartButton from '../components/FloatingCartButton';
import TyreCard from '../components/TyreCard';
import { tyres, TyreCategory } from '../data/tyres';

const categories: TyreCategory[] = ['All', 'SUV', 'Sedan', 'Truck', 'Performance', 'All-Season'];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<TyreCategory>('All');
  const [search, setSearch] = useState('');

  const filtered = tyres.filter(t => {
    const matchCategory = activeCategory === 'All' || t.type === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.brand.toLowerCase().includes(q) || t.size.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <CartDrawer />
      <FloatingCartButton />

      <main className="pt-16">
        {/* Hero banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1a0a0b] via-[#1a1a1a] to-[#0f0f0f] border-b border-white/5">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-16">
            <div className="max-w-xl">
              <span className="inline-block bg-[#e63946]/10 text-[#e63946] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#e63946]/20 mb-4">
                Premium Quality
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
                Find the Perfect <span className="text-[#e63946]">Tyre</span> for Your Ride
              </h1>
              <p className="text-gray-400 text-base leading-relaxed">
                Shop from top brands — Michelin, Bridgestone, Goodyear, and more. Fast delivery across Nigeria.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, brand, or size..."
                className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#e63946] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-[#e63946] text-white shadow-lg shadow-[#e63946]/20'
                      : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-white/5 hover:border-white/15'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">
              Showing <span className="text-white font-semibold">{filtered.length}</span> {filtered.length === 1 ? 'tyre' : 'tyres'}
              {activeCategory !== 'All' && <> in <span className="text-[#e63946]">{activeCategory}</span></>}
            </p>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(tyre => (
                <TyreCard key={tyre.id} tyre={tyre} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400 font-medium">No tyres found</p>
              <p className="text-gray-600 text-sm mt-1">Try a different search or category</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
