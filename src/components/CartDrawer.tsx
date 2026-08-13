import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Ticket, Calendar, Utensils, Tag, Check, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (discountAmount: number, promoCodeUsed: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('3TGDS85');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountRate: number } | null>({
    code: '3TGDS85',
    discountRate: 0.15
  });
  const [promoError, setPromoError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPriceTwd * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round(subtotal * appliedPromo.discountRate) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === '3TGDS85' || code === 'VIP85' || code === 'BENEFIT15') {
      setAppliedPromo({ code, discountRate: 0.15 });
    } else if (code === 'VIP200') {
      setAppliedPromo({ code, discountRate: 0.1 });
    } else {
      setPromoError('無效的企業優惠碼，請使用 3TGDS85 享85折優惠');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-stone-200 flex flex-col">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-extrabold text-white">
              3TGDS 福利餐車 ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-stone-700">福利餐車內尚無項目</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                挑選您喜愛的日本高級餐廳預約，或選購王品/夏慕尼紙本餐券，享企業專屬85折優惠！
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs flex gap-3 relative group"
              >
                <img
                  src={item.type === 'reservation' ? item.restaurant?.imageUrl : item.voucher?.imageUrl}
                  alt={item.type === 'reservation' ? item.restaurant?.name : item.voucher?.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover shrink-0 bg-stone-100"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        item.type === 'reservation' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {item.type === 'reservation' ? '餐廳預約席次' : '實體紙本票券'}
                      </span>
                    </div>

                    <h4 className="text-xs font-extrabold text-stone-900 truncate mt-1">
                      {item.type === 'reservation' ? item.restaurant?.name : item.voucher?.title}
                    </h4>

                    {item.type === 'reservation' && (
                      <p className="text-[10px] text-stone-500 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-red-500" />
                        <span>{item.selectedDate} ({item.selectedTime}) ・ {item.guestCount}位</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded bg-stone-100 font-bold text-stone-700 text-xs hover:bg-stone-200 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-stone-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded bg-stone-100 font-bold text-stone-700 text-xs hover:bg-stone-200 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold text-stone-900">
                        NT$ {(item.unitPriceTwd * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition cursor-pointer"
                        title="刪除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Corporate Promo Code & Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200 space-y-3">
            
            {/* Promo Code Input */}
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="輸入企業優惠碼"
                    className="w-full pl-8 pr-3 py-2 text-xs border border-stone-300 rounded-xl font-mono uppercase focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="bg-stone-900 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  套用
                </button>
              </div>

              {appliedPromo && (
                <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                  <Check className="w-3.5 h-3.5" />
                  已套用 3TGDS 專屬福利折扣 85折 (-NT$ {discountAmount.toLocaleString()})
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 font-medium mt-1">{promoError}</p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>小計</span>
                <span className="font-semibold text-stone-900">NT$ {subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-600 font-bold">
                  <span>企業專屬 85折 折抵</span>
                  <span>- NT$ {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>宅配掛號運費</span>
                <span className="text-emerald-600 font-bold">免運費 $0</span>
              </div>
              <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>結帳總金額</span>
                <span className="text-red-600 text-lg">NT$ {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => onProceedToCheckout(discountAmount, appliedPromo?.code || '')}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span>前往結帳付款</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              信託履約保障，支援公司薪資扣款與多元線上支付
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
