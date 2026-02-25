import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Orders } from './components/Orders';
import { AIAssistant } from './components/AIAssistant';
import { Footer } from './components/Footer';
import { Product, CartItem, ViewState } from './types';
import productsData from './data/products.json';

// Mock Data (loaded from data/products.json)
const MOCK_PRODUCTS: Product[] = productsData as Product[];

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product, size: 'M' | 'L' = 'M') => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && (item.size ?? 'M') === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && (item.size ?? 'M') === size ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, size }];
    });
  };

  const handleUpdateQuantity = (id: number, size: 'M' | 'L' | undefined, delta: number) => {
    setCartItems(prev => {
      return prev.flatMap(item => {
        if (item.id === id && (item.size ?? 'M') === (size ?? 'M')) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? [{ ...item, quantity: newQty }] : [];
        }
        return [item];
      });
    });
  };

  const handleRemoveItem = (id: number, size?: 'M' | 'L') => {
    setCartItems(prev => prev.filter(item => !(item.id === id && (item.size ?? 'M') === (size ?? 'M'))));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar 
        cartCount={cartCount} 
        currentView={view} 
        onNavigate={setView} 
      />

      <div className="flex-grow">
        {view === ViewState.HOME && (
          <>
            <Hero onShopNow={() => {
              setView(ViewState.HOME);
              setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} />
            <ProductList products={MOCK_PRODUCTS} onAddToCart={handleAddToCart} />
          </>
        )}

        {(view === ViewState.CART || view === ViewState.CHECKOUT) && (
          <Cart 
            items={cartItems} 
            onUpdateQuantity={handleUpdateQuantity} 
            onRemoveItem={handleRemoveItem}
            onNavigate={setView}
            onClearCart={handleClearCart}
          />
        )}

        {view === ViewState.ORDERS && (
          <Orders />
        )}
      </div>

      <AIAssistant />
      <Footer />
    </div>
  );
}