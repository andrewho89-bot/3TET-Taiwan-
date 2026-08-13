import React from 'react';
import { Star, MapPin, Heart, Clock, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="group bg-[#121216] border border-[#22222A] hover:border-red-600 transition-all duration-300 flex flex-col overflow-hidden relative shadow-xl">
      {/* Top Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-[#0A0A0C]">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110"
        />
        
        {/* Dark gradient shadow at top & bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-[#0A0A0C]/70" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10 font-mono">
          <span className="bg-red-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {restaurant.tag}
          </span>
          {restaurant.discountTag && (
            <span className="bg-white text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5">
              {restaurant.discountTag}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(restaurant.id, e)}
          className={`absolute top-3 right-3 p-2 transition z-10 cursor-pointer ${
            isFavorite
              ? 'bg-red-600 text-white'
              : 'bg-[#0A0A0C]/80 text-white hover:bg-red-600 border border-[#333]'
          }`}
          title={isFavorite ? '取消收藏' : '加入收藏'}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Location & City Tag Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10 font-mono">
          <div className="flex items-center gap-1 font-bold text-[#DDD] text-[11px] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>{restaurant.city} // {restaurant.area}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/90 px-2 py-0.5 text-[11px] font-bold text-amber-400 border border-[#333]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{restaurant.rating}</span>
            <span className="text-[#777] text-[10px]">({restaurant.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category Pill */}
          <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-[0.2em] bg-[#1C1C24] border border-[#2A2A35] px-2 py-0.5 inline-block">
            {restaurant.category}
          </span>

          {/* Restaurant Title & Japanese Name */}
          <h3 className="text-base font-black text-white mt-2 line-clamp-1 group-hover:text-red-500 transition tracking-tight">
            {restaurant.name}
          </h3>
          {restaurant.nameJp && (
            <p className="text-[10px] text-[#777] font-mono line-clamp-1 uppercase tracking-wider">
              {restaurant.nameJp}
            </p>
          )}

          {/* Brief Description */}
          <p className="text-xs text-[#AAA] mt-2 line-clamp-2 leading-relaxed">
            {restaurant.description}
          </p>

          {/* Key Perks List */}
          <div className="mt-3 space-y-1 font-mono text-[11px]">
            {restaurant.perks.slice(0, 2).map((perk, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[#888]">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="truncate">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer: Price & Booking Action Button */}
        <div className="pt-3 border-t border-[#22222A] flex items-center justify-between">
          <div>
            <span className="text-[9px] text-[#666] font-mono uppercase tracking-widest block">預約體驗價</span>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-base font-black text-white tracking-tighter">
                {restaurant.priceRange.split(' - ')[0]}
              </span>
              {restaurant.originalPriceTwd && (
                <span className="text-xs text-[#555] line-through font-normal">
                  NT$ {restaurant.originalPriceTwd.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => onSelect(restaurant)}
            className="bg-white hover:bg-red-600 text-black hover:text-white font-mono font-black text-xs uppercase px-3.5 py-2 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>立即預約</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
