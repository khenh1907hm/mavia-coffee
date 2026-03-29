'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2, Search, FileText } from 'lucide-react';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setPosts(data || []);
    setLoading(false);
  };

  const deletePost = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (!error) fetchPosts();
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-4xl font-serif font-bold text-coffee-dark tracking-tight hover:text-coffee-light transition-colors">Quản lý Bài viết</h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">Biên tập và đăng tải những nội dung hấp dẫn về Mavia Coffee</p>
        </div>
        
        <Link 
          href="/admin/posts/new" 
          className="bg-coffee-dark text-white px-8 py-3 rounded-xl flex items-center gap-3 hover:bg-coffee-medium transition-all shadow-lg shadow-coffee-dark/10 active:scale-95 font-semibold"
        >
          <Plus size={22} />
          <span>Thêm Bài viết</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/30">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm tiêu đề hoặc nội dung..."
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:border-coffee-light focus:ring-4 focus:ring-coffee-light/5 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto p-2">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] uppercase tracking-[0.15em] text-gray-400 font-bold">
                <th className="px-8 py-5 border-b border-gray-100">Bài viết & Hình ảnh</th>
                <th className="px-6 py-5 border-b border-gray-100">Ngày đăng</th>
                <th className="px-6 py-5 border-b border-gray-100">Trạng thái</th>
                <th className="px-8 py-5 border-b border-gray-100 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="py-10 text-center text-gray-400">Đang tải...</td></tr>
              ) : filteredPosts.length === 0 ? (
                <tr><td colSpan={4} className="py-10 text-center text-gray-400 italic">Không có bài viết nào phù hợp.</td></tr>
              ) : (
                filteredPosts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/70 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden shadow-sm border border-gray-100 flex-shrink-0">
                          <img 
                            src={p.image_url?.startsWith('http') || p.image_url?.startsWith('/') ? p.image_url : 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=200'}
                            alt={p.title} 
                            className="w-full h-full object-cover transform transition-transform group-hover:scale-110 duration-500" 
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-coffee-dark uppercase text-sm tracking-wide line-clamp-1">{p.title}</span>
                          <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded-md self-start border border-gray-100">{p.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="text-gray-700 font-semibold text-sm">{new Date(p.created_at).toLocaleDateString('vi-VN')}</span>
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">Thời gian đăng</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-full border border-emerald-100 tracking-wider">
                        Đã đăng
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <Link 
                          href={`/admin/posts/${p.id}/edit`}
                          className="p-2.5 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-coffee-light hover:border-coffee-light/30 rounded-xl transition-all"
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => deletePost(p.id)}
                          className="p-2.5 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-rose-600 hover:border-rose-100 rounded-xl transition-all"
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
    </div>
  );
}
