'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, Save, Loader2, Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PostFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    image_url: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

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
      if (data.image_url) setImagePreview(data.image_url);
    }
    setLoading(false);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!isEdit) {
      setFormData({
        ...formData,
        title,
        slug: generateSlug(title)
      });
    } else {
      setFormData({ ...formData, title });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `blog/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('mavia-image')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('mavia-image')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = formData.image_url;

      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const payload = {
        ...formData,
        image_url: finalImageUrl
      };

      let error;
      if (isEdit) {
        const { error: err } = await supabase
          .from('posts')
          .update(payload)
          .eq('id', params.id);
        error = err;
      } else {
        const { error: err } = await supabase
          .from('posts')
          .insert([payload]);
        error = err;
      }

      if (!error) {
        router.push('/admin/posts');
      } else {
        console.error(error);
        if (error.message.includes('column "summary" does not exist')) {
          alert('Lỗi: Bạn cần tạo thêm cột "summary" trong bảng "posts" của Supabase. Hãy chạy lệnh SQL sau trong Supabase Editor: ALTER TABLE posts ADD COLUMN IF NOT EXISTS summary TEXT;');
        } else {
          alert('Có lỗi xảy ra: ' + error.message);
        }
      }
    } catch (err: any) {
      alert('Lỗi: ' + err.message);
    } finally {
      setSaving(false);
    }
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

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold uppercase tracking-widest text-coffee-dark mb-1">Tiêu đề bài viết</label>
              <input 
                required
                type="text" 
                placeholder="Nhập tiêu đề hấp dẫn..."
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-coffee-light focus:ring-4 focus:ring-coffee-light/5 transition-all font-medium"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Slug (URL)</label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-coffee-light font-mono text-xs"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold uppercase tracking-widest text-coffee-dark mb-1">Tóm tắt ngắn (Summary)</label>
              <textarea 
                rows={3}
                placeholder="Mô tả ngắn gọn nội dung bài viết để thu hút người đọc..."
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-coffee-light focus:ring-4 focus:ring-coffee-light/5 transition-all text-sm leading-relaxed"
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold uppercase tracking-widest text-coffee-dark mb-1">Hình ảnh bài viết</label>
            <div className="relative group w-full aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center hover:border-coffee-light transition-all cursor-pointer">
              {imagePreview ? (
                <>
                  <Image src={imagePreview} alt="Preview" fill unoptimized className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                    <button 
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                        setFormData({...formData, image_url: ''});
                      }}
                      className="p-3 bg-rose-500 text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-lg"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                    <Upload size={32} className="text-coffee-light" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">Tải ảnh bìa</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold uppercase tracking-widest text-coffee-dark mb-1">Nội dung chi tiết</label>
          <textarea 
            required
            rows={15}
            placeholder="Viết nội dung bài viết ở đây..."
            className="w-full px-6 py-6 bg-gray-50 border border-gray-200 rounded-3xl outline-none focus:border-coffee-light focus:ring-4 focus:ring-coffee-light/5 transition-all text-base leading-relaxed font-serif"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
          />
        </div>

        <div className="flex justify-end gap-5 pt-8 border-t border-gray-50">
          <Link 
            href="/admin/posts" 
            className="px-10 py-4 rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all font-bold uppercase tracking-widest text-xs"
          >
            Hủy bỏ
          </Link>
          <button 
            type="submit"
            disabled={saving}
            className="bg-coffee-dark text-white px-12 py-4 rounded-2xl flex items-center gap-3 hover:bg-coffee-medium transition-all font-bold uppercase tracking-widest text-xs shadow-xl shadow-coffee-dark/20 disabled:opacity-50 active:scale-95"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            <span>{saving ? 'Đang lưu bài...' : 'Lưu bài viết'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
