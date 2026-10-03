import React from 'react';
import { Layers } from 'lucide-react';

// Import realistic macro photographs of actual raw materials (no finished products, no people, no logos)
import rawTerracottaClayImg from '../assets/images/raw_terracotta_clay_1788283621062.jpg';
import rawBambooSticksImg from '../assets/images/raw_bamboo_sticks_1788283636152.jpg';
import rawCottonFibersImg from '../assets/images/raw_cotton_fibers_1788283651425.jpg';
import rawJuteFibersImg from '../assets/images/raw_jute_fibers_1788283666260.jpg';
import rawNaturalWoodImg from '../assets/images/raw_natural_wood_1788283682809.jpg';
import rawNaturalDyesImg from '../assets/images/raw_natural_dyes_1788283696136.jpg';
import rawBrassMetalImg from '../assets/images/raw_brass_metal_1788283710544.jpg';
import rawCraftBeadsImg from '../assets/images/raw_craft_beads_1788283724304.jpg';
import rawCottonThreadImg from '../assets/images/raw_cotton_thread_1788283743743.jpg';
import rawLeatherHideImg from '../assets/images/raw_leather_hide_1788283760114.jpg';
import rawSilkCocoonsImg from '../assets/images/raw_silk_cocoons_1788283780515.jpg';

interface MaterialVisualInfo {
  icon: string;
  image: string;
  category: string;
  bgColor: string;
  borderColor: string;
}

// Map craft material names accurately to realistic raw material photographs
export function getMaterialVisualInfo(rawMaterialName: string): MaterialVisualInfo {
  const name = rawMaterialName.toLowerCase().trim();

  // 1. Raw Terracotta & Pottery Clay
  if (
    name.includes('clay') ||
    name.includes('terracotta') ||
    name.includes('ceramic') ||
    name.includes('mud') ||
    name.includes('pottery') ||
    name.includes('mitti') ||
    name.includes('earthen')
  ) {
    return {
      icon: '🏺',
      image: rawTerracottaClayImg,
      category: 'Raw Terracotta Clay',
      bgColor: 'bg-amber-50/80',
      borderColor: 'border-amber-300',
    };
  }

  // 2. Raw Bamboo Culms & Stalks
  if (
    name.includes('bamboo') ||
    name.includes('cane') ||
    name.includes('rattan') ||
    name.includes('wicker') ||
    name.includes('reed')
  ) {
    return {
      icon: '🎋',
      image: rawBambooSticksImg,
      category: 'Raw Bamboo Stalks',
      bgColor: 'bg-emerald-50/80',
      borderColor: 'border-emerald-200',
    };
  }

  // 3. Raw Jute & Hemp Fibers
  if (
    name.includes('jute') ||
    name.includes('coir') ||
    name.includes('hemp') ||
    name.includes('straw') ||
    name.includes('grass') ||
    name.includes('burlap')
  ) {
    return {
      icon: '🌾',
      image: rawJuteFibersImg,
      category: 'Raw Jute Fibers',
      bgColor: 'bg-yellow-50/80',
      borderColor: 'border-yellow-200',
    };
  }

  // 4. Raw Natural Wood & Timber
  if (
    name.includes('wood') ||
    name.includes('teak') ||
    name.includes('sheesham') ||
    name.includes('rosewood') ||
    name.includes('timber') ||
    name.includes('sandalwood') ||
    name.includes('walnut') ||
    name.includes('mango wood')
  ) {
    return {
      icon: '🪵',
      image: rawNaturalWoodImg,
      category: 'Natural Raw Wood',
      bgColor: 'bg-stone-100/90',
      borderColor: 'border-stone-300',
    };
  }

  // 5. Raw Natural Herbal Dyes & Pigments
  if (
    name.includes('dye') ||
    name.includes('pigment') ||
    name.includes('indigo') ||
    name.includes('turmeric') ||
    name.includes('vegetable') ||
    name.includes('madder') ||
    name.includes('natural color') ||
    name.includes('powder')
  ) {
    return {
      icon: '🎨',
      image: rawNaturalDyesImg,
      category: 'Raw Natural Dye Pigment',
      bgColor: 'bg-rose-50/80',
      borderColor: 'border-rose-200',
    };
  }

  // 6. Raw Brass, Bronze & Cast Metal
  if (
    name.includes('brass') ||
    name.includes('bronze') ||
    name.includes('dhokra') ||
    name.includes('bell metal') ||
    name.includes('metal') ||
    name.includes('copper') ||
    name.includes('tamra') ||
    name.includes('iron') ||
    name.includes('alloy') ||
    name.includes('panchdhatu')
  ) {
    return {
      icon: '🪙',
      image: rawBrassMetalImg,
      category: 'Raw Brass & Metal',
      bgColor: 'bg-amber-50/80',
      borderColor: 'border-amber-300',
    };
  }

  // 7. Loose Craft Beads & Lac Resin
  if (
    name.includes('bead') ||
    name.includes('lac') ||
    name.includes('glass') ||
    name.includes('mirror') ||
    name.includes('shisha') ||
    name.includes('crystal')
  ) {
    return {
      icon: '📿',
      image: rawCraftBeadsImg,
      category: 'Loose Craft Beads & Lac',
      bgColor: 'bg-indigo-50/80',
      borderColor: 'border-indigo-200',
    };
  }

  // 8. Raw Cotton Thread & Spun Yarn
  if (
    name.includes('thread') ||
    name.includes('yarn') ||
    name.includes('cord') ||
    name.includes('string') ||
    name.includes('embroidery')
  ) {
    return {
      icon: '🧵',
      image: rawCottonThreadImg,
      category: 'Raw Spun Thread & Yarn',
      bgColor: 'bg-sky-50/80',
      borderColor: 'border-sky-200',
    };
  }

  // 9. Raw Cotton Fibers & Bolls
  if (
    name.includes('cotton') ||
    name.includes('khadi') ||
    name.includes('fabric') ||
    name.includes('cloth') ||
    name.includes('canvas') ||
    name.includes('linen')
  ) {
    return {
      icon: '☁️',
      image: rawCottonFibersImg,
      category: 'Raw Cotton Fibers',
      bgColor: 'bg-stone-50',
      borderColor: 'border-stone-200',
    };
  }

  // 10. Raw Silk Cocoons & Filaments
  if (
    name.includes('silk') ||
    name.includes('zari') ||
    name.includes('brocade') ||
    name.includes('chanderi') ||
    name.includes('tussar') ||
    name.includes('muga') ||
    name.includes('patola') ||
    name.includes('satin')
  ) {
    return {
      icon: '🪡',
      image: rawSilkCocoonsImg,
      category: 'Raw Silk Cocoons',
      bgColor: 'bg-purple-50/80',
      borderColor: 'border-purple-200',
    };
  }

  // 11. Raw Leather Hide
  if (
    name.includes('leather') ||
    name.includes('hide') ||
    name.includes('parchment') ||
    name.includes('suede')
  ) {
    return {
      icon: '👞',
      image: rawLeatherHideImg,
      category: 'Raw Leather Hide',
      bgColor: 'bg-stone-100',
      borderColor: 'border-amber-700/30',
    };
  }

  // 12. Carved Stone & Marble (high quality macro photographic fallback)
  if (
    name.includes('stone') ||
    name.includes('marble') ||
    name.includes('granite') ||
    name.includes('soapstone') ||
    name.includes('sandstone') ||
    name.includes('rock')
  ) {
    return {
      icon: '🪨',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
      category: 'Raw Natural Stone',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-300',
    };
  }

  // 13. Gold / Silver Foil (Warq)
  if (
    name.includes('gold') ||
    name.includes('silver') ||
    name.includes('warq') ||
    name.includes('foil') ||
    name.includes('leaf')
  ) {
    return {
      icon: '✨',
      image: rawBrassMetalImg,
      category: 'Raw Metal Foil / Leaf',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
    };
  }

  // Default organic craft material fallback
  return {
    icon: '✨',
    image: rawNaturalWoodImg,
    category: 'Natural Raw Material',
    bgColor: 'bg-stone-50',
    borderColor: 'border-stone-200',
  };
}

