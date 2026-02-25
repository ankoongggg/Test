import { GoogleGenAI } from "@google/genai";

export const getDrinkRecommendation = async (userMood: string): Promise<string> => {
  try {
    // Note: process.env.API_KEY is automatically injected in the environment
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Bạn là 'Koala AI', trợ lý ảo dễ thương của quán trà 'Traocha'.
      Người dùng đang cảm thấy: "${userMood}".
      
      Hãy gợi ý 1 loại đồ uống phù hợp (Trà xanh, Trà sữa, Trà thảo mộc, v.v.) và đưa ra lời khuyên ngắn gọn, ấm áp để cổ vũ họ.
      Giữ giọng điệu vui vẻ, dễ thương, ngắn gọn dưới 50 từ.
      Đừng đưa ra danh sách, chỉ chọn 1 món tốt nhất.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-latest',
      contents: prompt,
    });

    return response.text || "Koala đang bận ngủ một chút, bạn thử Trà Sữa Truyền Thống nhé!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Mạng hơi chập chờn, nhưng một ly trà xanh mát lạnh sẽ giúp bạn vui hơn!";
  }
};