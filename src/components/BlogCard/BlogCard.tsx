import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogCard.module.css';

interface BlogProps {
  post: {
    id: string;
    title: string;
    slug: string;
    image_url: string;
    excerpt: string;
    date: string;
  };
}

const BlogCard = ({ post }: BlogProps) => {
  return (
    <article className={styles.card}>
      <Link href={`/blog/${post.slug}`} className={styles.imageWrapper}>
        <Image
          src={post.image_url || '/placeholder-coffee.jpg'}
          alt={post.title}
          width={400}
          height={250}
          className={styles.image}
        />
      </Link>
      
      <div className={styles.content}>
        <span className={styles.date}>{post.date}</span>
        <h3 className={styles.title}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        
        <Link href={`/blog/${post.slug}`} className={styles.readMoreBtn}>
          Đọc thêm
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
