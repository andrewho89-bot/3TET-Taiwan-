import React, { useState } from 'react';
import { X, Ticket, Truck, ShieldCheck, CheckCircle2, ShoppingBag, Gift, Package, Info, ChevronRight } from 'lucide-react';
import { Voucher } from '../types';

interface VoucherDetailModalProps {
  voucher: Voucher | null;
  onClose: () => void;
  onAddToCart: (item: {
    type: 'voucher';
    voucher: Voucher;
    quantity: number;
    unitPriceTwd: number;
  }) => void;
}

export const VoucherDetailModal: React.FC<VoucherDetailModalProps> = ({
  voucher,
  onClose,
  onAddToCart,
}) => {
  if (!voucher) return null;

  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState(false);

  // Compute unit price based on quantity tier
  const getUnitPrice = (qty: number) => {
    if (!voucher.tierPricing || voucher.tierPricing.length === 0) return voucher.priceTwd;
    let price = voucher.priceTwd;
    for (const tier of voucher.tierPricing) {
      if (qty >= tier.minQty) {
        price = tier.pricePerUnit;
      }
    }
    return price;
  };

  const currentUnitPrice = getUnitPrice(quantity);
  const totalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart({
      type: 'voucher',
      voucher,
      quantity,
      unitPriceTwd: currentUnitPrice,
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
        <div className="relative bg-amber-950 text-white p-6 sm:p-8 flex flex-col justify-end min-h-[200px]">
          <img
            src={voucher.imageUrl}
            alt={voucher.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-stone-900/80 hover:bg-red-600 text-stone-300 hover:text-white rounded-full transition z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-500 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5" />
                實體紙本寄送餐券
              </span>
              <span className="bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                {voucher.discountRate} 團購優惠中
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              {voucher.title}
            </h2>

            <div className="flex items-center gap-2 text-xs text-amber-300 font-bold pt-1">
              <Truck className="w-4 h-4" />
              <span>{voucher.deliveryEstimate}</span>
              <span className="text-stone-400">|</span>
              <span className="text-stone-300 font-normal">信託履約保障・無使用期限</span>
            </div>
          </div>
        </div>

        {/* Modal Body Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 bg-stone-50/50">
          
          {/* Left Column: Specs, Highlights & Fine Print */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Description */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200">
              <h3 className="text-sm font-extrabold text-stone-900 mb-2 flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-600" />
                票券內容說明
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {voucher.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200">
              <h3 className="text-sm font-extrabold text-stone-900 mb-2">
                票券核心特點
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {voucher.highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 p-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applicable Branches */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200">
              <h3 className="text-sm font-extrabold text-stone-900 mb-2">
                適用門市與分店
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {voucher.applicableBranches.map((branch, i) => (
                  <span key={i} className="bg-stone-100 text-stone-800 text-xs px-2.5 py-1 rounded-lg border border-stone-200 font-medium">
                    {branch}
                  </span>
                ))}
              </div>
            </div>

            {/* Fine Print / Usage Terms */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200">
              <h3 className="text-sm font-extrabold text-stone-900 mb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-stone-500" />
                注意事項與寄送條款
              </h3>
              <ul className="list-disc list-inside text-xs text-stone-500 space-y-1">
                {voucher.finePrint.map((fp, i) => (
                  <li key={i}>{fp}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Quantity & Bulk Tier Price Purchase Widget */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4 shadow-sm">
            
            <div className="space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-600" />
                  實體餐券訂購數量
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  福委會團購專案，張數越多單價越優惠
                </p>
              </div>

              {/* Tier Pricing Table */}
              {voucher.tierPricing && voucher.tierPricing.length > 0 && (
                <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-200/80 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-900 block">團購階梯優惠價：</span>
                  {voucher.tierPricing.map((tier, i) => (
                    <div key={i} className={`flex justify-between text-xs font-semibold px-2 py-1 rounded ${
                      quantity >= tier.minQty ? 'bg-amber-200/60 text-stone-900 font-extrabold' : 'text-stone-600'
                    }`}>
                      <span>滿 {tier.minQty} 張以上</span>
                      <span>NT$ {tier.pricePerUnit.toLocaleString()} /張</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Counter */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  購買張數
                </label>
                <div className="flex items-center gap-3 bg-stone-50 p-2 rounded-xl border border-stone-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-stone-300 font-bold text-stone-700 hover:bg-stone-100 transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-stone-900 text-base">
                    {quantity} 張
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg bg-white border border-stone-300 font-bold text-stone-700 hover:bg-stone-100 transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-stone-900 text-white p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-xs text-stone-300">
                  <span>單張特惠價</span>
                  <span className="font-bold">NT$ {currentUnitPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold border-t border-stone-800 pt-2">
                  <span>總計金額</span>
                  <span className="text-amber-400 text-lg">NT$ {totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 shrink-0" />
                  實體紙本免運費送到府，附郵寄單號追蹤
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
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>確定加入福利餐車 ({quantity}張)</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
