import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Building2, MapPin, Ticket, Receipt, Copy, Download } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  promoCodeUsed: string;
  onCompleteOrder: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  promoCodeUsed,
  onCompleteOrder,
}) => {
  if (!isOpen) return null;

  const [recipientName, setRecipientName] = useState('張小明');
  const [recipientPhone, setRecipientPhone] = useState('0912-345-678');
  const [employeeId, setEmployeeId] = useState('3TGDS-2026-88');
  const [shippingAddress, setShippingAddress] = useState('台北市中山區南京東路二段100號 5樓');
  const [paymentMethod, setPaymentMethod] = useState<'payroll' | 'creditCard' | 'linePay'>('payroll');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPriceTwd * item.quantity, 0);
  const finalAmount = Math.max(0, subtotal - discountAmount);

  const handlePayAndConfirm = () => {
    const orderId = '3T-' + Math.floor(100000 + Math.random() * 900000);
    const mockVouchers = cartItems
      .filter((i) => i.type === 'voucher')
      .map((item, idx) => ({
        title: item.voucher?.title || '實體票券',
        code: 'VOUCH-3T-' + Math.floor(10000000 + Math.random() * 90000000),
        barcodeUrl: 'https://images.unsplash.com/photo-1595079672139-cee25a1eb3a4?q=80&w=400&auto=format&fit=crop'
      }));

    const newOrder: Order = {
      id: orderId,
      items: cartItems,
      totalAmount: subtotal,
      discountAmount,
      finalAmount,
      promoCode: promoCodeUsed,
      paymentMethod: paymentMethod === 'payroll' ? '3TGDS 企業薪資扣款' : paymentMethod === 'creditCard' ? '信用卡即時付款' : 'LINE Pay 快速支付',
      recipientName,
      recipientPhone,
      shippingAddress,
      status: '已確認 (Confirmed)',
      createdAt: new Date().toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      voucherCodes: mockVouchers
    };

    setCompletedOrder(newOrder);
    onCompleteOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-extrabold text-white">
              {completedOrder ? '訂單結帳成功憑證' : '3TGDS 企業福利結帳專區'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
          
          {completedOrder ? (
            /* Completed Order Confirmation View */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-black text-stone-900">恭喜您！福利訂單完成</h3>
                <p className="text-xs text-stone-500 mt-1">
                  訂單編號：<span className="font-mono font-bold text-red-600">{completedOrder.id}</span>
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  確認信與預約憑證已同步寄送至您的企業信箱
                </p>
              </div>

              {/* Order Receipt Summary Box */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left space-y-3">
                <div className="border-b border-stone-200 pb-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-700">付款方式</span>
                  <span className="font-bold text-stone-900">{completedOrder.paymentMethod}</span>
                </div>
                <div className="border-b border-stone-200 pb-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-700">收件人 / 聯絡人</span>
                  <span className="font-semibold text-stone-800">{completedOrder.recipientName} ({completedOrder.recipientPhone})</span>
                </div>
                <div className="border-b border-stone-200 pb-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-700">宅配地址</span>
                  <span className="font-medium text-stone-700">{completedOrder.shippingAddress}</span>
                </div>

                <div className="pt-1">
                  <span className="text-xs font-bold text-stone-800 block mb-2">訂購名細項目：</span>
                  {completedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs py-1 text-stone-700">
                      <span>{item.type === 'reservation' ? item.restaurant?.name : item.voucher?.title} x {item.quantity}</span>
                      <span className="font-bold">NT$ {(item.unitPriceTwd * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {completedOrder.voucherCodes && completedOrder.voucherCodes.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-dashed border-stone-300">
                    <span className="text-xs font-bold text-amber-800 block mb-1">
                      🎟️ 實體票券出貨序號預覽（掛號郵寄處理中）：
                    </span>
                    {completedOrder.voucherCodes.map((vc, idx) => (
                      <div key={idx} className="bg-white p-2.5 rounded-xl border border-amber-200 text-xs flex items-center justify-between font-mono my-1">
                        <span className="font-bold text-stone-800">{vc.code}</span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-sans font-bold">
                          實體郵寄中
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-stone-200 pt-3 flex justify-between items-center text-sm font-black text-stone-900">
                  <span>實付總金額</span>
                  <span className="text-red-600 text-lg">NT$ {completedOrder.finalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl transition cursor-pointer text-xs"
                >
                  回到饗樂特區首頁
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <div className="space-y-6">
              
              {/* Step 1: Employee & Recipient Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
                  <Building2 className="w-4 h-4 text-red-600" />
                  1. 企業員工資料與票券寄送地址
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">收件人姓名</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">聯絡電話</label>
                    <input
                      type="text"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">企業員工編號 (核對福利資格)</label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-mono uppercase font-bold text-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    實體票券郵寄地址 (免費掛號到府)
                  </label>
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                  />
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
                  <CreditCard className="w-4 h-4 text-red-600" />
                  2. 選擇付款管道
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setPaymentMethod('payroll')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                      paymentMethod === 'payroll'
                        ? 'border-red-600 bg-red-50/50 ring-1 ring-red-600'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black text-stone-900 block">3TGDS 企業薪資扣款</span>
                      <span className="text-[10px] text-stone-500">次月薪資自動扣抵</span>
                    </div>
                    <span className="text-[10px] font-bold text-red-600 mt-2">免付現・最便利</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('creditCard')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                      paymentMethod === 'creditCard'
                        ? 'border-red-600 bg-red-50/50 ring-1 ring-red-600'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black text-stone-900 block">信用卡即時支付</span>
                      <span className="text-[10px] text-stone-500">支援 VISA/MasterCard/JCB</span>
                    </div>
                    <span className="text-[10px] font-bold text-stone-600 mt-2">一次付清</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('linePay')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                      paymentMethod === 'linePay'
                        ? 'border-red-600 bg-red-50/50 ring-1 ring-red-600'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-black text-stone-900 block">LINE Pay 快速轉帳</span>
                      <span className="text-[10px] text-stone-500">享 LINE POINTS 點數回饋</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 mt-2">行動支付</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Order Calculation & Submit */}
              <div className="bg-stone-900 text-white p-4 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs text-stone-300">
                  <span>小計金額</span>
                  <span>NT$ {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-red-400 font-bold">
                    <span>企業福利 85折 折抵 ({promoCodeUsed})</span>
                    <span>- NT$ {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-emerald-400">
                  <span>郵寄掛號運費</span>
                  <span>免運費 $0</span>
                </div>
                <div className="flex justify-between text-sm font-black pt-2 border-t border-stone-800">
                  <span>本次實付金額</span>
                  <span className="text-amber-400 text-xl">NT$ {finalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePayAndConfirm}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <ShieldCheck className="w-5 h-5 text-amber-300" />
                <span>確認無誤，立即支付 NT$ {finalAmount.toLocaleString()}</span>
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
