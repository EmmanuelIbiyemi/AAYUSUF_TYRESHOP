import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col dark:bg-white">
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#111]/90 backdrop-blur-md border-b border-white/5 h-16 flex items-center px-4 gap-3 dark:bg-white">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors dark:hover:text-black">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-white font-bold text-base dark:text-black">{title}</h1>
      </div>
      <div className="flex-1 flex items-center justify-center flex-col gap-3 pt-16 px-4">
        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center dark:bg-white">
          <span className="text-3xl">🚧</span>
        </div>
        <h2 className="text-white font-bold text-xl dark:text-black">{title}</h2>
        <p className="text-gray-400 text-sm text-center max-w-xs">{description}</p>
      </div>
    </div>
  );
}
