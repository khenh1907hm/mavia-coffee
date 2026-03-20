import styles from './ProductGrid.module.css';
import ProductCard from '../ProductCard/ProductCard';

interface ProductGridProps {
  products: any[];
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
