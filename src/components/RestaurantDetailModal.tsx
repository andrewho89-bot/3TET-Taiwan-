import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, Star, Sparkles, CheckCircle2, AlertCircle, ShoppingBag, Utensils } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onAddToCart: (item: {
    type: 'reservation';
    restaurant: Restaurant;
    quantity: number;
    selectedDate: string;
    selectedTime: string;
    guestCount: number;
    specialRequest: string;
    unitPriceTwd: number;
  }) => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  onClose,
  onAddToCart,
}) => {
  if (!restaurant) return null;

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('18:30');
  const [guestCount, setGuestCount] = useState(2);
  const [specialRequest, setSpecialRequest] = useState('');
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState(false);

  const availableTimes = ['11:30', '12:00', '13:00', '17:30', '18:00', '18:30', '19:30', '20:00'];

  const handleBooking = () => {
    onAddToCart({
      type: 'reservation',
      restaurant,
      quantity: 1,
      selectedDate,
      selectedTime,
      guestCount,
      specialRequest,
      unitPriceTwd: restaurant.priceTwd * guestCount,
    });
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="relative bg-stone-900 text-white p-6 sm:p-8 flex flex-col justify-end min-h-[200px]">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-stone-900/80 hover:bg-red-600 text-stone-300 hover:text-white rounded-full transition z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {restaurant.tag}
              </span>
              <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded-full">
                {restaurant.discountTag || '3TGDS獨家禮遇'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {restaurant.name}
            </h2>
            {restaurant.nameJp && (
              <p className="text-xs text-stone-300 font-medium">
                {restaurant.nameJp}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-amber-300" />
                <span>{restaurant.rating} ({restaurant.reviewCount} 則評價)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 bg-stone-50/50">
          
          {/* Left Column: Menu Details & Perks */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Description */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200">
              <h3 className="text-sm font-extrabold text-stone-900 mb-2 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-red-600" />
                餐廳特色簡介
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {restaurant.description}
              </p>
            </div>

            {/* Exclusive Perks */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200">
              <h3 className="text-sm font-extrabold text-stone-900 mb-2">
                3TGDS 企業專屬預約禮遇
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {restaurant.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 p-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Menu Selection */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200">
              <h3 className="text-sm font-extrabold text-stone-900 mb-3">
                精選套餐項目 (含稅與服務費)
              </h3>
              <div className="space-y-2">
                {restaurant.menuItems.map((menu, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedMenuIndex(i)}
                    className={`p-3 rounded-xl border transition cursor-pointer ${
                      selectedMenuIndex === i
                        ? 'border-red-600 bg-red-50/40 ring-1 ring-red-600'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-stone-900">{menu.name}</span>
                      <span className="text-xs font-black text-red-600">{menu.price}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">{menu.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Widget */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4 shadow-sm">
            
            <div className="space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-600" />
                  線上即時座位預訂
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  中文介面預約，現場出示 3TGDS 預約憑證即可用餐
                </p>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  預計用餐日期
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold text-stone-800"
                />
              </div>

              {/* Guest Counter */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  用餐人數 (含兒童)
                </label>
                <div className="flex items-center gap-3 bg-stone-50 p-2 rounded-xl border border-stone-200">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-stone-300 font-bold text-stone-700 hover:bg-stone-100 transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-stone-900 text-sm">
                    {guestCount} 位
                  </span>
                  <button
                    onClick={() => setGuestCount(Math.min(12, guestCount + 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-stone-300 font-bold text-stone-700 hover:bg-stone-100 transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  可預約時段
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                        selectedTime === time
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-red-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  特殊需求備註 (例如：慶生、窗邊席、飲食禁忌)
                </label>
                <textarea
                  rows={2}
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="希望安排靠窗位置，同行親友有海鮮過敏..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-stone-800"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-stone-900 text-white p-3.5 rounded-xl space-y-1">
                <div className="flex justify-between text-xs text-stone-300">
                  <span>估算總價 ({guestCount}位 x NT$ {restaurant.priceTwd.toLocaleString()})</span>
                  <span className="font-bold">NT$ {(restaurant.priceTwd * guestCount).toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-amber-300 flex items-center gap-1 pt-1 border-t border-stone-800">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  免費取消期限：用餐前 48 小時無條件全額退款
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              {successMessage ? (
                <div className="bg-emerald-600 text-white text-xs font-bold p-3.5 rounded-xl text-center animate-bounce flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  已成功加入福利餐車！
                </div>
              ) : (
                <button
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>確定預約席次並加入餐車</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
