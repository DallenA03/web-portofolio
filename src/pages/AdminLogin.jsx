import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AdminLogin = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError('Invalid credentials. Please check your email and password.');
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] font-mono flex items-center justify-center px-4 relative overflow-hidden selection:bg-yellow-300">
      {/* Dot Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
        }}
      />

      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md z-10"
      >
        {/* Header box */}
        <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] flex items-center gap-4 mb-0">
          <div className="p-2 bg-yellow-300 border-2 border-white">
            <Lock size={24} className="text-black" strokeWidth={3}/>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-widest">ADMIN PANEL</h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Francesco Dallen — Portfolio</p>
          </div>
        </div>

        {/* Form box */}
        <form onSubmit={handleSubmit} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] p-8 flex flex-col gap-6">
          {error && (
            <div className="bg-red-100 border-2 border-red-500 px-4 py-3 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Mail size={14} strokeWidth={3} /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="border-2 border-black px-4 py-3 font-bold text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:border-blue-600 transition-all bg-[#F0F0F0]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Lock size={14} strokeWidth={3} /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border-2 border-black px-4 py-3 pr-12 font-bold text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:border-blue-600 transition-all bg-[#F0F0F0]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-yellow-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 font-black text-sm tracking-widest uppercase border-2 border-black hover:bg-blue-600 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN →'}
          </button>

          <a href="/" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors justify-center">
            <ArrowLeft size={14} /> Back to Portfolio
          </a>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
