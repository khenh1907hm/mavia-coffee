export const mockProducts = [
  // --- PHA MÁY (ESPRESSO) - 5 Products ---
  {
    id: 'pm1',
    name: 'Espresso Heritage Blend [GU1]',
    slug: 'espresso-heritage-blend-gu1',
    category_name: 'Pha Máy (Espresso)',
    description: 'Thể chất đậm đà, đắng tinh tế, lớp crema dày. Phù hợp cho các dòng cafe máy truyền thống.',
    image_url: 'https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=800',
    price: 305000,
    variants: [
      { weight: '500gr', price: 235000 },
      { weight: '1kg', price: 305000 }
    ],
    specs: {
      ratio: '90% Robusta Natural, 10% Arabica',
      origin: 'Lâm Hà - Lâm Đồng',
      roast: 'Medium - Dark',
      suitable: 'Pha Máy & Phin',
      details: 'Độ ẩm <5%, Cafein >1%'
    }
  },
  {
    id: 'pm2',
    name: 'Espresso Harmony Blend [GU2]',
    slug: 'espresso-harmony-blend-gu2',
    category_name: 'Pha Máy (Espresso)',
    description: 'Sự cân bằng hoàn hảo giữa vị đắng và vị ngọt hậu. Hương thơm nồng nàn.',
    image_url: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=800',
    price: 330000,
    variants: [
      { weight: '500gr', price: 260000 },
      { weight: '1kg', price: 330000 }
    ],
    specs: {
      ratio: '60% Robusta, 40% Arabica',
      origin: 'Cầu Đất - Đà Lạt',
      roast: 'Medium',
      suitable: 'Pha Máy',
      details: 'Vị sạch, hậu vị ngọt'
    }
  },
  {
    id: 'pm3',
    name: 'Mavia Specialty Espresso',
    slug: 'mavia-specialty-espresso',
    category_name: 'Pha Máy (Espresso)',
    description: 'Dòng cà phê đặc sản dành cho người sành điệu. Hương trái cây nhẹ và chocolate.',
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800',
    price: 450000,
    variants: [
      { weight: '250gr', price: 250000 },
      { weight: '500gr', price: 450000 }
    ],
    specs: {
      ratio: '100% Arabica Bourbon',
      origin: 'Cầu Đất',
      roast: 'Light - Medium',
      suitable: 'Pha Máy & Pour Over',
      details: 'Specialty Grade'
    }
  },
  {
    id: 'pm4',
    name: 'Espresso Modernist Blend',
    slug: 'espresso-modernist-blend',
    category_name: 'Pha Máy (Espresso)',
    description: 'Phối trộn hiện đại với hương hoa cỏ và vị chua thanh thoát.',
    image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800',
    price: 380000,
    variants: [
      { weight: '500gr', price: 380000 }
    ],
    specs: {
      ratio: '50% Arabica, 50% Robusta Honey',
      origin: 'Lâm Đồng',
      roast: 'Medium',
      suitable: 'Pha Máy',
      details: 'Hương thơm trái cây chín'
    }
  },
  {
    id: 'pm5',
    name: 'Espresso Dark Roast Classic',
    slug: 'espresso-dark-roast-classic',
    category_name: 'Pha Máy (Espresso)',
    description: 'Đậm đặc cực độ, phù hợp cho Milk-based coffee như Latte, Cappuccino.',
    image_url: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?q=80&w=800',
    price: 290000,
    variants: [
      { weight: '1kg', price: 290000 }
    ],
    specs: {
      ratio: '100% Robusta High-quality',
      origin: 'Tân Hà',
      roast: 'Dark',
      suitable: 'Pha Máy',
      details: 'Body cực dày'
    }
  },

  // --- PHA PHIN - 5 Products ---
  {
    id: 'pp1',
    name: 'Cà Phê Phin Truyền Thống',
    slug: 'ca-phe-phin-truyen-thong',
    category_name: 'Pha Phin',
    description: 'Vị đắng đậm, hương thơm mộc mạc. Gu cà phê phin đúng chất Việt Nam.',
    image_url: 'https://images.unsplash.com/photo-1544787210-2827443cb69e?q=80&w=800',
    price: 180000,
    variants: [
      { weight: '500gr', price: 180000 }
    ],
    specs: {
      ratio: '100% Robusta Natural',
      origin: 'Đắk Lắk',
      roast: 'Dark',
      suitable: 'Pha Phin',
      details: 'Cà phê rang mộc'
    }
  },
  {
    id: 'pp2',
    name: 'Phin Sáng Tạo [GU3]',
    slug: 'phin-sang-tao-gu3',
    category_name: 'Pha Phin',
    description: 'Vị đậm vừa, hậu vị ngọt kéo dài. Thích hợp cho cà phê sữa đá.',
    image_url: 'https://images.unsplash.com/photo-1570968015849-fb9830575653?q=80&w=800',
    price: 220000,
    variants: [
      { weight: '500gr', price: 220000 }
    ],
    specs: {
      ratio: '80% Robusta, 20% Arabica',
      origin: 'Lâm Đồng',
      roast: 'Medium - Dark',
      suitable: 'Pha Phin & Pha Máy',
      details: 'Hậu vị chocolate'
    }
  },
  {
    id: 'pp3',
    name: 'Cà Phê Phin Moka Cầu Đất',
    slug: 'phin-moka-cau-dat',
    category_name: 'Pha Phin',
    description: 'Dòng Moka quý hiếm, hương thơm nồng nàn và vị chua thanh nhẹ nhàng.',
    image_url: 'https://images.unsplash.com/photo-1498408436166-767d2f8e6cba?q=80&w=800',
    price: 350000,
    variants: [
      { weight: '250gr', price: 190000 },
      { weight: '500gr', price: 350000 }
    ],
    specs: {
      ratio: '100% Moka Arabica',
      origin: 'Cầu Đất - Đà Lạt',
      roast: 'Medium',
      suitable: 'Pha Phin & Pour Over',
      details: 'Cà phê cao cấp'
    }
  },
  {
    id: 'pp4',
    name: 'Phin Honey Processed',
    slug: 'phin-honey-processed',
    category_name: 'Pha Phin',
    description: 'Chế biến Honey tạo nên vị ngọt tự nhiên sâu sắc, hương mật ong.',
    image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800',
    price: 280000,
    variants: [
      { weight: '500gr', price: 280000 }
    ],
    specs: {
      ratio: '100% Robusta Honey',
      origin: 'Bảo Lộc',
      roast: 'Medium',
      suitable: 'Pha Phin',
      details: 'Ngọt hậu sâu'
    }
  },
  {
    id: 'pp5',
    name: 'Cà Phê Phin Thượng Hạng',
    slug: 'ca-phe-phin-thuong-hang',
    category_name: 'Pha Phin',
    description: 'Tuyển chọn những hạt cà phê chín mọng nhất, rang tỉ mỉ từng mẻ nhỏ.',
    image_url: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800',
    price: 400000,
    variants: [
      { weight: '500gr', price: 400000 }
    ],
    specs: {
      ratio: 'Blend Arabica & Robusta Fine',
      origin: 'Đà Lạt',
      roast: 'Medium',
      suitable: 'Pha Phin',
      details: 'Vị tinh tế'
    }
  },

  // --- POUR OVER - 5 Products ---
  {
    id: 'po1',
    name: 'Ethiopia Yirgacheffe G1',
    slug: 'ethiopia-yirgacheffe-g1',
    category_name: 'Pour Over',
    description: 'Hương hoa nhài, trà đen và chanh vàng. Một trải nghiệm đỉnh cao của Pour Over.',
    image_url: 'https://images.unsplash.com/photo-1524350303351-800007f7ebe5?q=80&w=800',
    price: 320000,
    variants: [
      { weight: '200gr', price: 320000 }
    ],
    specs: {
      ratio: '100% Arabica Heirloom',
      origin: 'Ethiopia',
      roast: 'Light',
      suitable: 'Pour Over',
      details: 'Clean cup, high acidity'
    }
  },
  {
    id: 'po2',
    name: 'Kenya AA Top',
    slug: 'kenya-aa-top',
    category_name: 'Pour Over',
    description: 'Vị chua của quả mọng đen, cà chua và hương hoa cỏ mạnh mẽ.',
    image_url: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=800',
    price: 350000,
    variants: [
      { weight: '200gr', price: 350000 }
    ],
    specs: {
      ratio: '100% Arabica SL28/SL34',
      origin: 'Kenya',
      roast: 'Light',
      suitable: 'Pour Over',
      details: 'Juicy & Vibrant'
    }
  },
  {
    id: 'po3',
    name: 'Colombia Geisha Inza',
    slug: 'colombia-geisha-inza',
    category_name: 'Pour Over',
    description: 'Dòng Geisha danh tiếng với hương cam quýt và kết thúc ngọt ngào như mật ong.',
    image_url: 'https://images.unsplash.com/photo-1523919335534-48b75fc61288?q=80&w=800',
    price: 850000,
    variants: [
      { weight: '100gr', price: 850000 }
    ],
    specs: {
      ratio: '100% Arabica Geisha',
      origin: 'Colombia',
      roast: 'Light',
      suitable: 'Pour Over',
      details: 'World Class Coffee'
    }
  },
  {
    id: 'po4',
    name: 'Panama Boquete Arabica',
    slug: 'panama-boquete-arabica',
    category_name: 'Pour Over',
    description: 'Hương vị nhẹ nhàng của nhục đậu khấu và trái cây khô.',
    image_url: 'https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?q=80&w=800',
    price: 420000,
    variants: [
      { weight: '200gr', price: 420000 }
    ],
    specs: {
      ratio: '100% Arabica Typica',
      origin: 'Panama',
      roast: 'Light - Medium',
      suitable: 'Pour Over',
      details: 'Balanced body'
    }
  },
  {
    id: 'po5',
    name: 'Vietnam Cầu Đất Typica',
    slug: 'vietnam-cau-dat-typica',
    category_name: 'Pour Over',
    description: 'Đại diện tiêu biểu của Pour Over Việt Nam. Vị chua thanh, hương chocolate nhẹ.',
    image_url: 'https://images.unsplash.com/photo-1506372023823-741c83b836fe?q=80&w=800',
    price: 250000,
    variants: [
      { weight: '250gr', price: 250000 }
    ],
    specs: {
      ratio: '100% Arabica Typica',
      origin: 'Cầu Đất - Đà Lạt',
      roast: 'Light',
      suitable: 'Pour Over',
      details: 'Sweet finish'
    }
  }
];
