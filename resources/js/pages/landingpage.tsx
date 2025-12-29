"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, hover } from "framer-motion";
import {
  Scissors,
  ShoppingBag,
  Sparkles,
  Leaf,
  Droplets,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  ChevronRight,
  ChevronLeft,
  Play,
  Quote,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  CheckCircle2,
  X,
} from "lucide-react";

/**
 * Full Landing Page (Karindra-style)
 * - Modern, premium, trustworthy aesthetic
 * - Dummy images (Unsplash) + subtle gradients
 * - Smooth scroll, section reveals, parallax-ish accents
 * - Animated product preview modal
 *
 * Requirements: tailwindcss, framer-motion, lucide-react
 */

const palette = {
  maroon: "#7b1f2a",
  maroon2: "#8b2532",
  gold: "#d6a33a",
  cream: "#f7f2ed",
  ink: "#1b1b1f",
  ivory: "#f5efe9",
};

const NAV = [
  { label: "Shop All", href: "#shop" },
  { label: "about ", href: "#story" },
  { label: "testimoni", href: "#testimonials" },
  { label: "FAQ", href: "#FAQ" },
];

const COLLECTIONS = [
  {
    title: "Cleansers",
    desc: "Gentle, barrier-first formulas for daily reset.",
    icon: Droplets,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Serums",
    desc: "Targeted actives with a silky, non-sticky finish.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1629198688000-71f23e745bda?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Moisturizers",
    desc: "Nourish and seal hydration without heaviness.",
    icon: Leaf,
    image:
      "https://images.unsplash.com/photo-1612810436541-336d3b11f3e5?auto=format&fit=crop&w=1600&q=80",
  },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Mosaic Travel Sajadah",
    category: "Prayer Mats",
    price: 145000, // Harga asli 145 ribu
    rating: 4.9,
    reviews: 1240,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1612810431079-1b1b845a70da?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1612810431079-1b1b845a70da?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Sajadah travel lipat dengan motif perca estetik yang unik.",
    bullets: ["Travel-friendly", "Anti-slip", "Mudah dicuci"],
  },
  {
    id: "p2",
    name: "Harmony Patchwork Cushion",
    category: "Home Decor",
    price: 85000, // Harga asli 85 ribu
    rating: 4.7,
    reviews: 980,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1629198688000-71f23e745bda?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1629198688000-71f23e745bda?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1612810436541-336d3b11f3e5?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Sarung bantal sofa yang memberi nuansa hangat dan artistik.",
    bullets: ["Resleting sembunyi", "Jahitan kuat", "Motif 1-of-1"],
  },
  {
    id: "p3",
    name: "Heritage Table Runner",
    category: "Dining",
    price: 120000, // Harga asli 120 ribu
    rating: 4.9,
    reviews: 760,
    badge: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1612810436541-336d3b11f3e5?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1612810436541-336d3b11f3e5?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Taplak meja panjang dari paduan limbah batik yang elegan.",
    bullets: ["Tahan panas", "Aksen etnik", "Ramah lingkungan"],
  },
  {
    id: "p4",
    name: "Everyday Eco Tote",
    category: "Accessories",
    price: 65000, // Harga asli 65 ribu
    rating: 4.6,
    reviews: 540,
    badge: "Limited",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1629198688000-71f23e745bda?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1612810436541-336d3b11f3e5?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Tas belanja luas yang kuat, stylish, dan mengurangi plastik.",
    bullets: ["Muat banyak", "Dapat dicuci", "Strap nyaman"],
  },
  {
    id: "p5",
    name: "Artisan Zipper Pouch",
    category: "Essentials",
    price: 45000, // Harga asli 45 ribu
    rating: 4.5,
    reviews: 420,
    badge: "Gift Pick",
    image:
      "https://images.unsplash.com/photo-1612810435357-5fddbead2b9f?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1612810435357-5fddbead2b9f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Dompet serbaguna untuk makeup, alat tulis, atau kabel.",
    bullets: ["Furing dalam", "Ukuran pas", "Motif ceria"],
  },
  {
    id: "p6",
    name: "Quilted Throw Blanket",
    category: "Home Decor",
    price: 250000, // Harga asli 250 ribu
    rating: 4.7,
    reviews: 610,
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1612810435676-77b3b2c4c8aa?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1612810435676-77b3b2c4c8aa?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1612810436541-336d3b11f3e5?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1600&q=80",
    ],
    short: "Selimut perca tebal yang hangat, dijahit teknik quilting.",
    bullets: ["Bahan lembut", "Aksen kamar", "Tahan lama"],
  },
];

