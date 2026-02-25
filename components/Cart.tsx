import React, { useState } from 'react';
import { CartItem, ViewState } from '../types';
import { Trash2, MapPin, CreditCard, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { submitOrder } from '../services/orderService';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, size: 'M' | 'L' | undefined, delta: number) => void;
  onRemoveItem: (id: number, size?: 'M' | 'L') => void;
  onNavigate: (view: ViewState) => void;
  onClearCart: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem, onNavigate, onClearCart }) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const total = items.reduce((sum, item) => {
    const unitPrice = item.sizes?.[item.size ?? 'M'] ?? item.price;
    return sum + unitPrice * item.quantity;
  }, 0);
  const shippingFee = total > 0 ? 10000 : 0; // Phí ship cố định
  const finalTotal = total + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...forasync (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.phone || !formData.address) {
        throw new Error('Vui lòng điền đầy đủ thông tin');
      }

      // Submit order to Firebase
      const id = await submitOrder(
        formData.name,
        formData.phone,
        formData.address,
        formData.note,
        items,
        total,
        shippingFee,2 text-sm text-gray-500">Mã đơn hàng: <span className="font-mono font-semibold">{orderId}</span></p>
        <p className="mt-4 text-lg text-gray-500">
          Cảm ơn {formData.name} đã ủng hộ TraoCha. Koala đang chuẩn bị đồ uống và sẽ giao đến bạn sớm nhất!
        </p>
        <p className="mt-2 text-sm text-gray-500">
          📧 Chúng tôi sẽ gửi thông tin chi tiết đơn hàng về email của quản lý
        'thanhan15082004@gmail.com'
      );

      setOrderId(id);
      setStep('success');
      onClearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định');
      console.error('Order submission error:', err);
    } finally {
      setIsLoading(false);
    }t(() => {
      setStep('success');
      onClearCart();
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">Đặt hàng thành công!</h2>
        <p className="mt-4 text-lg text-gray-500">
          Cảm ơn {formData.name} đã ủng hộ TraoCha. Koala đang chuẩn bị đồ uống và sẽ giao đến bạn sớm nhất!
        </p>
        <button
          onClick={() => onNavigate(ViewState.HOME)}
          className="mt-8 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-dark hover:bg-green-800"
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  if (items.length === 0 && step === 'cart') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Giỏ hàng của bạn đang trống</h2>
        <p className="mt-2 text-gray-500">Hãy thêm vài món ngon từ thực đơn nhé!</p>
        <button
          onClick={() => onNavigate(ViewState.HOME)}
          className="mt-6 px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-dark bg-brand-light hover:bg-green-200"
        >
          Xem Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        {step === 'cart' ? 'Giỏ Hàng' : 'Đặt Ship & Thanh Toán'}
      </h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Cart Items List */}
        <section className={`lg:col-span-7 ${step === 'checkout' ? 'hidden lg:block opacity-75' : ''}`}>
          <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {items.map((item) => (
              <li key={`${item.id}-${item.size ?? 'M'}`} className="flex py-6">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-sm">
                        <span className="font-medium text-gray-700 hover:text-gray-800">{item.name}</span>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{item.size ?? 'M'}</span>
                      </h4>
                      <p className="ml-4 text-sm font-medium text-gray-900">
                        {((item.sizes?.[item.size ?? 'M'] ?? item.price) * item.quantity).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex-1 flex items-end justify-between">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.size, -1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        disabled={step === 'checkout'}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-900 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.size, 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        disabled={step === 'checkout'}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id, item.size)}
                      className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
                      disabled={step === 'checkout'}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order Summary & Checkout Form */}
        <section className="lg:col-span-5 mt-16 lg:mt-0 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 sticky top-24">
          <h2 className="text-lg font-medium text-gray-900">Tổng đơn hàng</h2>
{error && (
                <div className="rounded-md bg-red-50 p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <h3 className="text-md font-medium text-gray-900 flex items-center">
                <MapPin size={18} className="mr-2" /> Thông tin giao hàng
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Họ tên</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green sm:text-sm p-2 border disabled:bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green sm:text-sm p-2 border disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green sm:text-sm p-2 border disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ghi chú (tùy chọn)</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  rows={2}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green sm:text-sm p-2 border disabled:bg-gray-100"
                  placeholder="VD: Không đường, thêm đá..."
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-md font-medium text-gray-900 flex items-center mb-4">
                  <CreditCard size={18} className="mr-2" /> Đóng tiền (Thanh toán)
                </h3>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input type="radio" name="payment" defaultChecked disabled={isLoading} className="h-4 w-4 text-brand-dark focus:ring-brand-green border-gray-300" />
                        <span className="ml-2 text-sm text-gray-700">Tiền mặt (COD)</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="payment" disabled={isLoading} className="h-4 w-4 text-brand-dark focus:ring-brand-green border-gray-300" />
                        <span className="ml-2 text-sm text-gray-700">Chuyển khoản</span>
                    </label>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                 <button
                  type="button"
                  onClick={() => setStep('cart')}
                  disabled={isLoading}
                  className="flex-1 bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none disabled:bg-gray-100 disabled:opacity-50"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-brand-dark border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:bg-gray-400 disabled:opacity-50"
                >
                  {isLoading ? 'Đang xử lý...' : 'Xác nhận đặt'}

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-md font-medium text-gray-900 flex items-center mb-4">
                  <CreditCard size={18} className="mr-2" /> Đóng tiền (Thanh toán)
                </h3>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-brand-dark focus:ring-brand-green border-gray-300" />
                        <span className="ml-2 text-sm text-gray-700">Tiền mặt (COD)</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="payment" className="h-4 w-4 text-brand-dark focus:ring-brand-green border-gray-300" />
                        <span className="ml-2 text-sm text-gray-700">Chuyển khoản</span>
                    </label>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                 <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="flex-1 bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-dark border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green"
                >
                  Xác nhận đặt
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};