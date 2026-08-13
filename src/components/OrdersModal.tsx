import React from 'react';
import { X, Calendar, Ticket, MapPin, Receipt, CheckCircle2, Clock, QrCode, Phone } from 'lucide-react';
import { Order, ReservationBooking } from '../types';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  reservations: ReservationBooking[];
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  reservations,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = React.useState<'reservations' | 'orders'>('reservations');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-extrabold text-white">
              我的福利訂單與日本餐廳預約
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-stone-100 p-2 border-b border-stone-200 flex gap-2">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'reservations'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>日本餐廳預約席次 ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>紙本票券福利訂單 ({orders.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto max-h-[70vh] bg-stone-50/50 space-y-4">
          
          {activeTab === 'reservations' ? (
            reservations.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-stone-700">尚未有日本餐廳預約紀錄</p>
                <p className="text-[11px] text-stone-400">
                  瀏覽「敘敘苑」、「六歌仙」或「美登利壽司」，立即體驗頂級日本名店中文免排隊席次！
                </p>
              </div>
            ) : (
              reservations.map((res) => (
                <div key={res.id} className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between border-b border-stone-100 pb-3">
                    <div>
                      <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        {res.city} 餐廳預約
                      </span>
                      <h3 className="text-sm font-extrabold text-stone-900 mt-1">
                        {res.restaurantName}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-red-500" />
                        <span>{res.date} at {res.time} ({res.guestCount} 位)</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {res.status}
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-1">
                        編號: {res.confirmationCode}
                      </span>
                    </div>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                    <div className="text-xs text-stone-700 space-y-0.5">
                      <p><span className="font-semibold text-stone-900">預約聯絡人:</span> {res.contactName} ({res.contactPhone})</p>
                      {res.specialRequests && <p><span className="font-semibold text-stone-900">備註需求:</span> {res.specialRequests}</p>}
                    </div>

                    <div className="w-12 h-12 bg-white rounded-lg border border-stone-300 p-1 flex items-center justify-center shrink-0">
                      <QrCode className="w-9 h-9 text-stone-800" />
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            orders.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center mx-auto">
                  <Ticket className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-stone-700">尚未有紙本票券訂單</p>
                <p className="text-[11px] text-stone-400">
                  王品通用餐券、夏慕尼鐵板燒與饗食天堂熱銷現貨寄送中！
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
                  <div className="flex justify-between items-center border-b border-stone-100 pb-2 text-xs">
                    <div>
                      <span className="font-mono font-bold text-red-600">訂單號: {order.id}</span>
                      <span className="text-stone-400 text-[10px] block">{order.createdAt}</span>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-stone-700">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.type === 'reservation' ? item.restaurant?.name : item.voucher?.title} x {item.quantity}</span>
                        <span className="font-bold">NT$ {(item.unitPriceTwd * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {order.voucherCodes && order.voucherCodes.length > 0 && (
                    <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 space-y-1">
                      <span className="text-[11px] font-bold text-amber-900 block">🎟️ 實體紙本出貨號：</span>
                      {order.voucherCodes.map((vc, i) => (
                        <div key={i} className="text-xs font-mono font-bold text-stone-800 flex justify-between">
                          <span>{vc.code}</span>
                          <span className="text-amber-700 font-sans text-[10px]">中華郵政掛號寄送中</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs font-black pt-2 border-t border-stone-100">
                    <span className="text-stone-600">總實付金額</span>
                    <span className="text-red-600 text-base">NT$ {order.finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              ))
            )
          )}

        </div>

      </div>
    </div>
  );
};