const TESTIMONIALS = [
  {
    name: "Nadia K.",
    quote:
      "Akhirnya nemu sajadah yang estetik tapi tetap fungsional. Motifnya bener-bener one-of-a-kind, nggak ada yang nyamain. Bahannya juga empuk dan nyaman buat sujud.",
    rating: 5,
  },
  {
    name: "Arif R.",
    quote:
      "Awalnya ragu karena dari perca, ternyata hasil jahitannya rapi banget! Detail patchwork-nya bikin ruangan jadi lebih artsy dan hangat. Worth every penny.",
    rating: 5,
  },
  {
    name: "Sinta P.",
    quote:
      "Beli buat kado ulang tahun teman dan dia suka banget. Kemasannya eco-friendly dan ada cerita di balik produknya. Bangga bisa support produk lokal.",
    rating: 5,
  },
];

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

function currency(n) {
  return n.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Hapus koma desimal
    maximumFractionDigits: 0,
  });
}

function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function Pill({ children, tone = "gold" }) {
  const common = "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1";
  const style =
    tone === "gold"
      ? {
        backgroundColor: "rgba(214,163,58,0.15)",
        color: palette.gold,
        borderColor: "rgba(214,163,58,0.30)",
      }
      : tone === "cream"
        ? {
          backgroundColor: "rgba(255,255,255,0.14)",
          color: "rgba(255,255,255,0.92)",
          borderColor: "rgba(255,255,255,0.18)",
        }
        : {
          backgroundColor: "rgba(0,0,0,0.06)",
          color: "rgba(0,0,0,0.70)",
          borderColor: "rgba(0,0,0,0.10)",
        };

  return (
    <span className={common} style={style}>
      {children}
    </span>
  );
}

