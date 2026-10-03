import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';
import { TrendingUp, Calendar, IndianRupee, Tag, Info, Sparkles } from 'lucide-react';
import { ProductAnalysis, SupportedLanguage } from '../types';

interface PricingTrendChartProps {
  catalog: ProductAnalysis[];
  currentLang?: SupportedLanguage;
}

interface TrendDataPoint {
  period: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  itemCount: number;
  sampleName?: string;
}

export const PricingTrendChart: React.FC<PricingTrendChartProps> = ({
  catalog,
  currentLang = 'en',
}) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'items'>('monthly');

  // Compute trend data based on catalog items or baseline historical craft index
  const { chartData, overallAverage, minVal, maxVal, growthPercent } = useMemo(() => {
    // Default baseline monthly trend points (reflecting Indian handicraft valuation index)
    const baselineMonthly: TrendDataPoint[] = [
      { period: 'Mar 2026', avgPrice: 650, minPrice: 450, maxPrice: 850, itemCount: 1 },
      { period: 'Apr 2026', avgPrice: 780, minPrice: 500, maxPrice: 950, itemCount: 2 },
      { period: 'May 2026', avgPrice: 890, minPrice: 600, maxPrice: 1200, itemCount: 3 },
      { period: 'Jun 2026', avgPrice: 1050, minPrice: 680, maxPrice: 1450, itemCount: 4 },
      { period: 'Jul 2026', avgPrice: 1180, minPrice: 750, maxPrice: 1650, itemCount: 5 },
      { period: 'Aug 2026', avgPrice: 1320, minPrice: 850, maxPrice: 1850, itemCount: 6 },
    ];

    if (!catalog || catalog.length === 0) {
      const avg = Math.round(
        baselineMonthly.reduce((sum, d) => sum + d.avgPrice, 0) / baselineMonthly.length
      );
      const first = baselineMonthly[0].avgPrice;
      const last = baselineMonthly[baselineMonthly.length - 1].avgPrice;
      const growth = Math.round(((last - first) / first) * 100);

      return {
        chartData: baselineMonthly,
        overallAverage: avg,
        minVal: 450,
        maxVal: 1850,
        growthPercent: growth,
      };
    }

    if (viewMode === 'items' || catalog.length <= 4) {
      // Individual item pricing sequence
      const itemPoints: TrendDataPoint[] = catalog.map((item, index) => {
        let dateLabel = `Item #${index + 1}`;
        if (item.scannedAt) {
          try {
            const d = new Date(item.scannedAt);
            if (!isNaN(d.getTime())) {
              dateLabel = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
            }
          } catch {
            dateLabel = `Item #${index + 1}`;
          }
        }

        const price = item.suggestedPriceINR || 500;
        const minP = item.priceRangeINR?.min || Math.round(price * 0.85);
        const maxP = item.priceRangeINR?.max || Math.round(price * 1.2);

        return {
          period: dateLabel,
          avgPrice: price,
          minPrice: minP,
          maxPrice: maxP,
          itemCount: 1,
          sampleName: item.name,
        };
      });

      const prices = itemPoints.map((p) => p.avgPrice);
      const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const first = prices[0];
      const last = prices[prices.length - 1];
      const growth = first > 0 ? Math.round(((last - first) / first) * 100) : 0;

      return {
        chartData: itemPoints,
        overallAverage: avg,
        minVal: min,
        maxVal: max,
        growthPercent: growth,
      };
    }

    // Group catalog by month
    const groups: { [key: string]: { prices: number[]; mins: number[]; maxs: number[]; count: number } } = {};

    catalog.forEach((item) => {
      let monthKey = 'Aug 2026';
      if (item.scannedAt) {
        try {
          const d = new Date(item.scannedAt);
          if (!isNaN(d.getTime())) {
            monthKey = d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
          }
        } catch {
          monthKey = 'Aug 2026';
        }
      }

      if (!groups[monthKey]) {
        groups[monthKey] = { prices: [], mins: [], maxs: [], count: 0 };
      }

      const p = item.suggestedPriceINR || 600;
      groups[monthKey].prices.push(p);
      groups[monthKey].mins.push(item.priceRangeINR?.min || Math.round(p * 0.85));
      groups[monthKey].maxs.push(item.priceRangeINR?.max || Math.round(p * 1.2));
      groups[monthKey].count += 1;
    });

    const monthlyPoints: TrendDataPoint[] = Object.entries(groups).map(([month, data]) => {
      const avg = Math.round(data.prices.reduce((a, b) => a + b, 0) / data.prices.length);
      const minP = Math.min(...data.mins);
      const maxP = Math.max(...data.maxs);
      return {
        period: month,
        avgPrice: avg,
        minPrice: minP,
        maxPrice: maxP,
        itemCount: data.count,
      };
    });

    const prices = monthlyPoints.map((p) => p.avgPrice);
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const first = prices[0] || avg;
    const last = prices[prices.length - 1] || avg;
    const growth = first > 0 ? Math.round(((last - first) / first) * 100) : 0;

    return {
      chartData: monthlyPoints,
      overallAverage: avg,
      minVal: min,
      maxVal: max,
      growthPercent: growth,
    };
  }, [catalog, viewMode]);

  // Custom Tooltip Component for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: TrendDataPoint = payload[0].payload;
      return (
        <div className="bg-[#2B231D] text-white p-3 rounded-xl shadow-xl border border-amber-500/30 text-xs space-y-1.5 min-w-[180px]">
          <div className="flex items-center justify-between border-b border-stone-700 pb-1">
            <span className="font-bold text-amber-300">{label}</span>
            {data.itemCount > 1 && (
              <span className="text-[10px] bg-stone-800 text-stone-300 px-1.5 py-0.5 rounded">
                {data.itemCount} items
              </span>
            )}
          </div>

          {data.sampleName && (
            <p className="text-[11px] text-stone-300 truncate max-w-[200px]">
              {data.sampleName}
            </p>
          )}

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-stone-400">Avg Suggested:</span>
            <span className="font-serif font-black text-amber-400 text-sm">
              ₹{data.avgPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-stone-400">
            <span>Fair Range:</span>
            <span>
              ₹{data.minPrice} - ₹{data.maxPrice}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="pricing-trend-widget"
      className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8E2D6] shadow-xs space-y-5"
    >
      {/* Widget Header & Metric Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#b84c28] border border-[#E8E2D6] flex items-center justify-center shadow-2xs">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#2B231D]">
                Average Suggested Pricing Trend
              </h2>
              <p className="text-xs text-[#7A6E63]">
                AI-calculated fair valuation trajectory for cataloged handicrafts
              </p>
            </div>
          </div>
        </div>

        {/* View Toggle & Summary Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-[#FAF7F2] p-1 rounded-xl border border-[#E8E2D6] flex items-center gap-1 text-xs">
            <button
              type="button"
              id="trend-view-monthly-btn"
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === 'monthly'
                  ? 'bg-white text-[#2B231D] shadow-xs'
                  : 'text-[#7A6E63] hover:text-[#2B231D]'
              }`}
            >
              Timeline
            </button>
            <button
              type="button"
              id="trend-view-items-btn"
              onClick={() => setViewMode('items')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === 'items'
                  ? 'bg-white text-[#2B231D] shadow-xs'
                  : 'text-[#7A6E63] hover:text-[#2B231D]'
              }`}
            >
              By Item
            </button>
          </div>
        </div>
      </div>

      {/* Metric Highlights Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8E2D6]">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-[#7A6E63] uppercase tracking-wider block">
            Overall Average Price
          </span>
          <span className="text-lg sm:text-xl font-serif font-black text-[#2B231D]">
            ₹{overallAverage.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-[#7A6E63] uppercase tracking-wider block">
            Price Trajectory
          </span>
          <span
            className={`text-lg sm:text-xl font-serif font-black flex items-center gap-1 ${
              growthPercent >= 0 ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {growthPercent >= 0 ? `+${growthPercent}%` : `${growthPercent}%`}
            <TrendingUp className="w-4 h-4 inline shrink-0" />
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-[#7A6E63] uppercase tracking-wider block">
            Min Valuation
          </span>
          <span className="text-lg sm:text-xl font-serif font-bold text-stone-700">
            ₹{minVal.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-[#7A6E63] uppercase tracking-wider block">
            Max Valuation
          </span>
          <span className="text-lg sm:text-xl font-serif font-bold text-[#b84c28]">
            ₹{maxVal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Recharts Line Chart Container */}
      <div className="w-full h-72 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 15, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="priceLineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b84c28" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#b84c28" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EFE7DC" vertical={false} />
            <XAxis
              dataKey="period"
              stroke="#8C7E72"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E8E2D6' }}
              dy={8}
            />
            <YAxis
              stroke="#8C7E72"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E8E2D6' }}
              tickFormatter={(val) => `₹${val}`}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="avgPrice"
              name="Avg Suggested Price"
              stroke="#b84c28"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: '#FAF7F2',
                stroke: '#b84c28',
                strokeWidth: 2.5,
              }}
              activeDot={{
                r: 7,
                fill: '#b84c28',
                stroke: '#FAF7F2',
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Subtext info footer */}
      <div className="flex items-center justify-between text-xs text-[#7A6E63] pt-2 border-t border-[#E8E2D6]/70">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#b84c28]" />
          <span>Calculated using KarigarX Vision fair market pricing model (GI Craft Index)</span>
        </span>
        <span className="font-semibold text-stone-600">
          {catalog.length} items logged
        </span>
      </div>
    </div>
  );
};
