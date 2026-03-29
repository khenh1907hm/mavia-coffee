'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  ShoppingBag, 
  Search, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Truck,
  ChevronRight,
  Filter,
  Eye
} from 'lucide-react';

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_email: string;
  note: string;
  payment_method: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
  weight: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) console.error('Error fetching orders:', error);
    else setOrders(data || []);
    setLoading(false);
  };

  const fetchOrderItems = async (orderId: string) => {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);
    
    if (error) console.error('Error fetching items:', error);
    else setOrderItems(data || []);
  };

  const handleViewDetails = async (order: Order) => {
    setSelectedOrder(order);
    await fetchOrderItems(order.id);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      alert('Lỗi khi cập nhật trạng thái');
    } else {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12}/> Chờ xử lý</span>;
      case 'processing': return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Truck size={12}/> Đang giao</span>;
      case 'delivered': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle2 size={12}/> Hoàn thành</span>;
      case 'cancelled': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><XCircle size={12}/> Đã hủy</span>;
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customer_phone.includes(searchTerm) ||
      order.id.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-black text-coffee-dark uppercase tracking-tighter">Quản lý Đơn hàng</h1>
            <p className="text-gray-500 mt-1">Theo dõi và xử lý các đơn hàng từ khách hàng</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Tìm tên, SĐT, mã đơn..."
                className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-coffee-light outline-none transition-all w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <Filter size={18} className="text-gray-400" />
              <select 
                className="bg-transparent border-none outline-none font-bold text-sm text-coffee-dark cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang xử lý</option>
                <option value="delivered">Đã hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-black uppercase tracking-widest text-gray-400">
                <th className="px-8 py-6">Mã đơn hàng</th>
                <th className="px-8 py-6">Khách hàng</th>
                <th className="px-8 py-6">Ngày đặt</th>
                <th className="px-8 py-6">Tổng tiền</th>
                <th className="px-8 py-6">Thanh toán</th>
                <th className="px-8 py-6">Trạng thái</th>
                <th className="px-8 py-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-gray-400">Đang tải dữ liệu...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-gray-400">Không tìm thấy đơn hàng nào</td>
                </tr>
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6 font-mono text-xs text-gray-400">
                    #{order.id.split('-')[0].toUpperCase()}
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-coffee-dark">{order.customer_name}</div>
                    <div className="text-xs text-gray-400">{order.customer_phone}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-8 py-6 font-black text-coffee-dark">
                    {formatPrice(order.total_amount)}
                   </td>
                  <td className="px-8 py-6 uppercase text-[10px] font-black tracking-widest text-coffee-light">
                    {order.payment_method}
                  </td>
                  <td className="px-8 py-6">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleViewDetails(order)}
                      className="p-3 bg-gray-50 text-coffee-dark rounded-xl hover:bg-coffee-dark hover:text-white transition-all shadow-sm"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row translate-y-0 animate-in slide-in-from-bottom-8 duration-500">
              {/* Left Column - Products */}
              <div className="flex-1 p-10 overflow-y-auto no-scrollbar border-r border-gray-100">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                  <h2 className="text-2xl font-serif font-black text-coffee-dark uppercase">Chi tiết đơn hàng</h2>
                  <span className="text-xs font-mono text-gray-300">#{selectedOrder.id}</span>
                </div>

                <div className="space-y-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center gap-4 bg-gray-50 p-4 rounded-3xl">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                          <ShoppingBag className="text-coffee-light" size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-coffee-dark leading-tight">{item.product_name}</p>
                          <p className="text-xs text-coffee-light font-bold uppercase tracking-widest">{item.weight}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">{item.quantity} x {formatPrice(item.price)}</p>
                        <p className="font-black text-coffee-dark">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-gray-50 flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-1">Tổng cộng đơn hàng</p>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <p className="text-4xl font-black text-coffee-dark">{formatPrice(selectedOrder.total_amount)}</p>
                </div>
              </div>

              {/* Right Column - Customer Info & Actions */}
              <div className="w-full md:w-[350px] bg-gray-50 p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Thông tin khách hàng</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Họ và tên</p>
                      <p className="font-bold text-coffee-dark">{selectedOrder.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Số điện thoại</p>
                      <p className="font-bold text-coffee-dark">{selectedOrder.customer_phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Địa chỉ giao hàng</p>
                      <p className="font-bold text-coffee-dark text-sm leading-relaxed">{selectedOrder.customer_address}</p>
                    </div>
                    {selectedOrder.customer_email && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Email</p>
                        <p className="font-bold text-coffee-dark text-sm">{selectedOrder.customer_email}</p>
                      </div>
                    )}
                    {selectedOrder.note && (
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-400 mb-1 font-bold italic">Ghi chú từ khách:</p>
                        <p className="text-xs text-coffee-dark italic leading-relaxed">{selectedOrder.note}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Cập nhật trạng thái</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                      className="px-4 py-3 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-xl hover:bg-blue-200 transition-all"
                    >
                      ĐANG GIAO
                    </button>
                    <button 
                      onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                      className="px-4 py-3 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-xl hover:bg-green-200 transition-all"
                    >
                      HOÀN THÀNH
                    </button>
                    <button 
                      onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                      className="px-4 py-3 bg-red-100 text-red-700 text-[10px] font-black uppercase rounded-xl hover:bg-red-200 transition-all"
                    >
                      HỦY ĐƠN
                    </button>
                    <button 
                      onClick={() => setSelectedOrder(null)}
                      className="px-4 py-3 bg-gray-200 text-gray-600 text-[10px] font-black uppercase rounded-xl hover:bg-gray-300 transition-all"
                    >
                      ĐÓNG
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
