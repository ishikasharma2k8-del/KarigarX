import React from 'react';
import { Sparkles, Camera, ShoppingBag, Store, LayoutGrid, Package } from 'lucide-react';
import { SupportedLanguage } from '../types';

export type MainNavTab = 'home' | 'scanner' | 'catalog' | 'orders' | 'marketplace' | 'dashboard';

interface TopNavProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  catalogCount: number;
  ordersCount?: number;
  marketplaceCount?: number;
  currentLang: SupportedLanguage;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  catalogCount,
  ordersCount = 4,
  marketplaceCount = 3,
  currentLang,
}) => {
  const tabs = [
    {
      id: 'home' as MainNavTab,
      label: currentLang === 'hi' ? 'होम' : currentLang === 'te' ? 'హోమ్' : currentLang === 'ta' ? 'முகப்பு' : 'Home',
      icon: Sparkles,
      emoji: '🏠',
    },
    {
      id: 'scanner' as MainNavTab,
      label: currentLang === 'hi' ? 'कैमरा / बोलें' : currentLang === 'te' ? 'కెమెరా / మాట్లాడండి' : currentLang === 'ta' ? 'கேமரா / பேசு' : 'Camera / Speak',
      icon: Camera,
      emoji: '📷',
    },
    {
      id: 'catalog' as MainNavTab,
      label: currentLang === 'hi' ? 'मेरे उत्पाद' : currentLang === 'te' ? 'నా ఉత్పత్తులు' : currentLang === 'ta' ? 'என் பொருட்கள்' : 'My Products',
      icon: ShoppingBag,
      emoji: '🛍️',
      badge: catalogCount > 0 ? catalogCount : null,
    },
    {
      id: 'orders' as MainNavTab,
      label: currentLang === 'hi' ? 'ऑर्डर' : currentLang === 'te' ? 'ఆర్డర్లు' : currentLang === 'ta' ? 'ஆர்டர்கள்' : 'Orders',
      icon: Package,
      emoji: '📦',
      countBadge: ordersCount,
    },
    {
      id: 'marketplace' as MainNavTab,
      label: currentLang === 'hi' ? 'मार्केटप्लेस' : currentLang === 'te' ? 'మార్కెట్‌ప్లేస్' : currentLang === 'ta' ? 'சந்தை' : 'Marketplace',
      icon: Store,
      emoji: '🏪',
      countBadge: marketplaceCount,
    },
    {
      id: 'dashboard' as MainNavTab,
      label: currentLang === 'hi' ? 'कमाई' : currentLang === 'te' ? 'ఆదాయం' : currentLang === 'ta' ? 'வருமானம்' : 'Earnings',
      icon: LayoutGrid,
      emoji: '💰',
    },
  ];

  return (
    <nav className="w-full bg-[#FAF7F2] py-2.5 px-4 border-b border-[#E8E2D6]/70 sticky top-[57px] z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap active:scale-95 shadow-2xs ${
                  isActive
                    ? 'bg-[#b84c28] text-white shadow-xs font-bold'
                    : 'bg-[#EDE7DC]/90 hover:bg-[#E4DCCE] text-[#5A5046] hover:text-[#2B231D]'
                }`}
              >
                <span className="text-sm sm:text-base leading-none">{tab.emoji}</span>
                <span>{tab.label}</span>
                {tab.countBadge !== undefined && (
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-emerald-400 text-stone-950'
                        : 'bg-emerald-700 text-white'
                    }`}
                  >
                    {tab.countBadge}
                  </span>
                )}
                {tab.badge !== null && tab.badge !== undefined && !tab.countBadge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-amber-300 text-stone-950' : 'bg-stone-300 text-stone-900'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
