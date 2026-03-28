'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function PostFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    image_url: ''
  });

  useEffect(() => {
    if (isEdit) fetchPost();
  }, [isEdit]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', params.id)
      .single();

    if (!error && data) {
      setFormData(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let error;
    if (isEdit) {
      const { error: err } = await supabase
        .from('posts')
        .update(formData)
        .eq('id', params.id);
      error = err;
    } else {
      const { error: err } = await supabase
        .from('posts')
        .insert([formData]);
      error = err;
    }

    if (!error) {
      router.push('/admin/posts');
    } else {
      alert('Có lỗi xảy ra: ' + error.message);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10 text-center">Đang tải bài viết...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/posts" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-3xl font-serif font-bold text-coffee-dark uppercase">
          {isEdit ? 'Chỉnh sửa Bài viết' : 'Thêm Bài viết mới'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Tiêu đề bài viết</label>
          <input 
            required
            type="text" 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Slug (URL)</label>
          <input 
            required
            type="text" 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">URL Hình ảnh</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
            value={formData.image_url}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Nội dung</label>
          <textarea 
            required
            rows={10}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link 
            href="/admin/posts" 
            className="px-8 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all font-semibold"
          >
            Hủy
          </Link>
          <button 
            type="submit"
            disabled={saving}
            className="bg-coffee-dark text-white px-10 py-3 rounded-lg flex items-center gap-2 hover:bg-coffee-medium transition-all font-bold disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            <span>{saving ? 'Đang lưu...' : 'Lưu bài viết'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
