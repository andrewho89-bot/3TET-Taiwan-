import React from 'react';
import { Ticket, Truck, ShieldCheck, Heart, Sparkles, ChevronRight } from 'lucide-react';
import { Voucher } from '../types';

interface VoucherCardProps {
  voucher: Voucher;
  onSelect: (voucher: Voucher) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const VoucherCard: React.FC<VoucherCardProps> = ({
  voucher,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="group bg-[#121216] border border-[#22222A] hover:border-amber-500 transition-all duration-300 flex flex-col overflow-hidden relative shadow-xl">
      {/* Top Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-[#0A0A0C]">
        <img
          src={voucher.imageUrl}
          alt={voucher.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110"
        />
        
        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-[#0A0A0C]/70" />

        {/* Paper Ticket Badge & Discount Tag */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10 font-mono">
          <span className="bg-amber-400 text-black text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 flex items-center gap-1">
            <Ticket className="w-3 h-3 text-black" />
            實體紙本票券
          </span>
          <span className="bg-red-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5">
            {voucher.discountRate}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(voucher.id, e)}
          className={`absolute top-3 right-3 p-2 transition z-10 cursor-pointer ${
            isFavorite
              ? 'bg-red-600 text-white'
              : 'bg-[#0A0A0C]/80 text-white hover:bg-red-600 border border-[#333]'
          }`}
          title={isFavorite ? '取消收藏' : '加入收藏'}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Stock & Delivery Tag Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10 font-mono">
          <div className="flex items-center gap-1 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>{voucher.deliveryEstimate}</span>
          </div>
          <span className="bg-black/90 text-[#AAA] px-2 py-0.5 text-[10px] font-bold border border-[#333]">
            熱銷 {voucher.soldCount.toLocaleString()} 張
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand Tag */}
          <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em] bg-[#1C1C24] border border-[#2A2A35] px-2 py-0.5 inline-block">
            {voucher.brand}
          </span>

          {/* Title */}
          <h3 className="text-sm font-black text-white mt-2 line-clamp-2 leading-snug group-hover:text-amber-400 transition tracking-tight">
            {voucher.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#AAA] mt-2 line-clamp-2 leading-relaxed">
            {voucher.description}
          </p>

          {/* Key Highlights */}
          <div className="mt-3 space-y-1 font-mono text-[11px]">
            {voucher.highlights.slice(0, 2).map((hl, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[#888]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Buy Action Button */}
        <div className="pt-3 border-t border-[#22222A] flex items-center justify-between">
          <div>
            <span className="text-[9px] text-[#666] font-mono uppercase tracking-widest block">特惠面額價</span>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-lg font-black text-red-500 tracking-tighter">
                NT$ {voucher.priceTwd.toLocaleString()}
              </span>
              <span className="text-xs text-[#555] line-through font-normal">
                NT$ {voucher.originalPriceTwd.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => onSelect(voucher)}
            className="bg-white hover:bg-amber-400 text-black hover:text-black font-mono font-black text-xs uppercase px-3.5 py-2 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>搶購餐券</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
