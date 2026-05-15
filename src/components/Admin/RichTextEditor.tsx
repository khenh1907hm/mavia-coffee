'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { 
    ssr: false,
    loading: () => <div className="p-10 text-center text-gray-400 bg-gray-50 animate-pulse rounded-3xl h-[400px] flex items-center justify-center">Đang tải công cụ soạn thảo...</div>
  }), []);

  const modules = {
    toolbar: [
      [{ header: [2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'align',
    'color', 'background',
    'link', 'image', 'video'
  ];

  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-gray-200 focus-within:border-coffee-light focus-within:ring-4 focus-within:ring-coffee-light/10 transition-all shadow-inner">
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #f3f4f6 !important;
          padding: 16px 20px !important;
          background: #fafafa;
          font-family: var(--font-poppins);
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
        }
        .ql-toolbar.ql-snow .ql-picker-label {
          font-weight: 600;
          color: #4b5563;
        }
        .ql-container.ql-snow {
          border: none !important;
          font-family: inherit;
          font-size: 16px;
          border-bottom-left-radius: 24px;
          border-bottom-right-radius: 24px;
        }
        .ql-editor {
          min-height: 500px;
          padding: 30px 40px;
          line-height: 1.8;
          color: #374151;
        }
        .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9ca3af;
          left: 40px;
        }
        .ql-editor h2, .ql-editor h3, .ql-editor h4 {
          color: var(--color-coffee-dark, #2c1810);
          font-family: var(--font-poppins);
          font-weight: 700;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .ql-editor h2 { font-size: 1.8rem; }
        .ql-editor h3 { font-size: 1.4rem; }
        .ql-editor p { margin-bottom: 1em; }
        .ql-editor img {
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          margin: 20px 0;
        }
        .ql-editor blockquote {
          border-left: 4px solid var(--color-coffee-light, #c4a484);
          padding-left: 16px;
          color: #6b7280;
          font-style: italic;
          background: #fdfcf9;
          padding: 16px;
          border-radius: 0 12px 12px 0;
        }
      `}</style>
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Bắt đầu viết nội dung chuyên nghiệp của bạn...'}
      />
    </div>
  );
}
