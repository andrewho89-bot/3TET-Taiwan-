import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Healthcheck
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Gemini Gourmet Assistant API Endpoint
  app.post('/api/gemini/recommend', async (req, res) => {
    try {
      const { userQuery, history = [] } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback response if key is missing
        return res.json({
          reply: `🤖 歡迎來到 3TGDS 饗樂特區美食隨從！\n\n根據您的需求「${userQuery || '推薦熱門餐廳'}」，我為您嚴選以下最受好評的口袋名單：\n\n1. **敘敘苑 Yakiniku Jojoen (晴空塔店)**：位於30樓高空，保證高空夜景席，嚴選A5黑毛和牛與特製醬汁。\n2. **六歌仙 (新宿本店)**：連續多年評選第一，A5和牛與北海道帝王蟹放題！\n3. **【夏慕尼】新香榭鐵板燒餐券**：企業同仁獨享86折，法式白蘭地鴨胸與桌邊火焰秀！\n\n您可直接點擊頁面上的「預約席次」或「搶購紙本券」進行線上訂購喔！`,
          suggestedItems: ['rest-jojoen', 'rest-rokkasen', 'vouch-chamonix-pass']
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `你是一位專業的日本美食與企業福利餐券顧問（3TGDS 饗樂特區 AI 隨從）。
使用者正在尋找餐廳預約或紙本餐券，輸入語句為：
"${userQuery}"

當前 3TGDS 平台可供預約與購買熱門名單包含：
- 敘敘苑 (晴空塔夜景席/和牛燒肉) [ID: rest-jojoen]
- 六歌仙 (新宿A5和牛&帝王蟹放題) [ID: rest-rokkasen]
- 蟹道樂 (道頓堀全蟹懷石) [ID: rest-kanidoraku]
- 美登利壽司 (銀座極上握壽司) [ID: rest-midori]
- 人形町今半 (銀座A5和牛壽喜燒百年名店) [ID: rest-imahan]
- 夏慕尼新香榭鐵板燒 (王品集團法式鐵板燒) [ID: rest-chamonix / vouch-chamonix-pass]
- 王品通用紙本餐券 (1000元面額/買十送一) [ID: vouch-wangpin-1]
- 饗食天堂雙人百匯餐券 [ID: vouch-eatogether]
- 加賀屋溫泉雙人泡湯午宴券 [ID: vouch-kagaya-onsen]

請以親切、專業、富有吸引力且繁體中文的語氣回覆使用者，條理分明地推薦 2~3 間最契合的餐廳或餐券，並說明推薦原因（包含特色、價格與特別禮遇）。
在回答末尾，請以 JSON 區塊格式附帶推薦的 ID 列表，格式如下：
RECOMMENDED_IDS:["rest-jojoen", "vouch-chamonix-pass"]`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const text = response.text || '無法生成回應，請再試一次。';

      // Extract recommended IDs if present
      let suggestedItems: string[] = [];
      const match = text.match(/RECOMMENDED_IDS:\s*(\[[^\]]+\])/);
      if (match) {
        try {
          suggestedItems = JSON.parse(match[1]);
        } catch (e) {
          console.error('Failed to parse suggested IDs', e);
        }
      }

      // Clean response text
      const cleanedReply = text.replace(/RECOMMENDED_IDS:\s*\[[^\]]+\]/g, '').trim();

      return res.json({
        reply: cleanedReply,
        suggestedItems
      });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.json({
        reply: '🤖 抱歉，AI 服務連線稍有延遲。建議您瀏覽首頁熱門的【敘敘苑晴空塔夜景席】或【王品全台通用紙本餐券】，享有企業獨家 85 折優惠！',
        suggestedItems: ['rest-jojoen', 'vouch-wangpin-1']
      });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[3TGDS Benefit Mall Server] listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
