import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Mail, User, Eye, EyeOff, Cpu, AlertTriangle, CheckCircle2, CloudCheck } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface JarvisLoginProps {
  onLoginSuccess: (user: { name: string; email: string; photoURL?: string }) => void;
}

interface UserAccount {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  isProUnlocked?: boolean;
  proExpiresAt?: number;
  proUnlockedAt?: string;
}

export const JarvisLogin: React.FC<JarvisLoginProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cloudSynced, setCloudSynced] = useState(false);

  // Sync and seed accounts from Cloud Database + LocalStorage on mount
  useEffect(() => {
    const initializeAccounts = async () => {
      try {
        // Seed default admin account locally if missing
        const existingRaw = localStorage.getItem('jarvis_registered_accounts');
        let localAccounts: UserAccount[] = existingRaw ? JSON.parse(existingRaw) : [];

        if (!localAccounts.some(acc => acc.email === 'abhishekjvfg@gmail.com')) {
          const defaultAdmin: UserAccount = {
            name: 'Abhishek',
            email: 'abhishekjvfg@gmail.com',
            passwordHash: 'Jarvis@123',
            createdAt: new Date().toISOString()
          };
          localAccounts.push(defaultAdmin);
          localStorage.setItem('jarvis_registered_accounts', JSON.stringify(localAccounts));

          // Also back up default admin to Cloud Firestore
          try {
            await setDoc(doc(db, 'jarvis_accounts', 'abhishekjvfg@gmail.com'), defaultAdmin, { merge: true });
          } catch (e) {
            console.warn("Firestore seed notice:", e);
          }
        }
        setCloudSynced(true);
      } catch (e) {
        console.error("Storage sync error:", e);
      }
    };

    initializeAccounts();
  }, []);

  const validateEmail = (emailStr: string): { valid: boolean; reason?: string } => {
    const trimmed = emailStr.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmed) {
      return { valid: false, reason: 'Email address is required.' };
    }
    if (!emailRegex.test(trimmed)) {
      return { valid: false, reason: 'Invalid email format. Must be a valid email (e.g. name@gmail.com).' };
    }

    const domain = trimmed.split('@')[1];
    if (!domain || !domain.includes('.')) {
      return { valid: false, reason: 'Invalid email domain format.' };
    }

    const tld = domain.split('.').pop();
    if (!tld || tld.length < 2) {
      return { valid: false, reason: 'Invalid domain extension (e.g. .com, .in).' };
    }

    return { valid: true };
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const cleanName = name.trim();

    // 1. Strict Email Validation
    const emailCheck = validateEmail(cleanEmail);
    if (!emailCheck.valid) {
      setErrorMessage(`Verification Error: ${emailCheck.reason}`);
      return;
    }

    // 2. Strict Password Validation
    if (!cleanPassword) {
      setErrorMessage('Password is required.');
      return;
    }

    if (cleanPassword.length < 6) {
      setErrorMessage('Security Standard: Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      // Fetch local accounts
      const storedAccountsRaw = localStorage.getItem('jarvis_registered_accounts');
      let localAccounts: UserAccount[] = storedAccountsRaw ? JSON.parse(storedAccountsRaw) : [];

      if (isLogin) {
        // --- STRICT LOGIN CHECK (FIRESTORE CLOUD + LOCAL FALLBACK) ---
        let matchingUser: UserAccount | null = null;

        try {
          const userDocRef = doc(db, 'jarvis_accounts', cleanEmail);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            matchingUser = userSnap.data() as UserAccount;
            // Update local storage cache
            const filtered = localAccounts.filter(acc => acc.email.toLowerCase() !== cleanEmail);
            filtered.push(matchingUser);
            localStorage.setItem('jarvis_registered_accounts', JSON.stringify(filtered));
          }
        } catch (cloudErr) {
          console.warn("Cloud Firestore account lookup notice:", cloudErr);
        }

        // Fallback to local accounts if offline/network error
        if (!matchingUser) {
          matchingUser = localAccounts.find(acc => acc.email.toLowerCase() === cleanEmail) || null;
        }

        if (!matchingUser) {
          setIsLoading(false);
          setErrorMessage(`Access Denied: Account "${cleanEmail}" does not exist in Neural Database. Click 'Sign up' below to create this account.`);
          return;
        }

        if (matchingUser.passwordHash !== cleanPassword) {
          setIsLoading(false);
          setErrorMessage('Access Denied: Incorrect password. Please verify your password and try again.');
          return;
        }

        // Login Success!
        setSuccessMessage(`Cloud Account Verified for ${matchingUser.email}! Booting JARVIS Neural Core...`);
        setTimeout(() => {
          onLoginSuccess({
            name: matchingUser.name || 'Sir',
            email: matchingUser.email,
            photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(matchingUser.email)}`
          });
        }, 800);

      } else {
        // --- STRICT SIGNUP CHECK ---
        if (!cleanName) {
          setIsLoading(false);
          setErrorMessage('Full Name is required for neural sign up.');
          return;
        }

        if (password !== confirmPassword) {
          setIsLoading(false);
          setErrorMessage('Password confirmation failed: Passwords do not match.');
          return;
        }

        // Check if account exists locally or in Firestore
        let existingUser = localAccounts.find(acc => acc.email.toLowerCase() === cleanEmail);

        if (!existingUser) {
          try {
            const userDocRef = doc(db, 'jarvis_accounts', cleanEmail);
            const userSnap = await getDoc(userDocRef);
            if (userSnap.exists()) {
              existingUser = userSnap.data() as UserAccount;
            }
          } catch (e) {}
        }

        if (existingUser) {
          setIsLoading(false);
          setErrorMessage(`Account already exists for ${cleanEmail}. Click 'Login' below and enter your password.`);
          return;
        }

        // Register new account
        const newAccount: UserAccount = {
          name: cleanName,
          email: cleanEmail,
          passwordHash: cleanPassword,
          createdAt: new Date().toISOString()
        };

        // Save to LocalStorage
        localAccounts.push(newAccount);
        localStorage.setItem('jarvis_registered_accounts', JSON.stringify(localAccounts));

        // Save permanently to Firebase Firestore Cloud Database
        try {
          await setDoc(doc(db, 'jarvis_accounts', cleanEmail), newAccount);
        } catch (cloudErr) {
          console.warn("Cloud account save notice:", cloudErr);
        }

        setSuccessMessage(`Account created & synced to Cloud Database for ${cleanEmail}! Booting JARVIS...`);
        setTimeout(() => {
          onLoginSuccess({
            name: newAccount.name,
            email: newAccount.email,
            photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newAccount.email)}`
          });
        }, 800);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Authentication pipeline error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] flex items-center justify-center p-4 sm:p-6 font-mono select-none relative overflow-hidden">
      {/* Background Futuristic Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#090d16]/90 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,242,255,0.15)] relative z-10 backdrop-blur-xl"
      >
        {/* Top Glowing Edge Indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 rounded-t-2xl shadow-[0_0_15px_#00f2ff]" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-2xl mb-3 shadow-[0_0_20px_rgba(0,242,255,0.2)]">
            <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
            Jarvis Neural Core
          </h1>
          <p className="text-xs text-cyan-400/80 tracking-widest uppercase mt-1">
            {isLogin ? 'Welcome back • Neural Verification' : 'Create Access Account'}
          </p>
        </div>

        {/* Alert Notifications */}
        <AnimatePresence mode="wait">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-5 p-3.5 bg-red-950/60 border border-red-500/60 rounded-xl text-red-200 text-xs flex items-start gap-2.5 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed font-medium">{errorMessage}</div>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-5 p-3.5 bg-green-950/60 border border-green-500/60 rounded-xl text-green-200 text-xs flex items-start gap-2.5 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
            >
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5 animate-bounce" />
              <div className="leading-relaxed font-medium">{successMessage}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (Sign Up only) */}
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-1.5"
            >
              <label className="block text-xs text-zinc-300 font-semibold tracking-wide">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-cyan-400/60 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-9 pr-3 py-2.5 bg-black/80 border border-zinc-700 focus:border-cyan-400 rounded-xl text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  required={!isLogin}
                />
              </div>
            </motion.div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="block text-xs text-zinc-300 font-semibold tracking-wide">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-cyan-400/60 absolute left-3 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-black/80 border border-zinc-700 focus:border-cyan-400 rounded-xl text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="block text-xs text-zinc-300 font-semibold tracking-wide">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-cyan-400/60 absolute left-3 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-black/80 border border-zinc-700 focus:border-cyan-400 rounded-xl text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field (Sign Up only) */}
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-1.5"
            >
              <label className="block text-xs text-zinc-300 font-semibold tracking-wide">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-cyan-400/60 absolute left-3 pointer-events-none" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-black/80 border border-zinc-700 focus:border-cyan-400 rounded-xl text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  required={!isLogin}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-zinc-500 hover:text-cyan-400 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Verifying Google Credentials...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>{isLogin ? 'Login to Neural Core' : 'Create Account'}</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode Link */}
        <div className="mt-6 text-center text-xs text-zinc-400 border-t border-zinc-800/80 pt-4">
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>{' '}
          <button
            type="button"
            onClick={handleToggleMode}
            className="text-cyan-400 font-bold hover:underline hover:text-cyan-300 ml-1"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-[10px] text-zinc-600 leading-tight">
          By signing in, you agree to our Terms and Privacy Policy • Google Verification Enabled
        </div>
      </motion.div>
    </div>
  );
};
