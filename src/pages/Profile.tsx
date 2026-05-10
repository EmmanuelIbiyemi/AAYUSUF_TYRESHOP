import { useState, FormEvent } from 'react';
import { ArrowLeft, Camera, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [phone, setPhone] = useState(user?.user_metadata?.phone || '');
  const [address, setAddress] = useState(user?.user_metadata?.address || '');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState('');

  const displayName = fullName || user?.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaveLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone, address },
    });
    setSaveLoading(false);
    if (error) {
      setSaveError(error.message);
    } else {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPwError('');
    if (newPassword !== confirmNewPassword) {
      setPwError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPwError('Password must be at least 6 characters.');
      return;
    }
    setPwLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwLoading(false);
    if (error) {
      setPwError(error.message);
    } else {
      setPwSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setPwSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] dark:bg-white">
      {/* Top bar */}
      <div className="dark:bg-white fixed top-0 left-0 right-0 z-40 bg-[#111]/90 backdrop-blur-md border-b border-white/5 h-16 flex items-center px-4 gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg text-gray-400 hover:text-white dark:hover:text-black hover:bg-white/5 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-white font-bold text-base dark:text-black">My Profile</h1>
      </div>

      <div className="pt-16 max-w-2xl mx-auto px-4 py-8 space-y-6 dark:bg-white">
        {/* Avatar */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 flex items-center gap-5 dark:bg-gray-400">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#e63946] flex items-center justify-center text-white font-bold text-2xl">
              {initials}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#252525] border-2 border-[#1a1a1a] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <p className="text-white font-bold text-lg dark:text-black">{displayName}</p>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <p className="text-gray-600 text-xs mt-1">Member since {new Date(user?.created_at || Date.now()).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Profile form */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 dark:bg-gray-400">
          <h2 className="text-white font-bold text-base mb-5 dark:text-black">Personal Information</h2>

          {saveError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
              {saveError}
            </div>
          )}
          {saveSuccess && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-[#252525] border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e63946] transition-colors dark:bg-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-[#1f1f1f] border border-white/5 text-gray-500 rounded-xl px-4 py-3 text-sm cursor-not-allowed dark:bg-gray-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full bg-[#252525] border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e63946] transition-colors dark:bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Delivery Address</label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter your address..."
                rows={3}
                className="w-full bg-[#252525] border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e63946] transition-colors resize-none dark:bg-gray-200"
              />
            </div>
            <button
              type="submit"
              disabled={saveLoading}
              className="flex items-center gap-2 bg-[#e63946] hover:bg-[#c1121f] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
            >
              {saveLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </form>
        </div>

        {/* Change password */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 dark:bg-gray-400">
          <h2 className="text-white font-bold text-base mb-5 dark:text-black">Change Password</h2>

          {pwError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
              {pwError}
            </div>
          )}
          {pwSuccess && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Password changed successfully!
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPw ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#252525] border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#e63946] transition-colors dark:bg-gray-200"
                />
                <button type="button" onClick={() => setShowCurrentPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showNewPw ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full bg-[#252525] border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#e63946] transition-colors dark:bg-gray-200"
                />
                <button type="button" onClick={() => setShowNewPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPw ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-[#252525] border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#e63946] transition-colors dark:bg-gray-200"
                />
                <button type="button" onClick={() => setShowConfirmPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={pwLoading}
              className="flex items-center gap-2 bg-[#252525] hover:bg-[#2f2f2f] border border-white/10 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
            >
              {pwLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
