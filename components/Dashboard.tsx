
import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockBackend';
import { UserProfile } from '../types';

interface DashboardProps {
  token: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ token, onLogout }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSensitive, setShowSensitive] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await mockApi.getProfile(token);
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile.');
        if (err.message === 'Invalid token!') {
          onLogout();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, onLogout]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Decrypting secure session...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md bg-white p-8 rounded-2xl shadow-xl border border-red-100">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-center text-slate-800 mb-2">Access Denied</h3>
        <p className="text-slate-500 text-center mb-6">{error}</p>
        <button 
          onClick={onLogout}
          className="w-full bg-slate-800 text-white py-2 rounded-lg font-bold"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 h-32 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white overflow-hidden">
               <img src={`https://picsum.photos/seed/${profile?.email}/200`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">{profile?.name}</h2>
              <p className="text-slate-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {profile?.email}
              </p>
            </div>
            <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider border border-green-100">
              Verified Account
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Security Credentials</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Government ID (Decrypted)</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow bg-slate-700 px-4 py-2 rounded-lg border border-slate-600 font-mono text-sm text-white overflow-hidden min-h-[40px] flex items-center">
                      {showSensitive ? profile?.government_id : '••••••••••••••••'}
                    </div>
                    <button 
                      onClick={() => setShowSensitive(!showSensitive)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400"
                      title={showSensitive ? "Hide ID" : "Show Decrypted ID"}
                    >
                      {showSensitive ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">System Metadata</h4>
              <dl className="space-y-3">
                <div className="flex justify-between text-sm">
                  <dt className="text-slate-500">Account ID</dt>
                  <dd className="font-semibold text-slate-700">UID-{profile?.id.toString().padStart(6, '0')}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-slate-500">Member Since</dt>
                  <dd className="font-semibold text-slate-700">
                    {profile ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                  </dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-slate-500">Storage Status</dt>
                  <dd className="font-semibold text-indigo-600">AES-256 Protected</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.833 1.233 9.33 3.391 13.235a11.969 11.969 0 0010.454 0c2.158-3.905 3.391-8.402 3.391-13.235z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-500">Security Layer</p>
            <p className="text-sm font-bold text-slate-700">Stateless JWT</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-500">Data Integrity</p>
            <p className="text-sm font-bold text-slate-700">MySQL Encrypted</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-500">API Latency</p>
            <p className="text-sm font-bold text-slate-700">&lt; 150ms</p>
          </div>
        </div>
      </div>
    </div>
  );
};
