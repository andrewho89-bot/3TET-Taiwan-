import { Restaurant, Voucher } from '../types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-jojoen',
    name: '敘敘苑 Yakiniku Jojoen (晴空塔店)',
    nameJp: '叙々苑 東京スカイツリータウン・ソラマチ店',
    city: '東京',
    area: '押上 / 晴空塔',
    category: '燒肉和牛',
    rating: 4.9,
    reviewCount: 1420,
    priceRange: 'NT$ 2,800 - NT$ 4,500',
    priceTwd: 2800,
    originalPriceTwd: 3200,
    tag: '獨家晴空塔高空景觀席',
    discountTag: '88折・贈迎賓特調',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    description: '日本超人氣頂級燒肉品牌，位於東京晴空塔30樓高空，品嚐嚴選最高等級黑毛和牛與特製醬汁，同時俯瞰東京浪漫絕美夜景。',
    address: '東京都墨田區押上1-1-2 東京晴空塔城 30F',
    perks: ['保證窗邊高空景觀席', '全程專人桌邊代烤', '包含特選和牛套餐與特製海鮮', '免費贈送飯店級甜點與餐後飲料'],
    mealType: ['午餐', '晚餐'],
    seating: ['高空景觀席', '隱密包廂', '一般餐桌'],
    isExclusiveSeat: true,
    menuItems: [
      { name: '極上黑毛和牛雙人套餐', desc: '特選特上牛舌、特選肋眼牛肉、特選菲力、綜合海鮮拼盤、敘敘苑特製沙拉、冷麵、甜點', price: 'NT$ 5,600' },
      { name: '尊榮晴空塔高空夜景套餐', desc: 'A5極上黑毛和牛厚切、帝王蟹腳、鮑魚、特製韓式泡菜拼盤、石鍋拌飯、迎賓香檳', price: 'NT$ 7,200' },
      { name: '嚴選和牛商業午餐', desc: '和牛薄切片、上等牛肋條、海鮮煎餅、日式套餐小菜、無酒精特調', price: 'NT$ 2,200' }
    ]
  },
  {
    id: 'rest-rokkasen',
    name: '六歌仙 Rokkasen (新宿本店)',
    nameJp: '焼肉の達人 六歌仙 新宿本店',
    city: '東京',
    area: '新宿',
    category: '燒肉和牛',
    rating: 4.8,
    reviewCount: 980,
    priceRange: 'NT$ 3,200 - NT$ 5,800',
    priceTwd: 3200,
    originalPriceTwd: 3600,
    tag: 'A5和牛&帝王蟹無限放題',
    discountTag: '88折免排隊',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
    description: '榮獲旅遊大獎NO.1的東京燒肉殿堂！提供松阪牛、A5黑毛和牛、北海道帝王蟹、松葉蟹放題與壽喜燒雙吃奢華體驗。',
    address: '東京都新宿區西新宿1-3-1 太陽花大樓 6F/7F',
    perks: ['中文菜單與線上中文服務', '保證熱門時段席次', '提供和牛燒肉與海鮮火鍋雙拼', '包含酒精飲料暢飲禮遇'],
    mealType: ['午餐', '晚餐', '宵夜'],
    seating: ['包廂', '一般席'],
    isExclusiveSeat: true,
    menuItems: [
      { name: '桔梗之宴 - A5和牛&帝王蟹吃到飽 (90分鐘)', desc: '上等黑毛和牛肋條、和牛菲力、帝王蟹腳、河豚、大草蝦、各式主食與飲料暢飲', price: 'NT$ 3,200' },
      { name: '松阪之宴 - 頂級松阪牛&豪華海鮮盛宴', desc: '松阪牛特選部位、極品牛舌、松葉蟹、生食級干貝、鮑魚、特製甜點禮盒', price: 'NT$ 4,800' }
    ]
  },
  {
    id: 'rest-kanidoraku',
    name: '蟹道樂 Kani Doraku (道頓堀本店)',
    nameJp: 'かに道楽 道頓堀本店',
    city: '大阪',
    area: '難波 / 道頓堀',
    category: '螃蟹海鮮',
    rating: 4.7,
    reviewCount: 2100,
    priceRange: 'NT$ 1,800 - NT$ 3,500',
    priceTwd: 1800,
    originalPriceTwd: 2100,
    tag: '關西地標・全蟹奢華宴',
    discountTag: '贈特製螃蟹仙貝',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
    description: '大阪道頓堀最著名的巨型螃蟹地標，經典全蟹極致料理，包含螃蟹刺身、碳烤蟹腳、螃蟹火鍋、蟹膏甲羅燒及螃蟹雜炊。',
    address: '大阪府大阪市中央區道頓堀1-6-18',
    perks: ['道頓堀川河景席優先安排', '提供日式榻榻米與現代座椅區', '全席次免費附贈特製抹茶冰淇淋演示'],
    mealType: ['午餐', '晚餐'],
    seating: ['河景席', '日式包廂', '一般桌席'],
    menuItems: [
      { name: '輝 (Kagayaki) 豪華螃蟹懷石會席', desc: '螃蟹刺身、醋蒸螃蟹、螃蟹甲羅燒、碳烤蟹腳、螃蟹天婦羅、螃蟹釜飯、抹茶冰淇淋', price: 'NT$ 2,500' },
      { name: '滿月 (Mangetsu) 帝王蟹小火鍋特別會席', desc: '帝王蟹切片刺身、清蒸帝王蟹、帝王蟹火鍋、雜炊粥、季節水果甜品', price: 'NT$ 3,200' }
    ]
  },
  {
    id: 'rest-midori',
    name: '美登利壽司 Midori Sushi (銀座總店)',
    nameJp: '梅丘寿司の美登利 銀座店',
    city: '東京',
    area: '銀座',
    category: '壽司割烹',
    rating: 4.8,
    reviewCount: 1850,
    priceRange: 'NT$ 1,600 - NT$ 2,900',
    priceTwd: 1600,
    originalPriceTwd: 1900,
    tag: '豐洲市場直送・極上握壽司',
    discountTag: '免排隊快速通關',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop',
    description: '每日由豐洲市場直達的極致鮮魚，特大鮪魚中腹、炙燒星鰻大一條、海膽生干貝，份量十足且精緻超值的壽司聖地。',
    address: '東京都中央區銀座7-108 東京高速道路山下大樓 1F',
    perks: ['免除現場排隊2小時苦候', '板前職人現做握壽司饗宴', '附贈特製海鮮茶碗蒸與蟹膏沙拉'],
    mealType: ['午餐', '晚餐'],
    seating: ['板前吧檯', '一般桌席'],
    menuItems: [
      { name: '極上握壽司職人特選套餐 (13貫)', desc: '特大鮪魚大腹、炙燒星鰻、生海膽、牡丹蝦、鮭魚卵、鮑魚、蟹肉茶碗蒸、味噌湯', price: 'NT$ 1,850' },
      { name: '銀座限定尊榮極致會席', desc: '季節前菜三品、刺身盛合、極上握壽司10貫、和牛炙燒握壽司2貫、甜點', price: 'NT$ 2,600' }
    ]
  },
  {
    id: 'rest-imahan',
    name: '人形町今半 Ningyocho Imahan (銀座店)',
    nameJp: '人形町今半 銀座店',
    city: '東京',
    area: '銀座',
    category: '壽喜燒',
    rating: 4.9,
    reviewCount: 760,
    priceRange: 'NT$ 3,000 - NT$ 5,200',
    priceTwd: 3000,
    originalPriceTwd: 3400,
    tag: '百年老店・A5極上壽喜燒',
    discountTag: '85折優惠席',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop',
    description: '創立於明治38年（1905年）的壽喜燒百年名店，使用獨家秘傳醬汁與特選A5黑毛和牛霜降肉，專人服務展現日式精緻極致。',
    address: '東京都中央區銀座6-8-7 交詢大樓 5F',
    perks: ['穿著和服之女將現場服務', '提供特選A5黑毛和牛霜降部位', '體驗獨家壽喜燒蛋花雜炊飯'],
    mealType: ['午餐', '晚餐'],
    seating: ['日式包廂', '現代餐桌席'],
    isExclusiveSeat: true,
    menuItems: [
      { name: '極上A5黑毛和牛壽喜燒會席', desc: '前菜五品、季節生魚片、極上A5和牛霜降牛肉3片、季節野菜盛合、卵花飯、日式甘味', price: 'NT$ 3,600' },
      { name: '嚴選和牛涮涮鍋與壽喜燒雙響饗宴', desc: '黑毛和牛菲力與霜降雙部位、特製胡麻醬與ポン酢、烏龍麵、抹茶羊羹', price: 'NT$ 4,200' }
    ]
  },
  {
    id: 'rest-tempura-kondo',
    name: '天婦羅近藤 Tempura Kondo',
    nameJp: 'てんぷら 近藤',
    city: '東京',
    area: '銀座',
    category: '天婦羅',
    rating: 4.9,
    reviewCount: 620,
    priceRange: 'NT$ 3,500 - NT$ 6,000',
    priceTwd: 3500,
    originalPriceTwd: 3900,
    tag: '米其林二星・職人天婦羅',
    discountTag: 'VIP預約專席',
    imageUrl: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=1200&auto=format&fit=crop',
    description: '大師近藤文夫執掌之米其林二星天婦羅神殿，薄如蟬翼的清爽麵衣，將季節蔬菜與極鮮海味之香氣與汁液完美封存。',
    address: '東京都中央區銀座5-5-13 坂口大樓 9F',
    perks: ['近藤大師或高徒板前親自操刀', '招牌地瓜塔與紫蘇海膽天婦羅', '搭配獨家特選清酒ペアリング選項'],
    mealType: ['午餐', '晚餐'],
    seating: ['板前吧檯席'],
    menuItems: [
      { name: '楓 (Kaede) 職人天婦羅會席', desc: '海老2尾、季節鮮魚3種、精選野菜5種、名物地瓜塔、天丼/天茶、季節水果', price: 'NT$ 3,800' }
    ]
  },
  {
    id: 'rest-chamonix',
    name: '夏慕尼新香榭鐵板燒 Chamonix Teppanyaki',
    city: '全區',
    area: '台北 / 台中 / 高雄等多分店',
    category: '鐵板燒',
    rating: 4.8,
    reviewCount: 3400,
    priceRange: 'NT$ 1,280 - NT$ 1,880',
    priceTwd: 1280,
    originalPriceTwd: 1450,
    tag: '王品集團・法式鐵板奢華',
    discountTag: '企業專屬85折',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    description: '王品集團旗下經典法式鐵板燒，融合法式精緻烹調與鐵板職人火焰表演，精選白蘭地鴨胸、嫩煎菲力與嚴選海陸雙拼。',
    address: '全台各大主要城市直營分店可通用',
    perks: ['附贈企業專屬白桃氣泡飲乙瓶', '主廚火焰秀桌邊視覺演出', '生日節慶專屬精緻蛋糕禮遇'],
    mealType: ['午餐', '晚餐'],
    seating: ['鐵板吧檯區', '獨立甜點專區'],
    menuItems: [
      { name: '新香榭鐵板燒套餐', desc: '熱前菜、法式麵包、嚴選湯品、沙拉、白蘭地鴨胸/菲力牛排、櫻花蝦炒飯、精緻甜點、飲料', price: 'NT$ 1,280' },
      { name: '尊榮海陸雙人套餐', desc: '安格斯黑牛肋眼、波士頓龍蝦半隻、北海道干貝、法式濃湯、舒芙蕾甜點', price: 'NT$ 2,880' }
    ]
  },
  {
    id: 'rest-tasty',
    name: 'TASTy 西堤牛排 Steakhouse',
    city: '全區',
    area: '全台主要城市分店',
    category: '高級料理',
    rating: 4.6,
    reviewCount: 4200,
    priceRange: 'NT$ 738 - NT$ 980',
    priceTwd: 738,
    originalPriceTwd: 830,
    tag: '經典精緻美式牛排',
    discountTag: '熱銷第一名',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    description: '熱情親切的服務與高品質高CP值西式精緻餐點，精選原塊原味牛排、焗烤蘑菇方塊麵包與經典鮮蝦沙拉。',
    address: '全台連鎖分店通用',
    perks: ['全餐包含開胃品、沙拉、湯品、主餐、甜點、飲料7道極致美味', '企業會員免費加贈香煎鮑魚乙份'],
    mealType: ['午餐', '晚餐'],
    seating: ['家庭沙發區', '景觀桌席'],
    menuItems: [
      { name: '經典西堤精緻套餐 (7道菜)', desc: '鮮蝦雞肉沙拉、焗烤蘑菇+方塊麵包、牛肉清湯、原塊牛排/海陸雙拼、布蕾、特調飲品', price: 'NT$ 738' }
    ]
  }
];

