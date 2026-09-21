"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Lock, Shield, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function OperatorLoginPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Check if already authenticated
    fetch("/api/admin/auth/me")
      .then((res) => {
        if (res.ok) router.replace("/dashboard/leads");
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the operator secret key.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Invalid operator credentials. Access denied.");
        setLoading(false);
        return;
      }

      router.push("/dashboard/leads");
    } catch {
      setError("Unable to authenticate. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060B18] px-4 py-12 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* ASSO Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>ASSO Internal System</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Operator Portal
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Restaurant Lead Management &amp; Follow-up Pipeline
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel-dark rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative">
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Operator Authentication</h2>
              <p className="text-xs text-slate-400">Restricted to authorized ASSO team</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="operator-key"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Operator Secret Key
              </label>
              <div className="relative">
                <input
                  id="operator-key"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter operator key"
                  autoFocus
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide secret" : "Show secret"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <span className="text-[11px] text-slate-500">
              Asso Restaurant Technology • Security Policy v1.4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
