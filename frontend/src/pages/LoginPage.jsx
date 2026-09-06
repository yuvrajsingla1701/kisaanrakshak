import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Phone, Lock, ArrowRight, UserCheck, Sprout } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const LoginPage = () => {
  const { loginDemo } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('9823045612');
  const [password, setPassword] = useState('farmer2026');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend mock login: directly activate session and navigate
    loginDemo();
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    loginDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top Brand Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-agri-800 text-white flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck className="w-6 h-6 text-agri-300" />
          </div>
          <span className="font-extrabold text-xl text-gray-900">{t.brandName}</span>
        </Link>
        <p className="text-xs text-gray-500 mt-1 font-medium">
          Smart India Hackathon 2026 • Problem SIH26131
        </p>
      </div>

      {/* Main Login Card / Split container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl px-4 sm:px-0">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Agricultural Visual Showcase (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 bg-[#153a1f] text-white p-8 flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-agri-200 border border-white/10">
                <Sprout className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold leading-tight">
                Empowering Indian Farmers with Early Pest Defense
              </h2>
              <p className="text-xs text-agri-200/90 leading-relaxed">
                Log in to inspect your farm plots, receive geo-clustered district alerts, and access certified Integrated Pest Management protocols.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 relative z-10 text-xs text-agri-100">
              <p className="font-semibold text-white">SIH Hackathon Prototype</p>
              <p className="text-[11px] text-agri-300 mt-0.5">
                Click "Continue as Demo User" for immediate dashboard evaluation.
              </p>
            </div>
          </div>

          {/* Right: Login Form Card */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">Farmer Login</h3>
              <p className="text-xs text-gray-500 mt-1">
                Enter your mobile number or email to access your crop records.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mobile / Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mobile Number / Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 98230 45612 or farmer@example.in"
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-agri-600 focus:border-agri-600 bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-agri-600 focus:border-agri-600 bg-white"
                  />
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-agri-700 focus:ring-agri-500 w-4 h-4"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="font-medium text-agri-700 hover:text-agri-800">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="md"
                className="w-full bg-agri-800 hover:bg-agri-900 text-white font-semibold py-2.5 mt-2"
              >
                Login
              </Button>
            </form>

            {/* Quick Demo Access Button */}
            <div className="mt-5 pt-5 border-t border-gray-200 text-center">
              <Button
                type="button"
                variant="secondary"
                size="md"
                icon={UserCheck}
                onClick={handleDemoLogin}
                className="w-full font-bold text-agri-900 bg-agri-100/80 hover:bg-agri-200/90 border border-agri-200"
              >
                Continue as Demo User (Farmer Ramesh)
              </Button>

              <p className="text-xs text-gray-500 mt-4">
                Don't have an account?{' '}
                <button
                  onClick={handleDemoLogin}
                  className="font-bold text-agri-700 hover:text-agri-800"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
