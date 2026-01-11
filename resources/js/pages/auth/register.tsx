import React, { useState } from 'react';
import { Loader2, Eye, EyeOff, ArrowLeft, User, Mail, Lock, CheckCircle } from 'lucide-react';

interface RegisterProps {
    onBack?: () => void; // Kembali ke Home
    onLogin?: () => void; // Pindah ke halaman Login
}

export default function Register({ onBack, onLogin }: RegisterProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // State untuk notifikasi sukses
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulasi proses register (2 detik)
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true); // Tampilkan pesan sukses

            // Otomatis pindah ke login setelah 1.5 detik menampilkan pesan sukses
            setTimeout(() => {
                if (onLogin) onLogin();
            }, 1500);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 font-sans text-stone-800">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 text-center animate-in fade-in zoom-in duration-300 border border-stone-100">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Akun Berhasil Dibuat!</h2>
                    <p className="text-stone-500 mb-6">Selamat datang di komunitas Karindra. Mengalihkan ke halaman login...</p>
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#7b1f2a]" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 font-sans text-stone-800 relative">

            {/* Tombol Kembali */}
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
                    <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Buat Akun Baru</h2>
                    <p className="text-stone-500 text-sm leading-relaxed">
                        Bergabunglah dengan komunitas Karindra dan dukung gerakan sustainable fashion.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-4">

                    {/* Input Nama Lengkap */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                            Nama Lengkap
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                placeholder="Nama Anda"
                                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7b1f2a] focus:border-transparent transition-all text-sm"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        </div>
                    </div>

                    {/* Input Email */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                            Alamat Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                placeholder="nama@email.com"
                                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7b1f2a] focus:border-transparent transition-all text-sm"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        </div>
                    </div>

                    {/* Input Password */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                            Kata Sandi
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Minimal 8 karakter"
                                className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7b1f2a] focus:border-transparent transition-all text-sm"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100 transition"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Tombol Register */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 bg-[#7b1f2a] hover:bg-[#5e1620] text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                    >
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Daftar Sekarang"}
                    </button>

                    {/* Link Login */}
                    <div className="text-center text-sm text-stone-500 pt-2 border-t border-stone-100 mt-4">
                        Sudah punya akun?{' '}
                        <a
                            href="/login"

                            className="font-bold text-[#7b1f2a] hover:underline transition-colors cursor-pointer"
                        >
                            Masuk disini
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}