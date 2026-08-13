import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Sparkles, MapPin, Receipt, PhoneCall, ChevronDown, Tag, Gift, Flame, Utensils, Ticket } from 'lucide-react';
import { CATEGORY_ITEMS } from '../data/mockData';

interface HeaderProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  cartCount: number;
  openCart: () => void;
  favoritesCount: number;
  openFavorites: () => void;
  openOrders: () => void;
  openAiAssistant: () => void;
  activeCity: string;
  setActiveCity: (city: '全區' | '東京' | '大阪' | '京都' | '北海道' | '福岡') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  cartCount,
  openCart,
  favoritesCount,
  openFavorites,
  openOrders,
  openAiAssistant,
  activeCity,
  setActiveCity
}) => {
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const cities: Array<'全區' | '東京' | '大阪' | '京都' | '北海道' | '福岡'> = [
    '全區', '東京', '大阪', '京都', '北海道', '福岡'
  ];

  const quickSearchTags = ['敘敘苑晴空塔', 'A5和牛', '王品1000元餐券', '夏慕尼', '帝王蟹放題', '加賀屋泡湯'];

  return (
    <header className="sticky top-0 z-40 bg-[#0D0D0F] shadow-2xl border-b border-[#22222A]">
      {/* Top Corporate Perk Announcement Banner */}
      <div className="bg-[#141418] text-[#AAA] px-4 py-1.5 text-xs border-b border-[#1E1E26]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2.5">
            <span className="bg-red-600 text-white font-mono font-black px-2 py-0.5 text-[10px] tracking-[0.2em] uppercase">
              3TGDS_SYSTEM
            </span>
            <span className="text-[#CCC] text-xs font-medium">
              三竹福利網・饗樂特區 | 結帳輸入折扣碼 <code className="bg-white text-black font-mono font-extrabold px-1.5 py-0.5 text-[11px]">3TGDS85</code> 享全館 <span className="text-red-500 font-bold">85折</span> 專屬優惠
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#777] font-mono text-[11px]">
            <button 
              onClick={openOrders}
              className="hover:text-white transition flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <Receipt className="w-3.5 h-3.5 text-red-500" />
              <span>我的預約與紙本票券</span>
            </button>
            <span className="text-[#333]">|</span>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-500" />
              <span>(02) 2500-1234</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-red-600 text-white font-black text-xl flex items-center justify-center tracking-tighter group-hover:bg-white group-hover:text-black transition-colors">
                3T
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-white text-xl tracking-tighter uppercase italic">
                    3TGDS <span className="text-red-600 not-italic">福利網</span>
                  </span>
                  <span className="bg-[#1A1A22] text-red-500 text-[10px] font-mono font-bold px-2 py-0.5 border border-red-600/30">
                    AX_04
                  </span>
                </div>
                <p className="text-[10px] text-[#777] font-mono uppercase tracking-[0.2em] -mt-0.5">
                  EPICUREAN_RESERVE / 日本名店預約 & 紙本票券
                </p>
              </div>
            </a>
          </div>

          {/* Search Bar with Autocomplete & Region Dropdown */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full flex items-center bg-[#15151A] rounded-none border border-[#2A2A35] focus-within:border-red-600 focus-within:bg-[#1A1A22] transition-all">
              
              {/* Region Selector */}
              <div className="relative border-r border-[#2A2A35]">
                <button
                  type="button"
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-bold text-white hover:text-red-500 cursor-pointer uppercase tracking-wider"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{activeCity}</span>
                  <ChevronDown className="w-3 h-3 text-[#666]" />
                </button>

                {showCityDropdown && (
                  <div className="absolute left-0 top-full mt-1 w-36 bg-[#121216] border border-[#2A2A35] shadow-2xl py-1 z-50">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setActiveCity(city);
                          setShowCityDropdown(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-mono font-bold uppercase transition ${
                          activeCity === city ? 'text-white bg-red-600' : 'text-[#888] hover:bg-[#1C1C24] hover:text-white'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Search className="w-4 h-4 text-[#555] ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋日本餐廳、A5和牛、王品餐券、夏慕尼、溫泉..."
                className="w-full px-3 py-2 text-xs text-white bg-transparent focus:outline-none placeholder:text-[#555] font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mr-3 text-[#666] hover:text-white text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Assistant Button */}
            <button
              onClick={openAiAssistant}
              className="flex items-center gap-2 px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline font-mono">AI 美食隨從</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={openFavorites}
              className="relative p-2.5 text-[#AAA] hover:text-white bg-[#15151A] hover:bg-red-600 transition cursor-pointer border border-[#2A2A35]"
              title="收藏清單"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-mono font-bold w-4 h-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-white text-black hover:bg-red-600 hover:text-white transition cursor-pointer font-mono font-black text-xs uppercase"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">福利餐車</span>
              <span className="bg-black text-white px-1.5 py-0.2 text-[11px] font-mono font-bold">
                {cartCount}
              </span>
            </button>

            {/* User Orders Portal Trigger */}
            <button
              onClick={openOrders}
              className="p-2.5 text-[#AAA] hover:text-white bg-[#15151A] hover:bg-[#22222B] transition cursor-pointer border border-[#2A2A35]"
              title="我的福利訂單"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Search Tag Ribbon */}
        <div className="hidden md:flex items-center gap-2 mt-2 pt-1 text-[11px] text-[#666] font-mono">
          <span className="font-bold text-red-500 flex items-center gap-1 uppercase tracking-widest text-[10px]">
            <Tag className="w-3 h-3 text-red-500" />
            HOT_TAGS //
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="bg-[#15151A] hover:bg-red-600 hover:text-white text-[#AAA] px-2.5 py-0.5 border border-[#262630] transition cursor-pointer text-[10px] uppercase font-mono tracking-wider whitespace-nowrap"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub Header Category Navigation Bar */}
      <div className="bg-[#0A0A0C] border-t border-[#22222A]">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 py-2 min-w-max">
            {CATEGORY_ITEMS.map((cat) => {
              const isActive = activeCategory === cat.name || (cat.name === '全部商品' && activeCategory === 'all');
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name === '全部商品' ? 'all' : cat.name)}
                  className={`flex items-center gap-2 px-4 py-1.5 text-xs font-mono font-bold uppercase transition cursor-pointer border ${
                    isActive
                      ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-950/40'
                      : 'text-[#888] bg-[#121216] border-[#22222A] hover:text-white hover:bg-[#1A1A22]'
                  }`}
                >
                  {cat.name === '全部商品' && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  {cat.name === '燒肉和牛' && <Flame className="w-3.5 h-3.5 text-red-400" />}
                  {cat.name === '壽司割烹' && <Utensils className="w-3.5 h-3.5 text-cyan-400" />}
                  {cat.name === '紙本票券' && <Ticket className="w-3.5 h-3.5 text-emerald-400" />}
                  {cat.name === '王品專區' && <Gift className="w-3.5 h-3.5 text-rose-400" />}
                  <span>{cat.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 ${isActive ? 'bg-black text-white' : 'bg-[#1E1E26] text-[#777]'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
