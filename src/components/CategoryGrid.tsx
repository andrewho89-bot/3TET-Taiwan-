import React from 'react';
import { Utensils, Hotel, FerrisWheel, Bath, Compass, Sparkles, Ticket, Flame } from 'lucide-react';

interface CategoryGridProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const categories = [
    { id: '燒肉和牛', title: '美食餐飲', titleJp: 'Dining', icon: Utensils, color: 'from-amber-500 to-red-600', count: '精選日本極上燒肉與頂級割烹' },
    { id: '溫泉泡湯', title: '飯店住宿', titleJp: 'Stay & Onsen', icon: Hotel, color: 'from-blue-600 to-indigo-700', count: '奢華日式溫泉名宿與高空飯店' },
    { id: '全區', title: '主題樂園', titleJp: 'Parks', icon: FerrisWheel, color: 'from-purple-600 to-pink-600', count: '東京迪士尼樂園與環球影城票券' },
    { id: '溫泉泡湯', title: '溫泉泡湯', titleJp: 'Onsen', icon: Bath, color: 'from-cyan-600 to-blue-700', count: '加賀屋與箱根日勝生白磺大眾湯' },
    { id: '全區', title: '旅遊體驗', titleJp: 'Travel', icon: Compass, color: 'from-emerald-600 to-teal-700', count: '包車深度遊與景點一日遊預約' },
    { id: '紙本票券', title: '舒壓 SPA', titleJp: 'Spa & Wellness', icon: Sparkles, color: 'from-rose-500 to-pink-600', count: '飯店級芳療SPA與足體舒壓券' },
    { id: '紙本票券', title: '紙本票券', titleJp: 'Vouchers', icon: Ticket, color: 'from-orange-500 to-amber-600', count: '王品餐券・夏慕尼・饗食天堂現貨' },
    { id: '壽司割烹', title: '日式料理', titleJp: 'Japanese Cuisine', icon: Flame, color: 'from-red-600 to-rose-700', count: '壽司之神・米其林二星天婦羅' },
  ];

  return (
    <section className="py-8 bg-[#0D0D0F] border-b border-[#22222A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.4em] font-bold text-red-500 block mb-1">
              SYSTEM_NAVIGATION //
            </span>
            <h2 className="text-xl font-black text-white tracking-tight uppercase flex items-center gap-2">
              <span className="w-2 h-5 bg-red-600 inline-block"></span>
              類別導覽 <span className="text-red-600 italic">CATEGORIES</span>
            </h2>
          </div>
          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs font-mono font-bold text-[#888] hover:text-white uppercase tracking-wider transition cursor-pointer flex items-center gap-1"
          >
            <span>VIEW_ALL_CATALOG</span>
            <span className="text-red-500 font-bold">&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((item, index) => {
            const IconComponent = item.icon;
            const isSelected = activeCategory === item.id;
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(item.id)}
                className={`group flex flex-col items-center p-3.5 bg-[#121216] border transition-all cursor-pointer ${
                  isSelected ? 'border-red-600 bg-[#1A1A22] shadow-lg shadow-red-950/30' : 'border-[#22222A] hover:border-red-600 hover:bg-[#181820]'
                }`}
              >
                <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center font-bold group-hover:bg-white group-hover:text-black transition-colors mb-2">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-black text-white group-hover:text-red-500 transition tracking-tight">
                  {item.title}
                </span>
                <span className="text-[9px] text-[#666] font-mono uppercase tracking-wider font-bold mt-0.5">
                  {item.titleJp}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
