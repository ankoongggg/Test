import React from 'react';
import { ArrowRight } from 'lucide-react';
import koala from '../assets/koala.png';


interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative bg-brand-light/30 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Trao sức khỏe</span>{' '}
                <br /> 
                <span className="block text-brand-dark xl:inline">Trao yêu thương</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Chào mừng bạn đến với <strong>Traocha</strong>! Chúng tôi mang đến những lá trà tươi ngon nhất, kết hợp với công thức độc đáo. 
                Được đại diện bởi chú <strong>Koala</strong> vui vẻ, mỗi ly trà là một món quà tinh thần giúp bạn thư giãn mỗi ngày.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => window.open('https://www.facebook.com/profile.php?id=61552327743443', '_blank')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-dark hover:bg-green-800 md:py-4 md:text-lg transition-all"
                  >
                    Xem Thêm Về TraoCha
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Visual Representation of the "Koala" and "Bowl" */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center bg-brand-light/50 p-8">
         <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-full flex flex-col items-center justify-center">
            {/* Large Mascot Display (clickable: open Facebook) */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => window.open('https://www.facebook.com/profile.php?id=61552327743443', '_blank')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  window.open('https://www.facebook.com/profile.php?id=61552327743443', '_blank');
                }
              }}
              aria-label="Xem thêm về Traocha trên Facebook"
              className="bg-white p-8 rounded-full shadow-2xl flex flex-col items-center justify-center w-64 h-64 md:w-80 md:h-80 border-4 border-brand-green animate-pulse cursor-pointer"
            >
                <img
                  src={koala}
                  alt="Koala Traocha Mascot"
                  className="w-full h-full object-cover rounded-full opacity-95"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg bg-brand-dark/40 px-6 py-2 rounded-full transform rotate-[-5deg]">Traocha</span>
                </div>
            </div>
            <p className="mt-4 text-brand-dark font-semibold italic">"Uống là mê, Phê pha cùng Koala"</p>
         </div>
      </div>
    </div>
  );
};