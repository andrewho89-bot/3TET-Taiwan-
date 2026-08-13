import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Ticket, ArrowRight, ShieldCheck, Sparkles, MapPin, Gift } from 'lucide-react';

interface HeroCarouselProps {
  onExploreReservations: () => void;
  onExploreVouchers: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onExploreReservations,
  onExploreVouchers,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: '東京特快・保證席次',
      title: '東京名店・究極饗宴',
      subtitle: 'TOKYO PREMIUM GOURMET',
      description: '晴空塔高空夜景敘敘苑燒肉、新宿六歌仙A5和牛帝王蟹放題、銀座美登利握壽司！中文訂位介面，免排隊輕鬆入席。',
      primaryActionText: '立即預訂席次',
      secondaryActionText: '查看熱門名店',
      actionType: 'reservation',
      bgGradient: 'from-stone-900 via-red-950 to-stone-900',
      tagline: '限時優惠中 立即預訂！',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
      features: ['中文客服協助', '專屬迎賓香檳', '保證窗邊席次']
    },
    {
      id: 2,
      badge: '實體票券・現貨速配',
      title: '超值熱賣中 紙本票券',
      subtitle: 'TAIWAN & JAPAN PAPER GIFT VOUCHERS',
      description: '王品集團通用餐券、夏慕尼法式鐵板燒、饗食天堂百匯、加賀屋雙人溫泉泡湯午宴！郵寄掛號速達，公司福委團購首選。',
      primaryActionText: '搶購現貨紙本券',
      secondaryActionText: '查看團購折扣',
      actionType: 'voucher',
      bgGradient: 'from-amber-950 via-stone-900 to-red-950',
      tagline: '現貨寄送・買十送一',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
      features: ['24小時快速出貨', '信託履約保障', '平假日均可抵用']
    },
    {
      id: 3,
      badge: '3TGDS 獨家會員權益',
      title: '極致和牛燒肉季 85折',
      subtitle: 'JAPANESE WAGYU & SEAFOOD FESTIVAL',
      description: '嚴選A5等級飛驒牛、松阪牛與北海道帝王蟹盛宴！企業同仁輸入獨家優惠碼【3TGDS85】享折上折。',
      primaryActionText: '領取福利折扣',
      secondaryActionText: '探索精選菜單',
      actionType: 'reservation',
      bgGradient: 'from-red-900 via-stone-950 to-stone-900',
      tagline: '企業專屬特惠折扣',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
      features: ['享85折起折扣', '可折抵服務費', '免費取消保障']
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative overflow-hidden bg-[#0A0A0C] text-white border-b border-[#22222A]">
      {/* Background Kinetic Watermark Typography */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] text-[280px] sm:text-[380px] font-black leading-none tracking-tighter select-none pointer-events-none font-mono">
        3TGDS
      </div>

      {/* Slide Item Container */}
      <div className="relative min-h-[440px] sm:min-h-[500px] flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/90 to-transparent z-10" />
              <img
                src={slide.imageUrl}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="absolute right-0 top-0 h-full w-full sm:w-3/5 object-cover opacity-35 filter grayscale contrast-125"
              />

              {/* Content Box */}
              <div className="relative z-20 max-w-7xl mx-auto px-6 py-12 flex flex-col justify-center h-full">
                <div className="max-w-2xl space-y-5">
                  
                  {/* Badge & Tagline */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-red-600 text-white font-mono font-black text-[10px] uppercase tracking-[0.2em] px-3 py-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      0{slide.id} // {slide.badge}
                    </span>
                    <span className="bg-[#181820] text-amber-400 font-mono text-[11px] font-bold px-3 py-1 border border-[#2A2A35]">
                      {slide.tagline}
                    </span>
                  </div>

                  {/* Headline */}
                  <div>
                    <h1 className="text-3xl sm:text-6xl font-black tracking-[-0.04em] text-white uppercase leading-[0.9]">
                      {slide.title.split(' ')[0]} <span className="text-red-600 italic block mt-1">{slide.title.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-xs font-mono font-extrabold tracking-[0.3em] text-[#777] uppercase mt-2">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#BBB] leading-relaxed font-sans max-w-xl">
                    {slide.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs">
                    {slide.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-1.5 text-[#AAA]">
                        <ShieldCheck className="w-4 h-4 text-red-500" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center gap-3 pt-3">
                    <button
                      onClick={slide.actionType === 'reservation' ? onExploreReservations : onExploreVouchers}
                      className="bg-white hover:bg-red-600 hover:text-white text-black text-xs font-mono font-black uppercase tracking-wider px-6 py-3.5 transition cursor-pointer flex items-center gap-2 shadow-xl"
                    >
                      <span>{slide.primaryActionText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={slide.actionType === 'reservation' ? onExploreVouchers : onExploreReservations}
                      className="bg-[#121216] hover:bg-[#1E1E26] text-white border border-[#2A2A35] text-xs font-mono font-bold uppercase tracking-wider px-5 py-3.5 transition flex items-center gap-2 cursor-pointer"
                    >
                      <Ticket className="w-4 h-4 text-red-500" />
                      <span>{slide.secondaryActionText}</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-[#121216] hover:bg-red-600 text-white border border-[#2A2A35] transition cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-[#121216] hover:bg-red-600 text-white border border-[#2A2A35] transition cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Pagination Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 font-mono text-xs">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 transition-all cursor-pointer ${
              i === currentSlide ? 'w-10 bg-red-600' : 'w-3 bg-[#333] hover:bg-[#666]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
