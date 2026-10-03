import React, { useState } from 'react';
import { X, Check, IndianRupee, Layers, Sparkles, Edit2 } from 'lucide-react';
import { ProductAnalysis, SupportedLanguage } from '../types';
import { UI_STRINGS } from '../translations';

interface EditProductModalProps {
  product: ProductAnalysis;
  currentLang: SupportedLanguage;
  onSave: (updatedProduct: ProductAnalysis) => void;
  onClose: () => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  currentLang,
  onSave,
  onClose,
}) => {
  const t = UI_STRINGS[currentLang];

  const [name, setName] = useState(product.title || product.name);
  const [category, setCategory] = useState(product.category);
  const [material, setMaterial] = useState(product.material || product.materials[0] || 'Bamboo');
  const [craftStyle, setCraftStyle] = useState(product.craftStyle);
  const [suggestedPriceINR, setSuggestedPriceINR] = useState(
    (product.price || product.suggestedPriceINR).toString()
  );
  const [minPriceINR, setMinPriceINR] = useState(product.priceRangeINR.min.toString());
  const [maxPriceINR, setMaxPriceINR] = useState(product.priceRangeINR.max.toString());
  const [priceExplanation, setPriceExplanation] = useState(product.priceExplanation || '');
  const [description, setDescription] = useState(product.description);
  const [materialsStr, setMaterialsStr] = useState(product.materials.join(', '));
  const [colorsStr, setColorsStr] = useState(product.colors.join(', '));
  const [targetCustomers, setTargetCustomers] = useState(product.targetCustomers);
  const [suitableMarket, setSuitableMarket] = useState(product.suitableMarket);
  const [tagsStr, setTagsStr] = useState(product.tags?.join(', ') || '');
  const [artisanName, setArtisanName] = useState(product.artisanName || product.artisan?.name || 'Rameshwar Das');
  const [artisanLocation, setArtisanLocation] = useState(product.artisanLocation || product.artisan?.location || 'Varanasi, Uttar Pradesh');
  
  const initialHighlights = product.highlights || product.sellingPoints || [];
  const [sp1, setSp1] = useState(initialHighlights[0] || 'Handwoven by skilled artisan');
  const [sp2, setSp2] = useState(initialHighlights[1] || 'Eco-friendly natural material');
  const [sp3, setSp3] = useState(initialHighlights[2] || 'Durable and lightweight');
  const [sp4, setSp4] = useState(initialHighlights[3] || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const highlightsList = [sp1.trim(), sp2.trim(), sp3.trim(), sp4.trim()].filter(Boolean);

    const priceNum = Number(suggestedPriceINR) || product.suggestedPriceINR;
    const updated: ProductAnalysis = {
      ...product,
      name: name.trim() || product.name,
      title: name.trim() || product.title || product.name,
      category: category.trim() || product.category,
      material: material.trim() || product.material || 'Natural Material',
      craftStyle: craftStyle.trim() || product.craftStyle,
      suggestedPriceINR: priceNum,
      price: priceNum,
      priceRangeINR: {
        min: Number(minPriceINR) || product.priceRangeINR.min,
        max: Number(maxPriceINR) || product.priceRangeINR.max,
      },
      priceExplanation: priceExplanation.trim() || product.priceExplanation,
      description: description.trim() || product.description,
      materials: materialsStr
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean),
      colors: colorsStr
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
      tags: tagsStr
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean),
      artisanName: artisanName.trim() || 'Rameshwar Das',
      artisanLocation: artisanLocation.trim() || 'Varanasi, Uttar Pradesh',
      artisan: {
        name: artisanName.trim() || 'Rameshwar Das',
        location: artisanLocation.trim() || 'Varanasi, Uttar Pradesh',
        contact: product.artisan?.contact || '+91 98765 43210',
      },
      targetCustomers: targetCustomers.trim() || product.targetCustomers,
      suitableMarket: suitableMarket.trim() || product.suitableMarket,
      sellingPoints: highlightsList.slice(0, 3),
      highlights: highlightsList,
    };

    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Edit2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">{t.editDetails}</h3>
              <p className="text-[11px] text-stone-500">Fine-tune product information</p>
            </div>
          </div>
          <button
            id="close-edit-modal-btn"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="p-4 space-y-3.5 overflow-y-auto flex-1 text-xs">
          {/* Product Name */}
          <div className="space-y-1">
            <label className="font-bold text-stone-700 block">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-stone-900"
              required
            />
          </div>

          {/* Pricing Row in ₹ */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-amber-900 block">Suggested (₹)</label>
              <input
                type="number"
                value={suggestedPriceINR}
                onChange={(e) => setSuggestedPriceINR(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-amber-300 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-stone-900"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">Min (₹)</label>
              <input
                type="number"
                value={minPriceINR}
                onChange={(e) => setMinPriceINR(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">Max (₹)</label>
              <input
                type="number"
                value={maxPriceINR}
                onChange={(e) => setMaxPriceINR(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
              />
            </div>
          </div>

          {/* Craft Style & Category */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">Craft Style</label>
              <input
                type="text"
                value={craftStyle}
                onChange={(e) => setCraftStyle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Handicrafts → Home Decor"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
              />
            </div>
          </div>

          {/* Primary Material */}
          <div className="space-y-1">
            <label className="font-bold text-stone-700 block">Primary Material</label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="e.g. Bamboo, Brass, Terracotta Clay"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
            />
          </div>

          {/* Price Explanation */}
          <div className="space-y-1">
            <label className="font-bold text-amber-900 block">Price Explanation / Rationale</label>
            <textarea
              rows={2}
              value={priceExplanation}
              onChange={(e) => setPriceExplanation(e.target.value)}
              placeholder="Explain how price was calculated (e.g. hours of handweaving, materials, and fair-trade benchmark)"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-bold text-stone-700 block">Description / Story</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
            />
          </div>

          {/* Materials & Colors */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">All Raw Materials (comma separated)</label>
              <input
                type="text"
                value={materialsStr}
                onChange={(e) => setMaterialsStr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">Colors (comma separated)</label>
              <input
                type="text"
                value={colorsStr}
                onChange={(e) => setColorsStr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
              />
            </div>
          </div>

          {/* Product Highlights (3-5 bullet points) */}
          <div className="space-y-1.5 pt-1">
            <label className="font-bold text-amber-900 block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Product Highlights (Bullet Points)</span>
            </label>
            <input
              type="text"
              value={sp1}
              onChange={(e) => setSp1(e.target.value)}
              placeholder="Highlight 1 (e.g. Handwoven)"
              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-stone-900"
            />
            <input
              type="text"
              value={sp2}
              onChange={(e) => setSp2(e.target.value)}
              placeholder="Highlight 2 (e.g. Eco-friendly bamboo)"
              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-stone-900"
            />
            <input
              type="text"
              value={sp3}
              onChange={(e) => setSp3(e.target.value)}
              placeholder="Highlight 3 (e.g. Handmade by local artisan)"
              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-stone-900"
            />
            <input
              type="text"
              value={sp4}
              onChange={(e) => setSp4(e.target.value)}
              placeholder="Highlight 4 (e.g. Lightweight and durable)"
              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-stone-900"
            />
          </div>

          {/* Artisan Name & Location */}
          <div className="grid grid-cols-2 gap-2 bg-[#FAF7F2] p-2.5 rounded-xl border border-stone-200">
            <div className="space-y-1">
              <label className="font-bold text-[#b84c28] block">Artisan Name</label>
              <input
                type="text"
                value={artisanName}
                onChange={(e) => setArtisanName(e.target.value)}
                placeholder="e.g. Rameshwar Das"
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#b84c28] text-stone-900 bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#b84c28] block">Artisan Location</label>
              <input
                type="text"
                value={artisanLocation}
                onChange={(e) => setArtisanLocation(e.target.value)}
                placeholder="e.g. Varanasi, UP"
                className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#b84c28] text-stone-900 bg-white"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <label className="font-bold text-stone-700 block">Tags & Keywords (comma separated)</label>
            <input
              type="text"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              placeholder="terracotta, handmade, clayplanter, homedecor"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
            />
          </div>

          {/* Suitable Market */}
          <div className="space-y-1">
            <label className="font-bold text-stone-700 block">Market Fit</label>
            <input
              type="text"
              value={suitableMarket}
              onChange={(e) => setSuitableMarket(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex gap-2 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100"
            >
              {t.cancel}
            </button>
            <button
              id="save-modal-changes-btn"
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>{t.saveChanges}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
