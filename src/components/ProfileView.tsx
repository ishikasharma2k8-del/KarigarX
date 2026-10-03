import React from 'react';
import {
  User,
  Globe,
  Award,
  CheckCircle2,
  Volume2,
  FileText,
  HelpCircle,
  ExternalLink,
  PhoneCall,
  Sparkles,
  Layers,
  ShoppingBag,
} from 'lucide-react';
import { LANGUAGES, UI_STRINGS } from '../translations';
import { SupportedLanguage } from '../types';
import { KarigarLogo } from './KarigarLogo';

interface ProfileViewProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  catalogCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentLang,
  onLanguageChange,
  catalogCount,
}) => {
  const t = UI_STRINGS[currentLang];

  return (
    <div className="space-y-4 px-4 py-4 max-w-md mx-auto animate-fade-in pb-24">
      {/* Artisan Profile Card */}
      <div className="bg-stone-900 text-white rounded-3xl p-5 border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center font-black text-xl shadow-md shrink-0">
            <KarigarLogo size="sm" lightText={false} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-stone-100 truncate">{t.artisanName}</h2>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <p className="text-xs text-amber-300 font-medium">{t.artisanBadge}</p>
            <span className="text-[10px] text-stone-400 block mt-0.5">
              Craft ID: KX-{Math.abs(currentLang.charCodeAt(0) * 1234 + 5678)} • Handloom & Handicrafts
            </span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-stone-800 text-xs">
          <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
            <span className="text-[10px] text-stone-400 block">Digital Catalog</span>
            <span className="text-sm font-bold text-amber-400">{catalogCount} Products</span>
          </div>
          <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/50">
            <span className="text-[10px] text-stone-400 block">AI Vision Engine</span>
            <span className="text-sm font-bold text-emerald-400">KarigarX v2.4</span>
          </div>
        </div>
      </div>

      {/* Language Preference Section */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
          <Globe className="w-4 h-4 text-amber-600" />
          <span>{t.selectLanguage}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                id={`profile-lang-${lang.code}`}
                type="button"
                onClick={() => onLanguageChange(lang.code)}
                className={`p-3 rounded-xl border text-left transition flex items-center justify-between active:scale-95 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 text-stone-950 font-bold shadow-xs'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div>
                  <span className="text-sm font-semibold block">{lang.nativeName}</span>
                  <span className="text-[10px] text-stone-500">{lang.name}</span>
                </div>
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Market Access & Govt Schemes Guide for Artisans */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
          <Award className="w-4 h-4 text-amber-600" />
          <span>{t.marketAccessTips}</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900">PM Vishwakarma Scheme</h4>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                Govt Scheme
              </span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Financial support up to ₹3,00,000 at 5% interest, modern toolkits, and skill certification for traditional karigars.
            </p>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900">ONDC Network Direct Access</h4>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                E-Commerce
              </span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              List and sell your handcrafted products directly across national e-commerce apps with 0% platform lock-in.
            </p>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900">GeM Portal & Hunar Haat</h4>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                Exhibitions
              </span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Supply directly to government departments and participate in nationwide state craft melas.
            </p>
          </div>
        </div>
      </div>

      {/* KarigarX Mission Footer */}
      <div className="text-center pt-2 space-y-1 text-stone-500 text-[11px]">
        <div className="flex items-center justify-center gap-1 font-bold text-stone-700">
          <span>KarigarX</span>
          <span>•</span>
          <span>Crafted for Indian Artisans</span>
        </div>
        <p className="text-[10px] text-stone-400">
          Smart India Hackathon (SIH) Artisan Empowerment Initiative
        </p>
      </div>
    </div>
  );
};