interface VisualMaterialGridProps {
  materials: string[];
  title?: string;
  subtitle?: string;
  showCategoryTag?: boolean;
  compact?: boolean;
}

export const VisualMaterialGrid: React.FC<VisualMaterialGridProps> = ({
  materials = [],
  title = 'Materials Used / उपयोग की गई सामग्री',
  subtitle = 'Pictorial breakdown detected by AI',
  showCategoryTag = true,
  compact = false,
}) => {
  if (!materials || materials.length === 0) return null;

  // Use 2-4 materials as detected by AI
  const displayMaterials = materials.slice(0, 4);

  return (
    <div className="space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#b84c28]" />
          <span className="text-xs sm:text-sm font-bold text-[#2B231D]">
            {title}
          </span>
        </div>
        {subtitle && (
          <span className="text-[11px] text-[#7A6E63] font-medium hidden sm:inline">
            {subtitle}
          </span>
        )}
      </div>

      {/* Grid of 2-4 Visual Material Cards */}
      <div
        className={`grid gap-2.5 ${
          displayMaterials.length === 1
            ? 'grid-cols-1 sm:grid-cols-2'
            : displayMaterials.length === 2
            ? 'grid-cols-2'
            : displayMaterials.length === 3
            ? 'grid-cols-2 sm:grid-cols-3'
            : 'grid-cols-2 sm:grid-cols-4'
        }`}
      >
        {displayMaterials.map((material, idx) => {
          const visual = getMaterialVisualInfo(material);

          return (
            <div
              key={`${material}-${idx}`}
              className={`rounded-2xl border-2 ${visual.borderColor} ${visual.bgColor} overflow-hidden shadow-2xs hover:shadow-xs transition flex flex-col justify-between`}
            >
              {/* Material Image / Visual Thumbnail with Fallback */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900/10">
                <img
                  src={visual.image}
                  alt={material}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to stylized icon container if image network fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Visual Icon Badge */}
                <div className="absolute top-2 left-2 w-7 h-7 rounded-xl bg-white/90 backdrop-blur-xs border border-black/10 shadow-xs flex items-center justify-center text-sm font-bold">
                  {visual.icon}
                </div>
              </div>

              {/* Material Name & Detail */}
              <div className="p-2.5 text-center space-y-0.5">
                <span className="text-xs sm:text-sm font-bold text-[#2B231D] block leading-tight line-clamp-1">
                  {material}
                </span>
                {showCategoryTag && (
                  <span className="text-[10px] text-[#7A6E63] block font-medium line-clamp-1">
                    {visual.category}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
