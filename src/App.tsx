import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryGrid } from './components/CategoryGrid';
import { RestaurantCard } from './components/RestaurantCard';
import { VoucherCard } from './components/VoucherCard';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { VoucherDetailModal } from './components/VoucherDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersModal } from './components/OrdersModal';
import { AIGourmetAssistant } from './components/AIGourmetAssistant';
import { Footer } from './components/Footer';

import { INITIAL_RESTAURANTS, INITIAL_VOUCHERS } from './data/mockData';
import { Restaurant, Voucher, CartItem, Order, ReservationBooking } from './types';
import { Utensils, Ticket, Sparkles, Filter, ChevronRight, MapPin, Search } from 'lucide-react';

export default function App() {
  // State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeCity, setActiveCity] = useState<'全區' | '東京' | '大阪' | '京都' | '北海道' | '福岡'>('全區');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(['rest-jojoen', 'vouch-wangpin-1']);

  // Selected Detail Item Modals
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  // Cart & Drawers
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      type: 'reservation',
      restaurant: INITIAL_RESTAURANTS[0],
      quantity: 1,
      selectedDate: '2026-08-20',
      selectedTime: '18:30',
      guestCount: 2,
      specialRequest: '希望安排高空靠窗景觀席',
      unitPriceTwd: 5600
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');

  // Orders & Favorites Modals
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  // User History
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<ReservationBooking[]>([
    {
      id: 'res-init-1',
      restaurantId: 'rest-jojoen',
      restaurantName: '敘敘苑 Yakiniku Jojoen (晴空塔店)',
      restaurantImage: INITIAL_RESTAURANTS[0].imageUrl,
      city: '東京',
      date: '2026-08-20',
      time: '18:30',
      guestCount: 2,
      contactName: '張小明',
      contactPhone: '0912-345-678',
      contactEmail: 'employee@3tgds.com',
      specialRequests: '高空景觀窗邊席，歡慶周年',
      status: '已確認 (Confirmed)',
      confirmationCode: '3T-JOJOEN-998',
      createdAt: '2026-08-10',
      priceTwd: 5600
    }
  ]);

  // Toggle Favorite
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add Item to Cart
  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    const itemWithId: CartItem = {
      ...newItem,
      id: 'cart-' + Date.now() + '-' + Math.random()
    };
    setCartItems((prev) => [...prev, itemWithId]);
  };

  // Cart Operations
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Checkout Flow
  const handleProceedToCheckout = (discountAmount: number, promoCodeUsed: string) => {
    setCheckoutDiscount(discountAmount);
    setCheckoutPromoCode(promoCodeUsed);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);

    // Also extract reservations into reservation state
    newOrder.items.forEach((item) => {
      if (item.type === 'reservation' && item.restaurant) {
        setReservations((prevRes) => [
          {
            id: 'res-' + Date.now(),
            restaurantId: item.restaurant!.id,
            restaurantName: item.restaurant!.name,
            restaurantImage: item.restaurant!.imageUrl,
            city: item.restaurant!.city,
            date: item.selectedDate || '2026-08-25',
            time: item.selectedTime || '18:00',
            guestCount: item.guestCount || 2,
            contactName: newOrder.recipientName,
            contactPhone: newOrder.recipientPhone,
            contactEmail: 'employee@3tgds.com',
            specialRequests: item.specialRequest || '',
            status: '已確認 (Confirmed)',
            confirmationCode: '3T-' + Math.floor(10000 + Math.random() * 90000),
            createdAt: newOrder.createdAt,
            priceTwd: item.unitPriceTwd
          },
          ...prevRes
        ]);
      }
    });

    // Clear cart
    setCartItems([]);
  };

  // Filter Restaurants
  const filteredRestaurants = INITIAL_RESTAURANTS.filter((r) => {
    // Category check
    if (activeCategory !== 'all' && activeCategory !== '全區' && activeCategory !== '紙本票券') {
      if (r.category !== activeCategory && !r.perks.some((p) => p.includes(activeCategory))) {
        return false;
      }
    }
    // City check
    if (activeCity !== '全區' && r.city !== activeCity && r.city !== '全區') {
      return false;
    }
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.area.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Filter Vouchers
  const filteredVouchers = INITIAL_VOUCHERS.filter((v) => {
    if (activeCategory !== 'all' && activeCategory !== '全區') {
      if (activeCategory === '燒肉和牛' || activeCategory === '壽司割烹') {
        return false;
      }
      if (activeCategory !== '紙本票券' && v.category !== activeCategory && !v.title.includes(activeCategory)) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        v.title.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-[#F1F1F1] font-sans flex flex-col selection:bg-red-600 selection:text-white">
      
      {/* Header */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItems.length}
        openCart={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        openFavorites={() => setIsOrdersOpen(true)}
        openOrders={() => setIsOrdersOpen(true)}
        openAiAssistant={() => setIsAiAssistantOpen(true)}
        activeCity={activeCity}
        setActiveCity={setActiveCity}
      />

      {/* Hero Promotional Banner Slider */}
      <HeroCarousel
        onExploreReservations={() => {
          setActiveCategory('燒肉和牛');
          window.scrollTo({ top: 600, behavior: 'smooth' });
        }}
        onExploreVouchers={() => {
          setActiveCategory('紙本票券');
          window.scrollTo({ top: 900, behavior: 'smooth' });
        }}
      />

      {/* Quick Visual Category Grid */}
      <CategoryGrid
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Main Showcase Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-10 space-y-14">
        
        {/* Section 1: Popular Japanese Restaurant Reservations */}
        {(activeCategory === 'all' || activeCategory !== '紙本票券') && (
          <section className="space-y-6">
            
            {/* Section Title & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#22222A] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-bold text-red-500 block mb-1">
                  SYSTEM_RESERVATIONS //
                </span>
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[10px] font-mono font-black px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5" />
                    JAPAN_GOURMET
                  </span>
                  <span className="text-[#444] text-xs font-mono">|</span>
                  <span className="text-xs font-mono font-bold text-red-500">中文介面・免排隊・保證席次</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mt-1">
                  日本超人氣名店 <span className="text-red-600 italic">預約席次</span>
                </h2>
                <p className="text-xs text-[#888] mt-1">
                  敘敘苑晴空塔高空夜景席、六歌仙A5和牛帝王蟹放題、美登利握壽司
                </p>
              </div>

              {/* Active Filter Indicators */}
              <div className="flex items-center gap-2 text-xs font-mono">
                {activeCity !== '全區' && (
                  <span className="bg-[#181820] text-red-500 font-bold px-3 py-1 border border-red-600/40 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    CITY: {activeCity}
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-[#181820] text-white font-bold px-3 py-1 border border-[#2A2A35]">
                    QUERY: "{searchQuery}"
                  </span>
                )}
              </div>
            </div>

            {/* Restaurant Cards Grid */}
            {filteredRestaurants.length === 0 ? (
              <div className="bg-[#121216] p-12 text-center space-y-3 border border-[#22222A]">
                <Search className="w-8 h-8 text-[#555] mx-auto" />
                <p className="text-sm font-mono font-bold text-[#AAA]">未找到符合條件的日本餐廳</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCity('全區');
                    setActiveCategory('all');
                  }}
                  className="text-xs font-mono font-bold text-red-500 hover:underline cursor-pointer uppercase"
                >
                  CLEAR_SEARCH_FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onSelect={(r) => setSelectedRestaurant(r)}
                    isFavorite={favorites.includes(restaurant.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Section 2: Physical Paper Vouchers & Meal Passes */}
        {(activeCategory === 'all' || activeCategory === '紙本票券' || activeCategory === '王品專區') && (
          <section className="space-y-6 pt-4">
            
            {/* Section Title */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#22222A] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-bold text-amber-500 block mb-1">
                  TAIWAN_VOUCHERS //
                </span>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-black text-[10px] font-mono font-black px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5 text-black" />
                    PAPER_GIFT_PASS
                  </span>
                  <span className="text-[#444] text-xs font-mono">|</span>
                  <span className="text-xs font-mono font-bold text-amber-400">現貨寄送・買十送一・團購免運</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mt-1">
                  王品集團與熱門連鎖 <span className="text-amber-400 italic">實體餐券</span>
                </h2>
                <p className="text-xs text-[#888] mt-1">
                  王品通用面額券、夏慕尼法式鐵板燒、饗食天堂百匯、加賀屋雙人湯宴券
                </p>
              </div>

              <div className="bg-[#181820] text-amber-400 border border-amber-500/40 text-xs font-mono font-bold px-3 py-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>BENEFIT_DISCOUNT_ACTIVE</span>
              </div>
            </div>

            {/* Voucher Cards Grid */}
            {filteredVouchers.length === 0 ? (
              <div className="bg-[#121216] p-12 text-center space-y-3 border border-[#22222A]">
                <Ticket className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-sm font-mono font-bold text-[#AAA]">未找到符合條件的紙本票券</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-xs font-mono font-bold text-amber-400 hover:underline cursor-pointer uppercase"
                >
                  VIEW_ALL_PAPER_VOUCHERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredVouchers.map((voucher) => (
                  <VoucherCard
                    key={voucher.id}
                    voucher={voucher}
                    onSelect={(v) => setSelectedVoucher(v)}
                    isFavorite={favorites.includes(voucher.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Section 3: Dual Feature Spotlight (Gourmet Booking vs Paper Voucher) */}
        <section className="bg-[#121216] border border-[#22222A] p-8 sm:p-12 text-white relative overflow-hidden my-10 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none bg-red-600 font-mono font-black text-[220px] select-none flex items-center justify-center">
            3T
          </div>
          
          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="bg-red-600 text-white font-mono font-black text-[10px] uppercase tracking-[0.3em] px-3 py-1 inline-block">
              3TGDS_EXCLUSIVE_CODE //
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.04em] uppercase leading-none">
              企業同仁專屬 85折 <span className="text-red-500 italic block mt-1">【3TGDS85】</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#BBB] leading-relaxed max-w-2xl font-sans">
              不論您是準備赴日旅遊預訂高空景觀和牛燒肉，或是選購王品、夏慕尼紙本餐券餽贈親友，結帳輸入折扣碼皆可享有專屬薪資扣款與折扣優惠！
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsAiAssistantOpen(true)}
                className="bg-white hover:bg-red-600 text-black hover:text-white font-mono font-black text-xs uppercase px-6 py-3.5 transition cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>諮詢 AI 美食隨從</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-[#1C1C24] hover:bg-[#252530] text-white border border-[#2A2A35] font-mono font-bold text-xs uppercase px-6 py-3.5 transition cursor-pointer"
              >
                開啟福利餐車結帳 ({cartItems.length})
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <RestaurantDetailModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onAddToCart={handleAddToCart}
      />

      <VoucherDetailModal
        voucher={selectedVoucher}
        onClose={() => setSelectedVoucher(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={checkoutDiscount}
        promoCodeUsed={checkoutPromoCode}
        onCompleteOrder={handleCompleteOrder}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        reservations={reservations}
      />

      <AIGourmetAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        restaurants={INITIAL_RESTAURANTS}
        vouchers={INITIAL_VOUCHERS}
        onSelectRestaurant={(r) => setSelectedRestaurant(r)}
        onSelectVoucher={(v) => setSelectedVoucher(v)}
      />

    </div>
  );
}
