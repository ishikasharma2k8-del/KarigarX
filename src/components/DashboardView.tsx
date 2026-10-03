import React from 'react';
import {
  Award,
  TrendingUp,
  Package,
  Sparkles,
  Download,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  IndianRupee,
  Layers,
  FileCheck,
} from 'lucide-react';
import { ProductAnalysis, SupportedLanguage } from '../types';
import { UI_STRINGS, LANGUAGES } from '../translations';
import { PricingTrendChart } from './PricingTrendChart';
import officialLogoImg from '../assets/images/karigarx_official_logo_1788090855222.jpg';

interface DashboardViewProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  catalog: ProductAnalysis[];
  onOpenScanner: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentLang,
  onLanguageChange,
  catalog,
  onOpenScanner,
}) => {
  const t = UI_STRINGS[currentLang];
  const totalMarketValue = catalog.reduce((acc, curr) => acc + (curr.suggestedPriceINR || 0), 0) || 2980;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Top Welcome Artisan Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D6] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={officialLogoImg}
              alt="KarigarX Artisan Verification"
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-contain bg-[#FAF7F2] border-2 border-[#E8E2D6] shadow-sm transition-transform hover:scale-105"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2B231D]">
                Rameshwar Handicrafts Studio
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>SIH Verified KarigarX Artisan</span>
              </span>
            </div>
            <p className="text-xs text-[#7A6E63]">
              Artisan ID: <strong className="text-stone-800">KX-IND-8821</strong> • Traditional Terracotta & Brass Heritage
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenScanner}
          className="py-3 px-5 bg-[#b84c28] hover:bg-[#a23f1e] text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Scan New Product</span>
        </button>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D6] shadow-xs space-y-1">
          <span className="text-[11px] text-[#7A6E63] font-bold uppercase tracking-wider block">
            Catalog Inventory
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif font-bold text-[#2B231D]">
              {catalog.length || 3}
            </span>
            <Package className="w-5 h-5 text-[#b84c28]" />
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>+100% digitalized</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D6] shadow-xs space-y-1">
          <span className="text-[11px] text-[#7A6E63] font-bold uppercase tracking-wider block">
            Total Inventory Value
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif font-bold text-[#204E36]">
              ₹{totalMarketValue.toLocaleString('en-IN')}
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[11px] text-[#7A6E63]">
            Fair Indian Market Est.
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D6] shadow-xs space-y-1">
          <span className="text-[11px] text-[#7A6E63] font-bold uppercase tracking-wider block">
            E-Commerce Inquiries
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif font-bold text-[#2B231D]">
              18
            </span>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">
            via WhatsApp & ONDC
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D6] shadow-xs space-y-1">
          <span className="text-[11px] text-[#7A6E63] font-bold uppercase tracking-wider block">
            AI Vision Accuracy
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-serif font-bold text-[#2B231D]">
              98.4%
            </span>
            <ShieldCheck className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-[11px] text-purple-700 font-semibold">
            Indian Craft Database
          </span>
        </div>
      </div>

      {/* Average Suggested Pricing Trend Recharts Widget */}
      <PricingTrendChart catalog={catalog} currentLang={currentLang} />

      {/* Government Welfare Schemes & Grants for Karigars */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E2D6] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#b84c28]" />
          <h2 className="text-lg font-serif font-bold text-[#2B231D]">
            Government Schemes & Direct Market Channels
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2B231D]">PM Vishwakarma Scheme</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                ₹3,00,000 Loan @ 5%
              </span>
            </div>
            <p className="text-xs text-[#7A6E63] leading-relaxed">
              Provides collateral-free financial support, modern toolkits, and skill certification for traditional Indian artisans.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2B231D]">ONDC Direct Commerce</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                0% Commission
              </span>
            </div>
            <p className="text-xs text-[#7A6E63] leading-relaxed">
              Sell directly across national buyer apps without middlemen or hefty marketplace cuts.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2B231D]">GeM & Hunar Haat</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                Govt Procurement
              </span>
            </div>
            <p className="text-xs text-[#7A6E63] leading-relaxed">
              Register to supply authentic handicraft products directly to state departments and exhibitions.
            </p>
          </div>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E2D6] shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#b84c28]" />
          <h2 className="text-lg font-serif font-bold text-[#2B231D]">
            Regional Language / भाषा चयन
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => onLanguageChange(l.code)}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between active:scale-95 ${
                currentLang === l.code
                  ? 'bg-[#2B231D] text-white border-[#2B231D] shadow-xs'
                  : 'bg-[#FAF7F2] text-[#6E645A] border-[#E8E2D6] hover:bg-[#F3ECE1]'
              }`}
            >
              <div>
                <span className="text-sm font-bold block">{l.nativeName}</span>
                <span className="text-[10px] opacity-75">{l.name}</span>
              </div>
              {currentLang === l.code && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