function StarRow({ value = 5, className = "" }) {
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`${value} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < value ? "text-amber-400" : "text-white/25")} />
      ))}
    </div>
  );
}

function SectionHeader({ eyebrow, title, desc, align = "center" }) {
  return (
    <div className={cn("mx-auto max-w-3xl", align === "left" ? "text-left" : "text-center")}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.22em] text-black/60" style={{ fontFamily: "Inter, system-ui", fontWeight: 700 }}>
          <Sparkles className="h-4 w-4" />
          {eyebrow}
        </div>
      ) : null}
      <h2
        className="mt-3 text-3xl sm:text-4xl text-black/90"
        style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}
      >
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm sm:text-base leading-7 text-black/60" style={{ fontFamily: "Inter, system-ui" }}>
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function Reveal({ children, delay = 0, y = 16, once = true, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={reduce ? {} : { duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Modal({ open, onClose, title, children }) {
  useBodyLock(open);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div onMouseDown={onClose} className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
          <motion.div
            onMouseDown={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 1 } : { y: 18, opacity: 0, scale: 0.99 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 18, opacity: 0, scale: 0.99 }}
            transition={reduce ? { duration: 0.2 } : { type: "spring", stiffness: 260, damping: 24 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <div>
                <div className="text-sm font-semibold text-black/90" style={{ fontFamily: "Inter, system-ui" }}>
                  {title}
                </div>
                <div className="text-xs text-black/50" style={{ fontFamily: "Inter, system-ui" }}>
                  Karya Daur Ulang · Estetik · Ramah Lingkungan
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-black/50 hover:bg-black/5 hover:text-black/70 focus:outline-none focus:ring-2 focus:ring-black/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Nav({ onOpenProduct }) {
  const [open, setOpen] = useState(false);

  function scrollToId(id) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40  backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="text-2xl tracking-tight"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, color: palette.maroon }}
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, color: palette.maroon }}
            >
              <a href="#home">Karindra.</a>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ fontFamily: "Inter, system-ui" }}>
            {NAV.map((n, idx) => (
              <button
                key={n.label}
                onClick={() => scrollToId(n.href)}
                className={cn(
                  "relative transition cursor-pointer",
                  idx === 0 ? "font-semibold" : "text-black/55 hover:text-black/75"
                )}
                style={idx === 0 ? { color: palette.gold } : undefined}
              >
                {n.label}
                {idx === 0 ? (
                  <span
                    className="absolute -bottom-2 left-0 right-0 mx-auto h-[2px] w-12 rounded"
                    style={{ backgroundColor: palette.gold }}
                  />
                ) : null}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/70 shadow-sm hover:bg-black/5"
              style={{ fontFamily: "Inter, system-ui" }}
            >
              Menu
            </button>

            <button
              onClick={onOpenProduct}
              className={cn(
                "inline-flex items-center cursor-pointer justify-center w-10 h-10 rounded-xl border shadow-sm transition hover:bg-black/5"
              )}
              style={{ borderColor: "rgba(123,31,42,0.30)", color: palette.maroon }}
              aria-label="Quick view"
              title="Quick view"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-3 pt-2 flex flex-col gap-1">
                {NAV.map((n) => (
                  <button
                    key={n.label}
                    onClick={() => scrollToId(n.href)}
                    className="rounded-xl px-3 py-2 text-left text-sm font-semibold text-black/70 hover:bg-black/5"
                    style={{ fontFamily: "Inter, system-ui" }}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

function Hero({ onPrimary, onSecondary }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative" aria-label="Hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mt-6 md:mt-8 overflow-hidden">
          <div
            className={cn("relative min-h-[74vh] md:min-h-[80vh]")}
            style={{ backgroundColor: palette.maroon }}
          >
            {/* background */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${palette.maroon} 0%, ${palette.maroon} 55%, ${palette.maroon2} 100%)`,
                }}
              />
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={reduce ? {} : { opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl"
              />
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={reduce ? {} : { opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.05 }}
                className="absolute -left-40 bottom-10 h-[480px] w-[480px] rounded-full bg-black/10 blur-3xl"
              />

              {/* subtle floating grain */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, rgba(255,255,255,0) 0)",
                  backgroundSize: "26px 26px",
                }}
              />
            </div>

            {/* decorative lines */}
            <div className="absolute left-6 top-28 hidden md:block">
              <div className="h-28 w-[2px]" style={{ backgroundColor: "rgba(214,163,58,0.8)" }} />
            </div>
            <div className="absolute right-10 bottom-36 hidden md:block">
              <div className="h-24 w-[2px]" style={{ backgroundColor: "rgba(214,163,58,0.8)" }} />
            </div>

            {/* content */}
            <div className="relative z-10 flex items-center justify-center px-4">
              <div className="w-full max-w-5xl text-center pt-20 md:pt-24">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={reduce ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={cn("inline-flex items-center gap-2 tracking-[0.22em] text-xs md:text-sm")}
                  style={{ fontFamily: "Inter, system-ui", fontWeight: 700, color: palette.gold }}
                  style={{ fontFamily: "Inter, system-ui", fontWeight: 700 }}
                >
                  <Sparkles className="w-4 h-4" />
                  Handcrafted Sustainable Goods
                </motion.div>

                <motion.h1
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={reduce ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
                  className={cn("mt-8 leading-[0.92]")}
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontWeight: 600,
                    fontSize: "clamp(52px, 7vw, 92px)",
                    color: palette.ivory,
                  }}
                >
                  Karindra
                  <br />
                  Ecoproject
                </motion.h1>

                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={reduce ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
                  className="mt-8 mx-auto max-w-2xl text-white/85"
                  style={{
                    fontFamily: "Inter, system-ui",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 1.6vw, 18px)",
                    lineHeight: 1.9,
                  }}
                >
                  Menghadirkan kehidupan kedua bagi kain perca melalui sentuhan desain
                  <br className="hidden sm:block" />
                  otentik. Setiap karya diciptakan dengan semangat 'Re-wearing is Caring', mengubah limbah menjadi keindahan yang fungsional dan bernilai seni tinggi."
                </motion.p>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={reduce ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
                  className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <button
                    onClick={onPrimary}
                    className="group inline-flex items-center justify-center cursor-pointer rounded-full px-10 py-4 text-sm md:text-base shadow-sm"
                    style={{
                      backgroundColor: palette.gold,
                      color: palette.maroon,
                      fontFamily: "Inter, system-ui",
                      fontWeight: 700,
                    }}
                  >
                    Discover Collection
                    <ChevronRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={onSecondary}
                    className="inline-flex items-center justify-center rounded-full px-10 py-4 text-sm md:text-base cursor-pointer"
                    style={{
                      border: `2px solid rgba(214,163,58,0.85)`,
                      color: palette.gold,
                      fontFamily: "Inter, system-ui",
                      fontWeight: 700,
                    }}
                  >
                    Our Story
                  </button>
                </motion.div>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={reduce ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.24 }}
                  className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/80"
                  style={{ fontFamily: "Inter, system-ui", fontSize: 14, fontWeight: 600 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: palette.gold }} />
                    Authentic Design
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: palette.gold }} />
                    Eco-Conscious
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: palette.gold }} />
                    Handcrafted in Indonesia
                  </div>
                </motion.div>

                <div className="h-16" />
              </div>
            </div>
          </div>

          <div className="h-6" />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    {
      icon: Scissors,
      title: "Handcrafted",
      desc: "Dijahit manual penuh detail"
    },
    {
      icon: Leaf,
      title: "Zero Waste",
      desc: "Mengurangi limbah tekstil"
    },
    {
      icon: Sparkles,
      title: "Hygienic",
      desc: "Disterilkan"
    },
  ];

  return (
    <section aria-label="Trust" className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/10 sm:grid-cols-3">
            {items.map((it) => (
              <div key={it.title} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl bg-black/5 p-2 text-black/70">
                  <it.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-black/85" style={{ fontFamily: "Inter, system-ui" }}>
                    {it.title}
                  </div>
                  <div className="text-xs text-black/55" style={{ fontFamily: "Inter, system-ui" }}>
                    {it.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section id="collections" className="py-14" aria-label="Collections">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="CURATED ROUTINES"
          title="Build a ritual that feels intentional"
          desc="Three essential categories, designed to layer cleanly. Minimal ingredients, maximum feel."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
                <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black/80 ring-1 ring-black/10">
                      <c.icon className="h-4 w-4" />
                      {c.title}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-lg font-semibold text-black/90" style={{ fontFamily: "Playfair Display, serif" }}>
                    {c.title}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-black/60" style={{ fontFamily: "Inter, system-ui" }}>
                    {c.desc}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black/70" style={{ fontFamily: "Inter, system-ui" }}>
                    Explore
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, onQuickView }) {
  const badgeTone = p.badge === "Best Seller" ? "gold" : "ink";
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4">
          <Pill tone={badgeTone}>{p.badge}</Pill>
        </div>
        <button
          onClick={onQuickView}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-black/70 ring-1 ring-black/10 hover:bg-white"
          aria-label="Quick view"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-black/50" style={{ fontFamily: "Inter, system-ui" }}>
              {p.category}
            </div>
            <div className="mt-1 text-base font-semibold text-black/90" style={{ fontFamily: "Inter, system-ui" }}>
              {p.name}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-black/90" style={{ fontFamily: "Inter, system-ui" }}>
              {currency(p.price)}
            </div>
            <div className="mt-1 text-xs text-black/50" style={{ fontFamily: "Inter, system-ui" }}>
              {p.reviews.toLocaleString()} reviews
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRow value={Math.round(p.rating)} className="text-amber-400" />
            <div className="text-xs text-black/55" style={{ fontFamily: "Inter, system-ui" }}>
              {p.rating.toFixed(1)}
            </div>
          </div>
          <div className="text-xs font-semibold text-black/50" style={{ fontFamily: "Inter, system-ui" }}>
            Clean finish
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.bullets.map((b) => (
            <span key={b} className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/60 ring-1 ring-black/10" style={{ fontFamily: "Inter, system-ui" }}>
              {b}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={onQuickView}
            className="inline-flex text-black cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/10 hover:bg-black/5"
            style={{ fontFamily: "Inter, system-ui" }}
          >
            Quick View
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm cursor-pointer"
            style={{ backgroundColor: palette.maroon, color: "white", fontFamily: "Inter, system-ui" }}
          >
            Add
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Shop({ onQuickView }) {
  return (
    <section id="shop" className="py-14" aria-label="Shop">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="SHOP"
          title="Satu Motif, Satu Cerita."
          desc="Jelajahi koleksi sajadah dan aksesori rumah yang tiada duanya. Karena dibuat dari perca pilihan, setiap produk di sini adalah karya seni tunggal yang tidak akan Anda temukan di tempat lain."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProductCard p={p} onQuickView={() => onQuickView(p)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="py-14" aria-label="Story">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/10">
                <SectionHeader
                  align="left"
                  eyebrow="OUR STORY"
                  title="Seni dalam Setiap Perca."
                  desc="Karindra lahir dari keyakinan sederhana: bahwa kain sisa (perca) layak mendapatkan kesempatan kedua. Di tengah industri fashion yang serba cepat, kami memilih untuk melambat—mengumpulkan, memilah, dan merangkai kembali limbah tekstil menjadi karya fungsional yang bernilai seni."
                />
                <div className="mt-6 space-y-3 text-sm leading-7 text-black/60" style={{ fontFamily: "Inter, system-ui" }}>
                  <p>
                    Setiap produk Karindra bukan sekadar barang, melainkan wujud nyata dari semangat 'Consume Less, Create More'.
                  </p>
                  <p>
                    Kami memadukan kreativitas artisan lokal dengan komitmen menjaga bumi, satu jahitan demi satu jahitan.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        title: "Material Terkurasi",
                        desc: "Perca pilihan, steril & higienis.",
                      },
                      {
                        title: "Ramah Lingkungan",
                        desc: "Mengurangi limbah tekstil.",
                      },
                      {
                        title: "Sentuhan Artisan",
                        desc: "Dijahit tangan dengan teliti.",
                      },
                      {
                        title: "Desain Otentik",
                        desc: "Motif unik, tiada duanya.",
                      },
                    ].map((x) => (
                      <div key={x.title} className="rounded-2xl bg-black/5 p-4 ring-1 ring-black/10">
                        <div className="text-sm font-semibold text-black/80">{x.title}</div>
                        <div className="mt-1 text-xs text-black/55">{x.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <div className="relative overflow-hidden rounded-2xl bg-black/5 shadow-sm ring-1 ring-black/10">
                <div className="grid gap-0 sm:grid-cols-2">
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full">
                    <img
                      src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80"
                      alt="Skincare editorial"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </div>
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full">
                    <img
                      src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1400&q=80"
                      alt="Packaging detail"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </div>
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full">
                    <img
                      src="https://images.unsplash.com/photo-1556228577-4a0f6c2cf46c?auto=format&fit=crop&w=1400&q=80"
                      alt="Bathroom shelf"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </div>
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full">
                    <img
                      src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=80"
                      alt="Hands and product"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </div>
                </div>
                <div className="absolute left-4 top-4">
                  <Pill tone="ink">Editorial · Dummy images</Pill>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-14" aria-label="Video">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="TEXTURE"
          title="A calm, modern ritual"
          desc="A video-style section with a tasteful overlay. Click to toggle a subtle motion state."
        />

        <div className="mt-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-black/5 shadow-sm ring-1 ring-black/10">
              <div className="relative aspect-[16/9]">
                <motion.img
                  src="https://images.unsplash.com/photo-1556228724-4b2b2b2b2b2b?auto=format&fit=crop&w=1600&q=80"
                  alt="Calm skincare scene"
                  className="h-full w-full object-cover"
                  animate={reduce ? {} : playing ? { scale: 1.03 } : { scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  onError={(e) => {
                    // fallback if image fails
                    e.currentTarget.src = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute left-6 top-6">
                  <Pill tone="cream">Behind the scenes</Pill>
                </div>

                <div className="absolute left-6 bottom-6 right-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl font-semibold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
                      Slow-made skincare, fast daily comfort
                    </div>
                    <div className="mt-2 max-w-xl text-sm leading-7 text-white/75" style={{ fontFamily: "Inter, system-ui" }}>
                      The goal is a premium feel with minimal visual noise—so the product story stays clear.
                    </div>
                  </div>
                  <button
                    onClick={() => setPlaying((v) => !v)}
                    className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-black/80 ring-1 ring-black/10 hover:bg-white"
                    style={{ fontFamily: "Inter, system-ui" }}
                  >
                    <Play className="h-4 w-4" />
                    {playing ? "Pause motion" : "Play motion"}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-14" aria-label="Testimonials" id="testimonials">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="TESTIMONIALS"
          title="Cerita Di Balik Karya"
          desc="Kepuasan pelanggan adalah prioritas kami. Berikut adalah pengalaman mereka yang telah menjadi bagian dari gerakan #ConsumeLessCreateMore."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-black/85" style={{ fontFamily: "Inter, system-ui" }}>
                      {t.name}
                    </div>
                    <div className="text-xs text-black/50" style={{ fontFamily: "Inter, system-ui" }}>
                      {t.role}
                    </div>
                  </div>
                  <Quote className="h-5 w-5 text-black/30" />
                </div>
                <div className="mt-3">
                  <StarRow value={t.rating} className="text-amber-400" />
                </div>
                <p className="mt-4 text-sm leading-7 text-black/60" style={{ fontFamily: "Inter, system-ui" }}>
                  “{t.quote}”
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Apakah bahan perca yang digunakan bersih dan higienis?",
      a: "Tentu saja. Seluruh bahan kain sisa produksi telah melalui proses penyortiran ketat, pencucian (sterilisasi), dan setrika uap sebelum dijahit menjadi produk baru. Kami memastikan produk sampai ke tangan Anda dalam keadaan bersih.",
    },
    {
      q: "Apakah saya bisa mendapatkan motif yang sama persis jika stok habis?",
      a: "Karena kami menerapkan prinsip Authentic Design, setiap produk adalah 'One of a Kind' (satu-satunya). Anda mungkin tidak mendapatkan motif yang 100% sama, namun kami menjamin nuansa warna dan kualitas jahitan yang serupa.",
    },
    {
      q: "Bagaimana cara mencuci dan merawat produk Karindra?",
      a: "Kami sarankan mencuci secara manual (hand wash) atau menggunakan mesin cuci mode lembut (delicate) dengan air dingin. Hindari pemutih agar warna kain perca tetap terjaga.",
    },
    {
      q: "Apakah menerima pesanan khusus (Custom Order) atau suvenir?",
      a: "Ya, kami menerima pesanan dalam jumlah besar untuk suvenir perusahaan atau acara khusus dengan semangat 'Consume Less Create More'. Silakan hubungi kami untuk diskusi lebih lanjut.",
    },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section className="py-14" aria-label="FAQ" id="FAQ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="FAQ"
                title="Punya Pertanyaan?"
                desc="Temukan jawaban mengenai proses pembuatan, perawatan produk, dan cara kami menjaga standar kualitas Karindra Ecoproject."
              />
              <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/10">
                <div className="space-y-2 text-sm leading-7 text-black/60" style={{ fontFamily: "Inter, system-ui" }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Jaminan Kebersihan (Hygienic)
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Desain Autentik (1 of 1)
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Material Ramah Lingkungan
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-3">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={f.q} delay={i * 0.03}>
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className={cn(
                        "w-full rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-black/10",
                        "hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 cursor-pointer"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4 ">
                        <div>
                          <div className="text-sm font-semibold text-black/85 " style={{ fontFamily: "Inter, system-ui" }}>
                            {f.q}
                          </div>
                          <AnimatePresence initial={false}>
                            {isOpen ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2 text-sm leading-7 text-black/60" style={{ fontFamily: "Inter, system-ui" }}>
                                  {f.a}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                        <div className={cn("mt-1 h-6 w-6 rounded-full ring-1 ring-black/10", isOpen ? `bg-[${palette.maroon}]` : "bg-black/5")} />
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-14" aria-label="Newsletter">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className={cn("relative overflow-hidden rounded-2xl p-8 sm:p-10 shadow-sm ring-1", `bg-[${palette.maroon}] ring-black/10`)}>
            <div className={cn("absolute inset-0", `bg-gradient-to-br from-[${palette.maroon}] via-[${palette.maroon}] to-[${palette.maroon2}]`)} />
            <div className="absolute -right-28 top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-28 bottom-10 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className={cn("inline-flex items-center gap-2 text-xs tracking-[0.22em]", `text-[${palette.gold}]`)} style={{ fontFamily: "Inter, system-ui", fontWeight: 700 }}>
                  <Mail className="h-4 w-4" />
                  NEWSLETTER
                </div>
                <div className="mt-3 text-3xl sm:text-4xl text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}>
                  Get early access to drops
                </div>
                <div className="mt-3 text-sm leading-7 text-white/75" style={{ fontFamily: "Inter, system-ui" }}>
                  Join for new launches, limited batches, and routine guides. No spam—just the good stuff.
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full rounded-full border border-white/15 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/55 focus:outline-none focus:ring-2 focus:ring-white/20"
                      style={{ fontFamily: "Inter, system-ui" }}
                    />
                  </div>
                  <button
                    onClick={() => setEmail("")}
                    className="rounded-full px-6 py-3 text-sm font-semibold shadow-sm"
                    style={{ backgroundColor: palette.gold, color: palette.maroon, fontFamily: "Inter, system-ui" }}
                  >
                    Subscribe
                  </button>
                </div>
                <div className="mt-3 text-xs text-white/60" style={{ fontFamily: "Inter, system-ui" }}>
                  By subscribing, you agree to our privacy policy.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/5" style={{ backgroundColor: palette.maroon, color: palette.ivory }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-10 sm:grid-cols-3">
          <div>
            <div className={cn("text-2xl")}
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
              Karindra.
            </div>
            <div className="mt-3 text-sm leading-7 " style={{ fontFamily: "Inter, system-ui", color: palette.ivory }}>
              A modern landing template for premium skincare brands. Clean spacing, strong trust signals, and tasteful motion.
            </div>
            <div className="mt-4 flex items-center gap-3">
              {[
                {
                  Icon: Instagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/karindra.ecoproject/"
                },

              ].map(
                ({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-black/60 shadow-sm hover:bg-black/10"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold " style={{ fontFamily: "Inter, system-ui", color: palette.ivory }}>
              Links
            </div>
            <ul className="mt-3 space-y-2 text-sm " style={{ fontFamily: "Inter, system-ui", color: palette.ivory }}>
              <li><a className='hover:text-[#d6a33a] transition-colors' href="#shop">Shop</a></li>
              <li><a className="hover:text-[#d6a33a] transition-colors" href="#story">About</a></li>
              <li><a className="hover:text-[#d6a33a] transition-colors" href="#testimonials">testimoni</a></li>
              <li><a className="hover:text-[#d6a33a] transition-colors" href="#FAQ">FAQ</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold " style={{ fontFamily: "Inter, system-ui", color: palette.ivory }}>
              Contact
            </div>
            <div className="mt-3 text-sm" style={{ fontFamily: "Inter, system-ui", color: palette.ivory }}>
              <a href="#" className="hover:text-[#d6a33a]">support@karindra.example</a>
            </div>
          </div>
        </div>

        <div className="border-t border-black/5 py-6 text-xs " style={{ fontFamily: "Inter, system-ui", color: palette.ivory }}>
          © {new Date().getFullYear()} Karindra (template). All content and products are placeholders.
        </div>
      </div>
    </footer>
  );
}

function QuickView({ product, onClose }) {
  const [active, setActive] = useState(0);

  const images = product?.gallery || [];

  return (
    <Modal open={!!product} onClose={onClose} title="Quick View">
      {product ? (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl bg-black/5 ring-1 ring-black/10">
              <div className="relative aspect-[4/3]">
                <img src={images[active]} alt={product.name} className="h-full w-full object-cover" />
                <div className="absolute left-4 top-4">
                  <Pill tone="ink">{product.badge}</Pill>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  className={cn(
                    "overflow-hidden rounded-2xl bg-black/5 ring-1 transition focus:outline-none focus:ring-2 focus:ring-black/20",
                    i === active ? "ring-black/40" : "ring-black/10 hover:ring-black/20"
                  )}
                  aria-label={`Image ${i + 1}`}
                >
                  <div className="aspect-[4/3]">
                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-black/50" style={{ fontFamily: "Inter, system-ui" }}>
                  {product.category}
                </div>
                <div className="mt-2 text-2xl font-semibold text-black/90" style={{ fontFamily: "Playfair Display, serif" }}>
                  {product.name}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <StarRow value={Math.round(product.rating)} className="text-amber-400" />
                  <div className="text-sm font-semibold text-black/70" style={{ fontFamily: "Inter, system-ui" }}>
                    {product.rating.toFixed(1)}
                  </div>
                  <div className="text-sm text-black/50" style={{ fontFamily: "Inter, system-ui" }}>
                    ({product.reviews.toLocaleString()})
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-black/5 p-4 ring-1 ring-black/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-2xl font-bold text-black/90" style={{ fontFamily: "Inter, system-ui" }}>
                      {currency(product.price)}
                    </div>
                    <div className="mt-1 text-sm text-black/60" style={{ fontFamily: "Inter, system-ui" }}>
                      {product.short}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-black/50" style={{ fontFamily: "Inter, system-ui" }}>
                      Includes
                    </div>
                    <div className="mt-2 space-y-1">
                      {product.bullets.slice(0, 3).map((b) => (
                        <div key={b} className="text-xs text-black/60" style={{ fontFamily: "Inter, system-ui" }}>
                          • {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[{ icon: ShieldCheck, label: "Transaksi Aman" }, { icon: Truck, label: "Siap Kirim" }, { icon: RotateCcw, label: "Returns" }].map(
                  ({ icon: Icon, label }) => (
                    <div key={label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/10">
                      <Icon className="h-5 w-5 text-black/70" />
                      <div className="mt-2 text-xs font-semibold text-black/70" style={{ fontFamily: "Inter, system-ui" }}>
                        {label}
                      </div>

                    </div>
                  )
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  className="flex-1 rounded-full px-5 py-3 text-sm font-semibold shadow-sm cursor-pointer"
                  style={{ backgroundColor: palette.maroon, color: "white", fontFamily: "Inter, system-ui" }}
                >
                  Add to bag
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold cursor-pointer text-black/70 shadow-sm hover:bg-black/5"
                  style={{ fontFamily: "Inter, system-ui" }}
                >
                  Keep browsing
                </button>
              </div>

              <div className="text-xs text-black/50" style={{ fontFamily: "Inter, system-ui" }}>
                Karena buatan tangan, motif yang kamu lihat adalah satu-satunya (1 of 1).
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

export default function KarindraFullLanding() {
  const [quick, setQuick] = useState(null);

  const anyProduct = useMemo(() => PRODUCTS[0], []);

  useEffect(() => {
    // Smooth scroll for hash if present
    if (typeof window === "undefined") return;
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, []);

  return (
    <div className={cn("min-h-screen")} style={{ backgroundColor: palette.cream }}>
      {/* Font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      <Nav onOpenProduct={() => setQuick(anyProduct)} />

      <main>
        <Hero
          onPrimary={() => {
            const el = document.querySelector("#shop");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          onSecondary={() => {
            const el = document.querySelector("#story");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <TrustBar />
        <Shop onQuickView={(p) => setQuick(p)} />
        <Story />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
