export interface Restaurant {
  id: string;
  name: string;
  nameJp?: string;
  city: '東京' | '大阪' | '京都' | '北海道' | '福岡' | '全區';
  area: string;
  category: '燒肉和牛' | '壽司割烹' | '螃蟹海鮮' | '天婦羅' | '壽喜燒' | '鐵板燒' | '居酒屋' | '高級料理';
  rating: number;
  reviewCount: number;
  priceRange: string; // e.g. "¥10,000 - ¥18,000" or "NT$ 2,200"
  priceTwd: number; // TWD equivalent for quick filtering
  originalPriceTwd?: number;
  tag: string; // e.g. "HOT", "晴空塔夜景席", "米其林推薦"
  discountTag?: string; // e.g. "85折", "贈迎賓香檳"
  imageUrl: string;
  description: string;
  address: string;
  perks: string[];
  mealType: string[]; // ['午餐', '晚餐']
  seating: string[]; // ['一般席', '包廂', '景觀席', '吧檯']
  menuItems: { name: string; desc: string; price: string }[];
  isExclusiveSeat?: boolean;
}

export interface Voucher {
  id: string;
  title: string;
  brand: string;
  category: '王品集團' | '頂級鐵板燒' | '飯店百匯' | '日式連鎖' | '溫泉泡湯' | 'SPA養生';
  priceTwd: number;
  originalPriceTwd: number;
  discountRate: string; // e.g. "88折"
  soldCount: number;
  stockCount: number;
  isPaperTicket: boolean;
  deliveryEstimate: string; // e.g. "現貨24小時內寄出"
  imageUrl: string;
  description: string;
  highlights: string[];
  applicableBranches: string[];
  tierPricing?: { minQty: number; pricePerUnit: number }[];
  finePrint: string[];
}

export interface CartItem {
  id: string;
  type: 'reservation' | 'voucher';
  restaurant?: Restaurant;
  voucher?: Voucher;
  quantity: number;
  selectedDate?: string;
  selectedTime?: string;
  guestCount?: number;
  specialRequest?: string;
  unitPriceTwd: number;
}

export interface ReservationBooking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  city: string;
  date: string;
  time: string;
  guestCount: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  specialRequests: string;
  status: '已確認 (Confirmed)' | '待入席 (Pending)' | '已完成 (Completed)';
  confirmationCode: string;
  createdAt: string;
  priceTwd: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  promoCode?: string;
  paymentMethod: string;
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  status: '已確認 (Confirmed)' | '處理中 (Processing)' | '已出貨 (Shipped)' | '已完成 (Completed)';
  createdAt: string;
  voucherCodes?: { title: string; code: string; barcodeUrl: string }[];
}

export interface UserFavorite {
  itemType: 'restaurant' | 'voucher';
  itemId: string;
}
