'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, Save, Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    story: '',
    price: 0,
    image_url: '',
    category_id: '',
    roast_level: 'Medium',
    flavor_notes: [] as string[],
    brew_methods: [] as string[],
    stock_quantity: 0
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchCategories();
    if (isEdit) fetchProduct();
  }, [isEdit]);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    setCategories(data || []);
  };

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single();

    if (!error && data) {
      setFormData({
        ...data,
        flavor_notes: data.flavor_notes || [],
        brew_methods: data.brew_methods || []
      });
      if (data.image_url) setImagePreview(data.image_url);
    }
    setLoading(false);
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
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('mavia-image')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

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
        image_url: finalImageUrl,
        flavor_notes: Array.isArray(formData.flavor_notes) ? formData.flavor_notes : [],
        brew_methods: Array.isArray(formData.brew_methods) ? formData.brew_methods : []
      };

      let error;
      if (isEdit) {
        const { error: err } = await supabase
          .from('products')
          .update(payload)
          .eq('id', params.id);
        error = err;
      } else {
        const { error: err } = await supabase
          .from('products')
          .insert([payload]);
        error = err;
      }

      if (!error) {
        router.push('/admin/products');
      } else {
        alert('Có lỗi xảy ra: ' + error.message);
      }
    } catch (err: any) {
      alert('Lỗi tải ảnh: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-3xl font-serif font-bold text-coffee-dark uppercase">
          {isEdit ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm mới'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Tên sản phẩm</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
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
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Danh mục</label>
            <select 
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
              value={formData.category_id}
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
            >
              <option value="">Chọn danh mục</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Giá (VNĐ)</label>
            <input 
              required
              type="number" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Hình ảnh sản phẩm</label>
          <div className="flex flex-col gap-4">
            <div className="relative group w-full aspect-video md:w-64 md:h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center hover:border-coffee-light transition-all cursor-pointer">
              {imagePreview ? (
                <>
                  <Image 
                    src={imagePreview} 
                    alt="Preview" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                        setFormData({...formData, image_url: ''});
                      }}
                      className="p-2 bg-rose-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Upload size={32} />
                  <span className="text-xs font-medium">Click để chọn ảnh hoặc kéo thả</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
            {formData.image_url && !imageFile && (
              <p className="text-[10px] text-gray-400 font-mono break-all">{formData.image_url}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Mô tả sản phẩm</label>
          <textarea 
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Câu chuyện (Story)</label>
          <textarea 
            rows={6}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
            placeholder="Kể câu chuyện về nguồn gốc, vùng đất và nghệ nhân làm ra sản phẩm này..."
            value={formData.story}
            onChange={(e) => setFormData({...formData, story: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Mức độ rang</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
              value={formData.roast_level}
              onChange={(e) => setFormData({...formData, roast_level: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold uppercase tracking-wider text-gray-600">Số lượng kho</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-coffee-light"
              value={formData.stock_quantity}
              onChange={(e) => setFormData({...formData, stock_quantity: Number(e.target.value)})}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link 
            href="/admin/products" 
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
            <span>{saving ? 'Đang lưu...' : 'Lưu sản phẩm'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
