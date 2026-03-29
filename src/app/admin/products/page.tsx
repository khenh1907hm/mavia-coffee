'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
import { mockProducts } from '@/data/products';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });

    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const syncGUSeries = async () => {
    if (!confirm('Hệ thống sẽ đồng bộ 4 dòng sản phẩm GU vào Database. Bạn có muốn tiếp tục?')) return;

    setSyncing(true);
    setMessage('Đang đồng bộ...');

    try {
      // First, ensure categories exist or just use IDs if already known
      // For simplicity in this demo, we upsert directly
      const productsToSync = mockProducts.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.variants[0].price, // Primary price
        image_url: p.image_url,
        category_id: '86895ce8-89c5-43a5-bcce-e766ea99eb01', // Standard category ID
        stock_quantity: 100,
        // We can store variants and specs as JSONB if the DB supports it
        // p.variants, p.specs
      }));

      const { error } = await supabase
        .from('products')
        .upsert(productsToSync, { onConflict: 'slug' });

      if (error) throw error;

      setMessage('Đồng bộ thành công!');
      fetchProducts();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      console.error(err);
      setMessage('Lỗi: ' + err.message);
    } finally {
      setSyncing(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) fetchProducts();
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-4xl font-serif font-bold text-coffee-dark tracking-tight">Quản lý Sản phẩm</h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">Hệ thống quản lý kho và danh mục Mavia Coffee</p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/admin/products/new"
            className="bg-coffee-light text-white px-8 py-3 rounded-xl flex items-center gap-3 hover:bg-coffee-medium transition-all shadow-lg shadow-coffee-dark/10 active:scale-95 font-semibold"
          >
            <Plus size={22} />
            <span>Thêm Sản phẩm</span>
          </Link>
        </div>
      </div>

      {message && (
        <div className={`p-5 rounded-2xl flex items-center gap-3 animate-fade-in ${message.includes('Lỗi') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
          {message.includes('thành công') ? <CheckCircle2 size={20} /> : null}
          <span className="text-sm font-semibold">{message}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/30">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sản phẩm hoặc mã SKU..."
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
                <th className="px-8 py-5 border-b border-gray-100">Sản phẩm</th>
                <th className="px-6 py-5 border-b border-gray-100">Danh mục</th>
                <th className="px-6 py-5 border-b border-gray-100">Giá Niêm Yết</th>
                <th className="px-6 py-5 border-b border-gray-100">Tồn kho</th>
                <th className="px-8 py-5 border-b border-gray-100 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">Đang tải...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">Không tìm thấy sản phẩm nào.</td></tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/70 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex-shrink-0">
                          <img src={p.image_url} alt={p.name} className="w-full h-full object-cover transform transition-transform group-hover:scale-110 duration-500" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-coffee-dark uppercase text-sm tracking-wide">{p.name}</span>
                          <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded-md self-start border border-gray-100">{p.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-4 py-1.5 bg-coffee-cream/20 text-coffee-dark text-[10px] font-bold uppercase rounded-full border border-coffee-cream/30 tracking-wider">
                        {p.categories?.name || 'Chưa phân loại'}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-gray-800 text-base">{p.price?.toLocaleString()}đ</span>
                        <span className="text-[9px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">Giá bán lẻ</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ring-4 ring-opacity-10 ${p.stock_quantity > 0 ? 'bg-emerald-500 ring-emerald-500' : 'bg-rose-500 ring-rose-500'}`}></div>
                        <span className="text-sm font-bold text-gray-600 tracking-tight">{p.stock_quantity}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-2.5 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-coffee-light hover:border-coffee-light/30 rounded-xl transition-all"
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => deleteProduct(p.id)}
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
