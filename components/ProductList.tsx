import React, { useState } from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product, size?: 'M' | 'L') => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<number, 'M' | 'L'>>({});
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState<'M' | 'L'>('M');

  const openDetail = (product: Product) => {
    setDetailProduct(product);
    setModalSize(selectedSizes[product.id] ?? 'M');
  };

  const getSize = (productId: number) => selectedSizes[productId] ?? 'M';

  return (
    <div id="products" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">Gian Hàng</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Lựa chọn món yêu thích của bạn từ menu đa dạng của chúng tôi.
          </p>
        </div>

        <div className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const size = getSize(product.id);
            const displayPrice = product.sizes?.[size] ?? product.price;

            return (
              <div key={product.id} className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-90 h-64 cursor-pointer" onClick={() => openDetail(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 cursor-pointer" onClick={() => openDetail(product)}>{product.name}</h3>

                    {/* Size selector moved up next to product name */}
                    <div className="flex items-center gap-2">
                      <button
                        aria-pressed={size === 'M'}
                        onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: 'M' })}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-medium ${size === 'M' ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-700'}`}
                        title="Size M"
                      >
                        M
                      </button>
                      <button
                        aria-pressed={size === 'L'}
                        onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: 'L' })}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-medium ${size === 'L' ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-700'}`}
                        title="Size L"
                      >
                        L
                      </button>
                    </div>
                  </div>

                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <p className="text-lg font-bold text-brand-dark">{displayPrice.toLocaleString('vi-VN')}đ</p>
                    </div>

                    <button
                      onClick={() => onAddToCart(product, size)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-full text-white bg-brand-green hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition-colors shadow-sm"
                    >
                      <Plus size={16} className="mr-1" />
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Detail modal */}
        {detailProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setDetailProduct(null)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 p-6 z-10">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold">{detailProduct.name}</h3>
                <button className="text-gray-500" onClick={() => setDetailProduct(null)}>Đóng</button>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src={detailProduct.image} alt={detailProduct.name} className="w-full h-64 object-cover rounded-lg" />
                <div>
                  <p className="text-gray-700">{detailProduct.fullDescription ?? detailProduct.description}</p>

                  {/* Modal size selector */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="text-lg font-medium text-gray-800">Chọn size:</div>
                    <div className="flex items-center gap-2">
                      <button
                        aria-pressed={modalSize === 'M'}
                        onClick={() => setModalSize('M')}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center text-sm font-medium ${modalSize === 'M' ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-700'}`}
                        title="Size M"
                      >
                        M
                      </button>
                      <button
                        aria-pressed={modalSize === 'L'}
                        onClick={() => setModalSize('L')}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center text-sm font-medium ${modalSize === 'L' ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-700'}`}
                        title="Size L"
                      >
                        L
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 text-lg font-bold text-brand-dark">Giá:</div>
                  <ul className="mt-2">
                    <li>M: {(detailProduct.sizes?.M ?? detailProduct.price).toLocaleString('vi-VN')}đ</li>
                    <li>L: {(detailProduct.sizes?.L ?? detailProduct.price).toLocaleString('vi-VN')}đ</li>
                  </ul>

                  <div className="mt-6">
                    <button
                      onClick={() => {
                        onAddToCart(detailProduct, modalSize);
                        setSelectedSizes({ ...selectedSizes, [detailProduct.id]: modalSize });
                        setDetailProduct(null);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-full text-white bg-brand-green hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green shadow-sm"
                    >
                      <Plus size={16} className="mr-2" />
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};