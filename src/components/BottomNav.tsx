import React from 'react';
import { Home, Camera, ShoppingBag, User } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_STRINGS } from '../translations';

export type AppTab = 'home' | 'scan' | 'catalog' | 'profile';

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  catalogCount: number;
  currentLang: SupportedLanguage;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  catalogCount,
  currentLang,
}) => {
  const t = UI_STRINGS[currentLang];

  const navItems = [
    {
      id: 'home' as AppTab,
      label: t.navHome || 'Home',
      icon: Home,
    },
    {
      id: 'scan' as AppTab,
      label: t.navScan || 'Scan',
      icon: Camera,
      highlight: true,
    },
    {
      id: 'catalog' as AppTab,
      label: t.navCatalog || 'My Catalog',
      icon: ShoppingBag,
      badge: catalogCount > 0 ? catalogCount : null,
    },
    {
      id: 'profile' as AppTab,
      label: t.navProfile || 'Profile',
      icon: User,
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="Main Navigation"
      className="fixed bottom-0 inset-x-0 z-50 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 text-stone-300 pb-safe shadow-lg"
    >
      <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.highlight) {
            // Elevated Center Scan Button
            return (
              <button
                key={item.id}
                id="bottom-nav-scan"
                type="button"
                onClick={() => onTabChange(item.id)}
                className="relative -top-4 flex flex-col items-center group focus:outline-none"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90 ${
                    isActive
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 ring-4 ring-amber-400/30 shadow-amber-500/40'
                      : 'bg-gradient-to-tr from-amber-600 to-orange-600 text-stone-950 shadow-stone-950/50 hover:brightness-110'
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.4]" />
                </div>
                <span
                  className={`text-[11px] font-bold mt-1 transition-colors ${
                    isActive ? 'text-amber-400' : 'text-stone-400 group-hover:text-stone-200'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 relative ${
                isActive ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge !== null && item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 bg-amber-500 text-stone-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-stone-900">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 leading-tight tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-amber-400 mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
