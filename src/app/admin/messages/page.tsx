'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Search, Eye, Trash2, Calendar, User, Phone, Tag, MessageSquare, X, CheckCircle } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setMessages(data || []);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contacts')
      .update({ status: 'read' })
      .eq('id', id);

    if (!error) {
      setMessages(messages.map(m => m.id === id ? { ...m, status: 'read' } : m));
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: 'read' });
      }
    }
  };

  const deleteMessage = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa tin nhắn này?')) {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (!error) {
        setMessages(messages.filter(m => m.id !== id));
        setSelectedMessage(null);
      }
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto animate-fade-in">
      {/* Header Area */}
      <div className="flex justify-between items-end pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-4xl font-serif font-bold text-coffee-dark tracking-tight">Quản lý Tin nhắn</h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">Theo dõi và phản hồi các yêu cầu từ khách hàng</p>
        </div>
      </div>

      {/* Stats/Filter Area */}
      <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/30">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm người gửi, email hoặc chủ đề..."
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:border-coffee-light focus:ring-4 focus:ring-coffee-light/5 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <div className="px-5 py-2.5 bg-white rounded-xl border border-gray-200 text-[11px] font-bold uppercase tracking-widest text-gray-500 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Tổng: {messages.length}
            </div>
            <div className="px-5 py-2.5 bg-white rounded-xl border border-gray-200 text-[11px] font-bold uppercase tracking-widest text-gray-500 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              Mới: {messages.filter(m => m.status === 'new').length}
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                <th className="px-8 py-6 border-b border-gray-100">Người gửi</th>
                <th className="px-6 py-6 border-b border-gray-100">Chủ đề</th>
                <th className="px-6 py-6 border-b border-gray-100">Thời gian</th>
                <th className="px-6 py-6 border-b border-gray-100">Trạng thái</th>
                <th className="px-8 py-6 border-b border-gray-100 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-coffee-light/30 border-t-coffee-light rounded-full animate-spin"></div>
                      <span className="text-gray-400 font-medium italic">Đang tải tin nhắn...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-300">
                      <Mail size={64} strokeWidth={1} />
                      <p className="font-serif italic text-lg">Chưa có tin nhắn nào được ghi nhận.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((m) => (
                  <tr key={m.id} className={`group hover:bg-gray-50/70 transition-all ${m.status === 'new' ? 'bg-amber-50/10' : ''}`}>
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-1.5xl flex items-center justify-center text-white font-bold text-lg shadow-sm ${m.status === 'new' ? 'bg-coffee-dark' : 'bg-gray-300'}`}>
                          {m.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold uppercase tracking-wide truncate max-w-[200px] ${m.status === 'new' ? 'text-coffee-dark' : 'text-gray-500'}`}>
                            {m.name}
                          </span>
                          <span className="text-xs text-gray-400 lowercase">{m.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-7">
                      <div className="flex items-center gap-2">
                        <Tag size={12} className="text-coffee-light opacity-50" />
                        <span className="text-[13px] font-semibold text-gray-700">{m.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-7">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-gray-600">{new Date(m.created_at).toLocaleDateString('vi-VN')}</span>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-0.5">
                          {new Date(m.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-7">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        m.status === 'new' 
                          ? 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      }`}>
                        {m.status === 'new' ? 'Mới' : 'Đã đọc'}
                      </span>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button 
                          onClick={() => setSelectedMessage(m)}
                          className="p-3 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-coffee-light hover:border-coffee-light/30 rounded-xl transition-all"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => deleteMessage(m.id)}
                          className="p-3 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-rose-600 hover:border-rose-100 rounded-xl transition-all"
                          title="Xoa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-coffee-dark/40 backdrop-blur-md" onClick={() => setSelectedMessage(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-coffee-dark text-white rounded-2xl">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-coffee-dark italic">Chi tiết tin nhắn</h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">ID: {selectedMessage.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="p-2 hover:bg-white rounded-full transition-colors text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-10 space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <User size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Họ và Tên</span>
                  </div>
                  <p className="text-base font-bold text-coffee-dark uppercase tracking-wide border-b border-gray-50 pb-2">{selectedMessage.name}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Email</span>
                  </div>
                  <p className="text-base font-medium text-gray-700 border-b border-gray-50 pb-2 truncate">{selectedMessage.email}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Phone size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Điện thoại</span>
                  </div>
                  <p className="text-base font-bold text-gray-700 border-b border-gray-50 pb-2">{selectedMessage.phone}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Tag size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Chủ đề</span>
                  </div>
                  <p className="text-base font-bold text-coffee-light border-b border-gray-50 pb-2">{selectedMessage.subject}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <MessageSquare size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Nội dung tin nhắn</span>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-gray-600 leading-relaxed font-medium">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-400 text-xs font-medium">
                <Calendar size={14} />
                <span>Gửi lúc: {new Date(selectedMessage.created_at).toLocaleString('vi-VN')}</span>
              </div>
              <div className="flex gap-4">
                {selectedMessage.status === 'new' ? (
                  <button 
                    onClick={() => markAsRead(selectedMessage.id)}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10"
                  >
                    <CheckCircle size={14} />
                    Đánh dấu đã đọc
                  </button>
                ) : (
                  <div className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                    <CheckCircle size={14} />
                    Đã xử lý
                  </div>
                )}
                <button 
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="px-6 py-3 bg-white border border-rose-100 text-rose-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-rose-50 transition-all"
                >
                  Xóa yêu cầu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
