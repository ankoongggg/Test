import React, { useState, useEffect } from 'react';
import { getAllOrders, Order } from '../services/orderService';
import { PackageOpen, Loader, RefreshCw, MapPin, Phone, Clock } from 'lucide-react';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      setError('Lỗi khi tải đơn hàng');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'shipped':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      default:
        return status;
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Loader className="h-12 w-12 text-brand-dark mx-auto animate-spin" />
        <p className="mt-4 text-gray-600">Đang tải đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Quản lý Đơn Hàng</h1>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-brand-dark text-white rounded-lg hover:bg-green-800 disabled:bg-gray-400"
        >
          <RefreshCw size={18} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          Làm mới
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <PackageOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Chưa có đơn hàng nào</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Đơn #{order.id.substring(0, 8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 flex items-center">
                    <Clock size={16} className="mr-2" />
                    {new Date(order.createdAt).toLocaleString('vi-VN')}
                  </p>
                </div>
                <span className={`${getStatusColor(order.status)} px-3 py-1 rounded-full text-sm font-medium inline-block`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>

              {/* Order Details */}
              <div className="px-6 py-4">
                {/* Customer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Khách hàng</p>
                    <p className="font-medium text-gray-900">{order.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center">
                      <Phone size={14} className="mr-1" />
                      Số điện thoại
                    </p>
                    <p className="font-medium text-gray-900">{order.phone}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500 mb-1 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      Địa chỉ
                    </p>
                    <p className="font-medium text-gray-900">{order.address}</p>
                  </div>
                  {order.note && (
                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Ghi chú</p>
                      <p className="text-gray-700">{order.note}</p>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Sản phẩm</p>
                  <div className="bg-white space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-b-0">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item.name}
                            <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                              {item.size || 'M'}
                            </span>
                          </p>
                          <p className="text-gray-500">SL: {item.quantity}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-medium text-gray-900">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="flex justify-end gap-8 pt-4 border-t border-gray-200">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Tạm tính</p>
                    <p className="font-semibold text-gray-900">
                      {order.total.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Phí ship</p>
                    <p className="font-semibold text-gray-900">
                      {order.shippingFee.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Tổng cộng</p>
                    <p className="text-lg font-bold text-brand-dark">
                      {order.finalTotal.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {orders.length > 0 && (
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-brand-dark">
              {orders.filter(o => o.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Chờ xác nhận</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'confirmed').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Đã xác nhận</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">
              {orders.filter(o => o.status === 'shipped').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Đang giao</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Đã giao</p>
          </div>
        </div>
      )}
    </div>
  );
};
