import React, { useState } from 'react';
import { Loader2, Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';


interface LoginProps {
    onBack?: () => void; // Prop opsional untuk kembali ke home
}

export default function Login({ onBack }: LoginProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulasi loading login
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 font-sans text-stone-800 relative">

            {/* Tombol Kembali (Jika prop onBack tersedia) */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute top-8 left-8 flex items-center text-stone-600 hover:text-[#7b1f2a] transition-colors z-10 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Kembali ke Beranda</span>
                </button>
            )}

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 animate-in fade-in zoom-in duration-300">

                {/* Header Section */}
                <div className="px-8 pt-10 pb-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-[#7b1f2a] mb-4">
                        <span className="font-serif font-bold text-xl">K</span>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Selamat Datang Kembali</h2>
                    <p className="text-stone-500 text-sm leading-relaxed">
                        Masuk ke akun Anda untuk melanjutkan belanja karya daur ulang terbaik.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-5">

                    {/* Input Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-stone-700 block">
                            Alamat Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            placeholder="nama@email.com"
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7b1f2a] focus:border-transparent transition-all placeholder:text-stone-400 text-sm"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {/* Input Password */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-sm font-medium text-stone-700 block">
                                Kata Sandi
                            </label>
                            <a href="#" className="text-xs font-medium text-[#7b1f2a] hover:underline">
                                Lupa kata sandi?
                            </a>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7b1f2a] focus:border-transparent transition-all pr-10 text-sm"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100 transition"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Checkbox Remember Me */}
                    <div className="flex items-center space-x-2">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-stone-300 checked:bg-[#7b1f2a] checked:border-[#7b1f2a] transition-all"
                                checked={formData.remember}
                                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                            />
                            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={12} strokeWidth={3} />
                        </div>
                        <label htmlFor="remember" className="text-sm text-stone-600 cursor-pointer select-none">
                            Ingat saya
                        </label>
                    </div>

                    {/* Tombol Login */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#7b1f2a] hover:bg-[#5e1620] text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Masuk Sekarang"}
                    </button>

                    {/* Link Daftar */}
                    <div className="text-center text-sm text-stone-500 pt-2">
                        Belum punya akun?{' '}
                        <a href="/register" className="font-bold text-[#7b1f2a] hover:underline">
                            Daftar Gratis
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}