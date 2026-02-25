import React, { useState } from 'react';
import { getDrinkRecommendation } from '../services/geminiService';
import { Sparkles, MessageCircle, X } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState('');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    const result = await getDrinkRecommendation(mood);
    setRecommendation(result);
    setLoading(false);
  };

  return (
  <div className="fixed bottom-6 right-6 z-[9999]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-accent text-brand-dark p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center gap-2 font-bold"
        >
          <Sparkles size={20} />
          Hỏi Koala
        </button>
      )}

      {isOpen && (
        <div className="relative z-[10000] bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border-2 border-brand-green animate-fade-in-up">
          <div className="bg-brand-green p-4 flex justify-between items-center text-white">
            <h3 className="font-bold flex items-center gap-2">
              <MessageCircle size={20} />
              Koala Trợ Lý
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded p-1">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4">
            {!recommendation ? (
              <>
                <p className="text-gray-600 mb-4 text-sm">
                  Chào bạn! Hôm nay tâm trạng bạn thế nào? Koala sẽ chọn đồ uống hợp nhất cho bạn nhé!
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="Vui, buồn, mệt, hay đang yêu..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    onKeyDown={(e) => e.key === 'Enter' && handleRecommend()}
                  />
                  <button
                    onClick={handleRecommend}
                    disabled={loading || !mood.trim()}
                    className="bg-brand-dark text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-800 disabled:opacity-50"
                  >
                    {loading ? '...' : 'Gửi'}
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="bg-brand-light p-3 rounded-lg text-brand-dark text-sm border border-green-200">
                  <p className="font-bold mb-1">Koala khuyên rằng:</p>
                  {recommendation}
                </div>
                <button
                  onClick={() => {
                    setRecommendation(null);
                    setMood('');
                  }}
                  className="text-xs text-gray-500 hover:text-brand-dark underline w-full text-center"
                >
                  Thử lại
                </button>
              </div>
            )}
          </div>
          
          {/* Decorative Koala face element */}
          <div className="h-2 bg-gradient-to-r from-brand-green to-brand-accent"></div>
        </div>
      )}
    </div>
  );
};