import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight, Utensils, Ticket } from 'lucide-react';
import { Restaurant, Voucher } from '../types';

interface AIGourmetAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  restaurants: Restaurant[];
  vouchers: Voucher[];
  onSelectRestaurant: (r: Restaurant) => void;
  onSelectVoucher: (v: Voucher) => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  suggestedItems?: string[];
}

export const AIGourmetAssistant: React.FC<AIGourmetAssistantProps> = ({
  isOpen,
  onClose,
  restaurants,
  vouchers,
  onSelectRestaurant,
  onSelectVoucher,
}) => {
  if (!isOpen) return null;

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: '🤖 您好！我是 3TGDS 饗樂特區 AI 美食隨從。您可以告訴我您的預算、同行人數或偏好的日式料理（例如：「推薦東京高空景觀和牛燒肉」或「推薦夏慕尼/王品紙本餐券」），我將為您嚴選最適解答！',
      suggestedItems: ['rest-jojoen', 'vouch-wangpin-1']
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    '推薦東京晴空塔夜景和牛燒肉',
    '適合家庭團聚的王品紙本餐券',
    '預算 NT$2,000 以下的精選鐵板燒',
    '築地/銀座直送的極上握壽司'
  ];

  const handleSend = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery.trim();
    if (!text || isLoading) return;

    // Add user message
    const newMessages: Message[] = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: text })
      });
      const data = await response.json();

      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          text: data.reply || '已為您查詢相關餐廳與餐券優惠。',
          suggestedItems: data.suggestedItems || []
        }
      ]);
    } catch (err) {
      console.error('AI Error', err);
      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          text: '🤖 已為您搜尋熱門特惠！【敘敘苑晴空塔夜景席】與【夏慕尼鐵板燒紙本餐券】享有企業獨家 85 折優惠喔！',
          suggestedItems: ['rest-jojoen', 'vouch-chamonix-pass']
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl border-l border-stone-200 flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 via-red-950 to-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                3TGDS AI 美食隨從
                <span className="bg-red-600 text-[10px] text-white font-bold px-1.5 py-0.2 rounded">Gemini AI 驅動</span>
              </h2>
              <p className="text-[10px] text-stone-300">智慧分析台日特色美食與企業折扣票券</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-red-600 text-amber-300 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-stone-900 text-white rounded-tr-none'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Suggested Item Recommendation Cards */}
                {msg.suggestedItems && msg.suggestedItems.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {msg.suggestedItems.map((itemId) => {
                      const matchedRest = restaurants.find((r) => r.id === itemId);
                      const matchedVouch = vouchers.find((v) => v.id === itemId);

                      if (matchedRest) {
                        return (
                          <div
                            key={matchedRest.id}
                            onClick={() => {
                              onSelectRestaurant(matchedRest);
                              onClose();
                            }}
                            className="bg-white p-2.5 rounded-xl border border-stone-200 hover:border-red-500 hover:shadow-md transition cursor-pointer flex items-center gap-3 group"
                          >
                            <img
                              src={matchedRest.imageUrl}
                              alt={matchedRest.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded">
                                {matchedRest.category}
                              </span>
                              <h5 className="text-xs font-extrabold text-stone-900 truncate group-hover:text-red-600">
                                {matchedRest.name}
                              </h5>
                              <p className="text-[10px] text-stone-500 font-semibold">
                                {matchedRest.priceRange.split(' - ')[0]} ・ {matchedRest.city}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-red-600 transition" />
                          </div>
                        );
                      }

                      if (matchedVouch) {
                        return (
                          <div
                            key={matchedVouch.id}
                            onClick={() => {
                              onSelectVoucher(matchedVouch);
                              onClose();
                            }}
                            className="bg-white p-2.5 rounded-xl border border-amber-200 hover:border-amber-500 hover:shadow-md transition cursor-pointer flex items-center gap-3 group"
                          >
                            <img
                              src={matchedVouch.imageUrl}
                              alt={matchedVouch.title}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                                實體紙本券
                              </span>
                              <h5 className="text-xs font-extrabold text-stone-900 truncate group-hover:text-amber-700">
                                {matchedVouch.title}
                              </h5>
                              <p className="text-[10px] text-red-600 font-bold">
                                特惠價 NT$ {matchedVouch.priceTwd.toLocaleString()} ({matchedVouch.discountRate})
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 transition" />
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-stone-800 text-white flex items-center justify-center shrink-0 mt-1 text-xs font-bold">
                  您
                </div>
              )}

            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-stone-500">
              <div className="w-7 h-7 rounded-full bg-red-600 text-amber-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <span className="bg-white px-3 py-2 rounded-xl border border-stone-200 font-medium">
                AI 美食隨從正在研析最適方案...
              </span>
            </div>
          )}
        </div>

        {/* Quick Prompts & Input Area */}
        <div className="p-4 bg-white border-t border-stone-200 space-y-3">
          
          {/* Quick Suggestions Pills */}
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((qp) => (
              <button
                key={qp}
                onClick={() => handleSend(qp)}
                className="bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-700 text-[11px] font-medium px-2.5 py-1 rounded-full transition cursor-pointer"
              >
                💡 {qp}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="輸入美食需求，例如：「適合4人節慶聚餐的鐵板燒」"
              className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-stone-800"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputQuery.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white p-2.5 rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
