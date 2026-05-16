import styles from './ProductGrid.module.css';
import ProductCard from '../ProductCard/ProductCard';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string;
  category_name?: string;
  description?: string;
  [key: string]: any; // Allow for other fields from Supabase
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
