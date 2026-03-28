'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-coffee-dark">Quản lý Sản phẩm</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-coffee-dark text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-coffee-medium transition-all"
        >
          <Plus size={20} />
          <span>Thêm Sản phẩm mới</span>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100">
              <tr>
                <th className="py-4 font-semibold text-gray-600">Sản phẩm</th>
                <th className="py-4 font-semibold text-gray-600">Danh mục</th>
                <th className="py-4 font-semibold text-gray-600">Giá</th>
                <th className="py-4 font-semibold text-gray-600">Kho</th>
                <th className="py-4 font-semibold text-gray-600 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">Đang tải...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">Không tìm thấy sản phẩm nào.</td></tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                        <span className="font-semibold text-coffee-dark uppercase">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">{p.categories?.name}</td>
                    <td className="py-4 font-mono font-medium">{p.price?.toLocaleString()}đ</td>
                    <td className="py-4 text-gray-600">{p.stock_quantity}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/admin/products/${p.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => deleteProduct(p.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
