import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck, Ticket, Award, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0C] text-[#AAA] border-t border-[#22222A]">
      {/* Upper Perks Bar */}
      <div className="border-b border-[#22222A] py-6 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-mono">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center shrink-0 font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">企業專屬折扣</h4>
              <p className="text-[10px] text-[#777]">輸入特惠碼享 85 折起福利優惠</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 text-black flex items-center justify-center shrink-0 font-bold">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">實體紙本票券保證</h4>
              <p className="text-[10px] text-[#777]">信託履約保障，掛號速達免運費</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">日本名店保證席次</h4>
              <p className="text-[10px] text-[#777]">全中文介面預約，現場免排隊</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1C1C24] text-red-500 border border-red-600/40 flex items-center justify-center shrink-0 font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">真人客服諮詢</h4>
              <p className="text-[10px] text-[#777]">週一至週五 09:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-sans">
        
        {/* Brand Info */}
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 text-white font-mono font-black text-lg flex items-center justify-center">
              3T
            </div>
            <span className="font-black text-white text-base uppercase tracking-tight">
              3TGDS 福利網 <span className="text-red-500 italic">EPICUREAN_RESERVE</span>
            </span>
          </div>
          <p className="text-[#888] leading-relaxed">
            三竹企業員工福利網（3TGDS Benefit Mall）專為企業同仁量身打造，整合台日頂級名店預約、王品與夏慕尼等熱門實體餐券，提供即時、尊榮與超值的福利體驗。
          </p>
          <p className="text-[11px] text-[#555] font-mono">
            © 2026 3TGDS BENEFIT MALL INC. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-3 space-y-2.5">
          <h4 className="font-mono font-black text-white text-xs tracking-widest uppercase border-b border-[#22222A] pb-1.5">
            HOT_RESERVATIONS //
          </h4>
          <ul className="space-y-1.5 text-[#888] font-sans">
            <li><a href="#" className="hover:text-red-500 transition">敘敘苑晴空塔高空夜景席</a></li>
            <li><a href="#" className="hover:text-red-500 transition">新宿六歌仙 A5和牛&帝王蟹</a></li>
            <li><a href="#" className="hover:text-red-500 transition">【王品集團】通用面額紙本餐券</a></li>
            <li><a href="#" className="hover:text-red-500 transition">【夏慕尼】新香榭鐵板燒套餐券</a></li>
            <li><a href="#" className="hover:text-red-500 transition">【饗食天堂】雙人百匯餐券</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-2 space-y-2.5">
          <h4 className="font-mono font-black text-white text-xs tracking-widest uppercase border-b border-[#22222A] pb-1.5">
            CORPORATE //
          </h4>
          <ul className="space-y-1.5 text-[#888] font-sans">
            <li><a href="#" className="hover:text-red-500 transition">福委會團購合作</a></li>
            <li><a href="#" className="hover:text-red-500 transition">企業特惠碼核銷</a></li>
            <li><a href="#" className="hover:text-red-500 transition">薪資自動扣繳說明</a></li>
            <li><a href="#" className="hover:text-red-500 transition">紙本票券退換貨政策</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-3 space-y-2.5">
          <h4 className="font-mono font-black text-white text-xs tracking-widest uppercase border-b border-[#22222A] pb-1.5">
            CONTACT_US //
          </h4>
          <div className="space-y-2 text-[#888] font-mono text-xs">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>台北市中山區南京東路二段100號 5樓</span>
            </p>
            <p className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-red-500 shrink-0" />
              <span>(02) 2500-1234</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <span>service@3tgds-benefit.com</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
