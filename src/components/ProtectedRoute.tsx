import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // const { user, loading } = useAuth();
  const loading = false

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#e63946] animate-spin" />
      </div>
    );
  }

  // if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
