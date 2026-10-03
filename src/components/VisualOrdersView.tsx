import React, { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Volume2,
  VolumeX,
  IndianRupee,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { ArtisanOrder, SupportedLanguage } from '../types';
import { UI_STRINGS } from '../translations';
import { speakText, stopSpeech } from '../utils/speech';

interface VisualOrdersViewProps {
  orders: ArtisanOrder[];
  currentLang: SupportedLanguage;
  onUpdateOrderStatus: (orderId: string, newStatus: 'received' | 'shipped' | 'delivered') => void;
  onOpenScanner: () => void;
}

export const VisualOrdersView: React.FC<VisualOrdersViewProps> = ({
  orders,
  currentLang,
  onUpdateOrderStatus,
  onOpenScanner,
}) => {
  const t = UI_STRINGS[currentLang];
  const [playingOrderId, setPlayingOrderId] = useState<string | null>(null);

  const handleSpeakOrder = (order: ArtisanOrder) => {
    if (playingOrderId === order.id) {
      stopSpeech();
      setPlayingOrderId(null);
      return;
    }

    let statusLabel = '';
    if (order.status === 'received') {
      statusLabel = currentLang === 'hi' ? 'ऑर्डर प्राप्त हुआ' : currentLang === 'te' ? 'ఆర్డర్ వచ్చింది' : currentLang === 'ta' ? 'ஆர்டர் பெறப்பட்டது' : 'Order Received';
    } else if (order.status === 'shipped') {
      statusLabel = currentLang === 'hi' ? 'सामान भेज दिया गया है' : currentLang === 'te' ? 'వస్తువు పంపబడింది' : currentLang === 'ta' ? 'அனுப்பப்பட்டது' : 'Order Shipped';
    } else {
      statusLabel = currentLang === 'hi' ? 'ग्राहक तक पहुंच गया' : currentLang === 'te' ? 'చేరింది' : currentLang === 'ta' ? 'சேர்க்கப்பட்டது' : 'Delivered successfully';
    }

    let speech = '';
    if (currentLang === 'hi') {
      speech = `ऑर्डर विवरण: शिल्प ${order.productName}। ग्राहक ${order.customerName}, शहर ${order.customerCity}। कुल राशि ₹${order.price} रुपये। वर्तमान स्थिति: ${statusLabel}।`;
    } else if (currentLang === 'te') {
      speech = `ఆర్డర్ వివరాలు: వస్తువు ${order.productName}. కొనుగోలుదారు ${order.customerName}, ${order.customerCity}. మొత్తం ధర ₹${order.price} రూపాయలు. ప్రస్తుత స్థితి: ${statusLabel}.`;
    } else if (currentLang === 'ta') {
      speech = `ஆர்டர் விவரங்கள்: ${order.productName}. வாடிக்கையாளர் ${order.customerName}, ${order.customerCity}. விலை ₹${order.price} ரூபாய். நிலை: ${statusLabel}.`;
    } else {
      speech = `Order for ${order.productName}. Buyer ${order.customerName} in ${order.customerCity}. Total value ${order.price} Indian Rupees. Status: ${statusLabel}.`;
    }

    setPlayingOrderId(order.id);
    speakText(
      speech,
      currentLang,
      () => setPlayingOrderId(order.id),
      () => setPlayingOrderId(null)
    );
  };

  const getStepIndex = (status: 'received' | 'shipped' | 'delivered') => {
    switch (status) {
      case 'received':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 1;
    }
  };

  const totalDeliveredSum = orders
    .filter((o) => o.status === 'delivered')
    .reduce((acc, curr) => acc + curr.price, 0);

  const pendingShipmentCount = orders.filter((o) => o.status === 'received').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E8E2D6] shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-sm text-2xl shrink-0">
            📦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2B231D]">
                {t.actionOrders} ({orders.length})
              </h1>
              {pendingShipmentCount > 0 && (
                <span className="text-[11px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                  {pendingShipmentCount} Action Needed
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#7A6E63]">
              Simple pictorial tracking: 📦 Order → 🚚 Shipped → 🏠 Delivered
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenScanner}
          className="py-3 px-5 bg-[#b84c28] hover:bg-[#a23f1e] text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ Add New Craft</span>
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const step = getStepIndex(order.status);
          const isPlaying = playingOrderId === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E2D6] shadow-xs space-y-4 hover:border-amber-400 transition"
            >
              {/* Top Order Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={order.imageUrl}
                    alt={order.productName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#E8E2D6] shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-[#FAF7F2] text-[#7A6E63] px-2 py-0.5 rounded-md border border-[#E8E2D6]">
                      {order.id} • {order.orderDate}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#2B231D]">
                      {order.productName}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-[#7A6E63] flex-wrap">
                      <span className="flex items-center gap-1 font-semibold text-stone-800">
                        👤 {order.customerName}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{order.customerCity}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Audio Button */}
                <div className="flex items-center sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                  <div className="text-right">
                    <span className="text-xs text-[#7A6E63] block">Amount Earned</span>
                    <span className="text-2xl font-serif font-bold text-[#204E36]">
                      ₹{order.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSpeakOrder(order)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      isPlaying
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-[#FAF7F2] text-stone-700 hover:bg-stone-200 border border-[#E8E2D6]'
                    }`}
                  >
                    {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-700" />}
                    <span>{isPlaying ? 'Stop' : '🔊 Hear Status'}</span>
                  </button>
                </div>
              </div>

              {/* Pictorial 3-Step Tracker Progress */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D6]">
                <div className="grid grid-cols-3 gap-2 text-center relative">
                  {/* Step 1: Received */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-transform ${
                        step >= 1
                          ? 'bg-amber-500 text-white shadow-sm scale-105'
                          : 'bg-stone-200 text-stone-400'
                      }`}
                    >
                      📦
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        step >= 1 ? 'text-[#2B231D]' : 'text-stone-400'
                      }`}
                    >
                      1. {t.orderStepReceived}
                    </span>
                  </div>

                  {/* Step 2: Shipped */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-transform ${
                        step >= 2
                          ? 'bg-blue-600 text-white shadow-sm scale-105'
                          : 'bg-stone-200 text-stone-400'
                      }`}
                    >
                      🚚
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        step >= 2 ? 'text-blue-900' : 'text-stone-400'
                      }`}
                    >
                      2. {t.orderStepShipped}
                    </span>
                  </div>

                  {/* Step 3: Delivered */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-transform ${
                        step >= 3
                          ? 'bg-emerald-600 text-white shadow-sm scale-105'
                          : 'bg-stone-200 text-stone-400'
                      }`}
                    >
                      ✅
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        step >= 3 ? 'text-emerald-900' : 'text-stone-400'
                      }`}
                    >
                      3. {t.orderStepDelivered}
                    </span>
                  </div>
                </div>

                {/* 1-Tap Status Advance Button */}
                <div className="mt-4 pt-3 border-t border-[#E8E2D6] flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] text-[#7A6E63] flex items-center gap-1 font-mono">
                    Tracking: <strong>{order.trackingNumber || 'IND-POST-8812'}</strong>
                  </span>

                  {order.status === 'received' && (
                    <button
                      type="button"
                      onClick={() => onUpdateOrderStatus(order.id, 'shipped')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95"
                    >
                      <span>🚚 Tap to Mark as Shipped</span>
                    </button>
                  )}

                  {order.status === 'shipped' && (
                    <button
                      type="button"
                      onClick={() => onUpdateOrderStatus(order.id, 'delivered')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95"
                    >
                      <span>✅ Tap to Mark as Delivered</span>
                    </button>
                  )}

                  {order.status === 'delivered' && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Payment Completed to Bank ✓</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
