import React from 'react';
import { Leaf, Phone, Mail, MapPin, Facebook } from 'lucide-react';
import koala from '../assets/koala.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white p-0.5">
            <img 
              src={koala} 
              alt="Traocha Logo" 
              className="w-full h-full object-cover rounded-full"
           />
          </div>
              <span className="text-2xl font-bold">Traocha</span>
            </div>
            <p className="text-green-100 text-sm">
              Trao sức khỏe, trao yêu thương. Chúng tôi cam kết mang đến những ly trà chất lượng nhất từ thiên nhiên.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-accent">Liên Hệ</h3>
            <ul className="space-y-2 text-green-100 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Trường Đại Học FPT, Hòa Lạc, Hà Nội</span>
              </li>
              <li className="flex items-center gap-2">
                <Facebook size={16} />
                <span>facebook.com/traocha</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>0909 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>hello@traocha.vn</span>
              </li>
              
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-accent">Giờ Mở Cửa</h3>
            <ul className="space-y-2 text-green-100 text-sm">
              <li className="flex justify-between">
                <span>Thứ 2 - Thứ 6:</span>
                <span>7:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>Thứ 7 - CN:</span>
                <span>8:00 - 23:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-800 mt-8 pt-8 text-center text-sm text-green-200">
          <p>&copy; {new Date().getFullYear()} Traocha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};