export const INITIAL_VOUCHERS: Voucher[] = [
  {
    id: 'vouch-wangpin-1',
    title: '【王品集團】通用面額紙本餐券 $1,000元 (買十送一優惠組)',
    brand: '王品集團 Wangpin Group',
    category: '王品集團',
    priceTwd: 920,
    originalPriceTwd: 1000,
    discountRate: '92折',
    soldCount: 8900,
    stockCount: 150,
    isPaperTicket: true,
    deliveryEstimate: '實體現貨・24小時內掛號寄出',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?q=80&w=1200&auto=format&fit=crop',
    description: '全台王品集團旗下所有品牌通用紙本面額餐券！包含王品牛排、夏慕尼、西堤、陶板屋、原燒、聚鍋物、享鴨、莆田等，平假日無限制，可抵用消費金額且可找零與扣抵服務費。',
    highlights: [
      '無使用期限，信託保障',
      '全台王品集團 300+ 家門市均可使用',
      '平假日、國定假日皆可抵用',
      '實體票券郵寄到府，公司福委會團購首選'
    ],
    applicableBranches: ['王品牛排全台門市', '夏慕尼法式鐵板燒', '西堤牛排', '陶板屋和風創作料理', '原燒日式燒肉', '享鴨烤鴨中華料理'],
    tierPricing: [
      { minQty: 1, pricePerUnit: 920 },
      { minQty: 5, pricePerUnit: 900 },
      { minQty: 10, pricePerUnit: 870 }
    ],
    finePrint: [
      '本券為實體紙本票券，憑券折抵消費額度 $1,000 元。',
      '發票已於開立餐券時開立，持券消費不再另開立發票。',
      '退換貨需保持票券完整未刮除未折損，郵寄辦理。'
    ]
  },
  {
    id: 'vouch-chamonix-pass',
    title: '【夏慕尼】新香榭鐵板燒單人套餐實體餐券 (含服務費現省$200)',
    brand: '夏慕尼 Chamonix',
    category: '頂級鐵板燒',
    priceTwd: 1220,
    originalPriceTwd: 1419,
    discountRate: '86折',
    soldCount: 6420,
    stockCount: 88,
    isPaperTicket: true,
    deliveryEstimate: '實體現貨・免費掛號宅配',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    description: '憑券可享用夏慕尼新香榭鐵板燒套餐乙客（已包含10%服務費）。法式浪漫環境，主廚桌邊精緻演繹白蘭地鴨胸與嫩煎菲力。',
    highlights: [
      '已含10%服務費，不需額外支付費用',
      '全台夏慕尼門市不分平假日均可使用',
      '公司福委與節慶餽贈最佳禮品'
    ],
    applicableBranches: ['台北中山北店', '台北忠孝東店', '新竹竹北店', '台中大隆店', '高雄五福店等全台連鎖'],
    tierPricing: [
      { minQty: 1, pricePerUnit: 1220 },
      { minQty: 4, pricePerUnit: 1190 },
      { minQty: 10, pricePerUnit: 1150 }
    ],
    finePrint: [
      '本券已含 10% 服務費，不需再另付任何服務費。',
      '特殊節日（如母親節、西洋情人節、跨年等）依品牌現場公告補充差額使用。'
    ]
  },
  {
    id: 'vouch-eatogether',
    title: '【饗食天堂】全台通用平日晚餐/假日午餐雙人吃到飽紙本券',
    brand: '饗賓餐旅 Eatogether',
    category: '飯店百匯',
    priceTwd: 2150,
    originalPriceTwd: 2420,
    discountRate: '88折',
    soldCount: 5100,
    stockCount: 42,
    isPaperTicket: true,
    deliveryEstimate: '現貨發售・免運寄送',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    description: '台灣超人氣自助百匯「饗食天堂」，精選日本生魚片、爐烤現切牛排、炸蝦天婦羅、哈根達斯冰淇淋等百道各國頂級佳餚放題！',
    highlights: [
      '雙人同行專用優惠實體票券',
      '已包含10%服務費，現場直接出示抵用',
      '可於全台饗食天堂分店使用'
    ],
    applicableBranches: ['台北信義店', '台北大直店', '新北板橋店', '桃園中壢店', '台中Top City店', '高雄三多店'],
    tierPricing: [
      { minQty: 1, pricePerUnit: 2150 },
      { minQty: 5, pricePerUnit: 2080 }
    ],
    finePrint: [
      '本券適用平日晚餐或假日午餐乙次雙人份，已含服務費。',
      '優惠期限長達一年，逾期可依票面價值折抵消費。'
    ]
  },
  {
    id: 'vouch-kagaya-onsen',
    title: '【日勝生加賀屋】勝月日式溫泉大眾湯+雙人日式午宴豪華泡湯券',
    brand: '日勝生加賀屋 Kagaya',
    category: '溫泉泡湯',
    priceTwd: 3200,
    originalPriceTwd: 4200,
    discountRate: '76折',
    soldCount: 1800,
    stockCount: 25,
    isPaperTicket: true,
    deliveryEstimate: '實體紙本・特快掛號',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    description: '傳承日本能登半島加賀屋純正日式管家服務與優質白磺溫泉，享受獨立大眾風呂泡湯與天翔廳四季旬味日式會席午宴。',
    highlights: [
      '體驗北投頂級日式純正溫泉名宿',
      '雙人包含溫泉大眾湯與精緻日式午餐',
      '附免費專車接駁至新北投捷運站'
    ],
    applicableBranches: ['台北北投日勝生加賀屋國際溫泉飯店'],
    finePrint: [
      '本券適用於平日，假日使用需現場加價 NT$ 500。',
      '泡湯前請先致電飯店預約席次。'
    ]
  }
];

export const CATEGORY_ITEMS = [
  { id: 'all', name: '全部商品', icon: 'Sparkles', count: 12 },
  { id: '燒肉和牛', name: '燒肉和牛', icon: 'Flame', count: 4 },
  { id: '壽司割烹', name: '壽司割烹', icon: 'Fish', count: 3 },
  { id: '螃蟹海鮮', name: '螃蟹海鮮', icon: 'UtensilsCrossed', count: 2 },
  { id: '鐵板燒', name: '鐵板燒', icon: 'ChefHat', count: 2 },
  { id: '王品集團', name: '王品專區', icon: 'Gift', count: 3 },
  { id: '紙本票券', name: '紙本票券', icon: 'Ticket', count: 4 },
  { id: '溫泉泡湯', name: '溫泉住宿', icon: 'Bath', count: 2 }
];
