
import React, { useState, useMemo } from 'react';
import { mockApi } from '../services/mockBackend';

interface LoginProps {
  onSuccess: (token: string) => void;
  onNavigateToRegister: () => void;
}

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
  </svg>
);

export const Login: React.FC<LoginProps> = ({ onSuccess, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await mockApi.login(email, password);
      onSuccess(response.token);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-lg bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-400";

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
      <p className="text-slate-500 mb-8">Access your secure identity dashboard.</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              placeholder="••••••••"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-200 transition-all disabled:opacity-70 flex items-center justify-center"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-500 text-sm">
          Don't have an account? {' '}
          <button 
            onClick={onNavigateToRegister}
            className="text-indigo-600 font-bold hover:underline"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
};

interface RegisterProps {
  onSuccess: () => void;
  onNavigateToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onSuccess, onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    government_id: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const passwordRequirements = useMemo(() => {
    const pass = formData.password;
    return [
      { label: 'At least 8 characters', met: pass.length >= 8 },
      { label: 'Contains a number', met: /[0-9]/.test(pass) },
      { label: 'Contains uppercase letter', met: /[A-Z]/.test(pass) },
      { label: 'Contains special character (!@#$%^&*)', met: /[!@#$%^&*(),.?":{}|<>]/.test(pass) },
    ];
  }, [formData.password]);

  const isPasswordStrong = passwordRequirements.every(req => req.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordStrong) {
      setError('Please fulfill all password requirements.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await mockApi.register(formData.name, formData.email, formData.password, formData.government_id);
      onSuccess();
      alert('Registration successful! Please login.');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses = "w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400";

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Identity</h2>
      <p className="text-slate-500 mb-8">Securely store your sensitive data.</p>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Government ID</label>
          <input 
            type="text" 
            name="government_id"
            value={formData.government_id}
            onChange={handleChange}
            className={inputClasses}
            placeholder="ID-000-000"
            required
          />
          <p className="mt-1 text-[10px] text-slate-400 font-medium">Encrypted using AES-256 before storage.</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          
          <div className="mt-3 space-y-1">
            {passwordRequirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${req.met ? 'bg-green-500' : 'bg-slate-300'}`} />
                <span className={`text-[11px] ${req.met ? 'text-green-600 font-medium' : 'text-slate-400'}`}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button 
          type="submit" 
          disabled={loading || !isPasswordStrong}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm">
        <button onClick={onNavigateToLogin} className="text-indigo-600 font-bold hover:underline">
          Back to Login
        </button>
      </div>
    </div>
  );
};
