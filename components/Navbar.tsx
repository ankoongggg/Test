import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { ViewState } from '../types';
import koala from '../assets/koala.png';
interface NavbarProps {
  cartCount: number;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, currentView, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer gap-3"
            onClick={() => {
              onNavigate(ViewState.HOME);
              // ensure we return to top of the page when navigating home
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
            }}
          >
            {/* Using a placeholder Koala image that resembles the requested logo style. 
                In a real deployment, replace 'src' with the uploaded image URL. */}
            <div className="w-14 h-14 overflow-hidden rounded-full border-2 border-brand-green p-1 bg-white">
                <img 
                    src={koala} 
                    alt="Traocha Logo" 
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
            <span className="font-extrabold text-3xl text-brand-dark tracking-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Traocha
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => {
                onNavigate(ViewState.HOME);
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
              }}
              className={`${currentView === ViewState.HOME ? 'text-brand-dark font-bold' : 'text-gray-500'} hover:text-brand-dark transition text-lg`}
            >
              Trang chủ
            </button>
            <button 
              onClick={() => {
                onNavigate(ViewState.HOME);
                setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-gray-500 hover:text-brand-dark transition text-lg"
            >
              Giới thiệu
            </button>
            <button 
              onClick={() => {
                onNavigate(ViewState.HOME);
                setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-gray-500 hover:text-brand-dark transition text-lg"
            >
              Sản phẩm
            </button>
            
          </div>

          {/* Cart Icon */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate(ViewState.ORDERS)}
              className={`p-2 rounded-lg transition ${currentView === ViewState.ORDERS ? 'bg-gray-100 text-brand-dark' : 'text-gray-500 hover:text-brand-dark'}`}
              title="Quản lý đơn hàng (dành cho chủ shop)"
            >
              <Package size={24} />
            </button>
            <button 
              onClick={() => onNavigate(ViewState.CART)}
              className="relative p-2 text-gray-500 hover:text-brand-dark transition"
            >
              <ShoppingCart size={28} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};