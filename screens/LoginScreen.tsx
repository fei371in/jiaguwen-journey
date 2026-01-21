import React, { useState } from 'react';
import apiClient from '../api/client';

interface Props {
  onLogin: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setError('');
    setLoading(true);
    console.log("Attempting auth...", { isLogin, email, password });
    try {
      if (isLogin) {
        console.log("Sending login request...");
        const response = await apiClient.post('/auth/login', { email, password });
        console.log("Login success:", response.data);
        localStorage.setItem('token', response.data.access_token);
        onLogin();
      } else {
        console.log("Sending signup request...");
        await apiClient.post('/auth/signup', { email, password });
        console.log("Signup success");
        // Auto login after signup or ask user to login
        setIsLogin(true);
        setError('Signup successful! Please login.');
      }
    } catch (err: any) {
      console.error("Auth failed:", err);
      let errorMessage = 'Authentication failed';

      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          // Handle Pydantic validation errors (array of objects)
          errorMessage = err.response.data.detail.map((e: any) => `${e.loc.join('.')}: ${e.msg}`).join('\n');
        } else if (typeof err.response.data.detail === 'object') {
          errorMessage = JSON.stringify(err.response.data.detail);
        } else {
          // Handle standard HTTP exceptions (string)
          errorMessage = err.response.data.detail;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      alert(`Login Failed:\n${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-between px-8 py-12 bg-[#EFEBE4]">
      {/* Background Texture */}
      <div
        className="absolute inset-0 opacity-40 z-0 pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/old-map.png')" }}
      />

      {/* Watermark Characters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-4 text-6xl opacity-5 font-serif text-[#5D4037] rotate-12">山</div>
        <div className="absolute bottom-12 right-6 w-48 h-48 opacity-10 -rotate-12 flex items-center justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/%E9%BE%8D-oracle.svg/480px-%E9%BE%8D-oracle.svg.png" alt="Oracle Dragon" className="w-full h-full object-contain opacity-80" />
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center mt-12">
        <div className="mb-4 w-24 h-24 text-jiaguwen-brown p-2">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-sm">
            <path d="M10 85 L90 85" />
            <path d="M25 85 L32 50 L40 85" />
            <path d="M45 85 L50 20 L55 85" />
            <path d="M60 85 L68 50 L75 85" />
          </svg>
        </div>
        <h1 className="text-4xl font-serif font-bold text-jiaguwen-brown mb-2 text-center leading-tight">
          Jiaguwen<br />Journey
        </h1>
        <p className="text-jiaguwen-brown text-sm font-medium tracking-wide opacity-80 text-center">
          Uncover the Origins of<br />Chinese Characters
        </p>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-4 mb-8">

        {/* Auth Forms */}
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#D7CCC8] focus:outline-none focus:ring-2 focus:ring-jiaguwen-brown/50"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#D7CCC8] focus:outline-none focus:ring-2 focus:ring-jiaguwen-brown/50"
          />
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        </div>

        {isLogin ? (
          <>
            <button onClick={handleAuth} disabled={loading} className="w-full py-4 rounded-full bg-jiaguwen-brown text-white font-semibold text-lg shadow-soft-lift active:scale-[0.98] transition-transform disabled:opacity-70">
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button onClick={() => setIsLogin(false)} className="w-full py-4 rounded-full bg-[#F5EFE0] text-jiaguwen-brown font-semibold text-lg shadow-soft-lift border border-[#D7CCC8] active:scale-[0.98] transition-transform">
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button onClick={handleAuth} disabled={loading} className="w-full py-4 rounded-full bg-jiaguwen-brown text-white font-semibold text-lg shadow-soft-lift active:scale-[0.98] transition-transform disabled:opacity-70">
              {loading ? 'Signing up...' : 'Confirm Sign Up'}
            </button>
            <button onClick={() => setIsLogin(true)} className="text-jiaguwen-brown text-sm font-medium hover:underline">
              Back to Login
            </button>
          </>
        )}

        <div className="flex items-center justify-between opacity-60 mt-4 mb-2">
          <div className="h-px bg-jiaguwen-brown w-1/4"></div>
          <span className="text-jiaguwen-brown text-xs font-medium">or continue with</span>
          <div className="h-px bg-jiaguwen-brown w-1/4"></div>
        </div>

        <div className="flex gap-4 w-full">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#F5EFE0] border border-[#D7CCC8] shadow-sm">
            <span className="font-bold text-blue-500">G</span> Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#F5EFE0] border border-[#D7CCC8] shadow-sm">
            <i className="fab fa-apple"></i> Apple
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 bg-white/50 px-4 py-1 rounded-full border border-stone-300">
            <span className="text-xs font-bold text-stone-600">EN</span>
            <span className="w-px h-3 bg-stone-300"></span>
            <span className="text-xs font-serif text-stone-600">中</span>
          </div>
          <span className="text-[10px] text-stone-500">Language / 语言</span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;