import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Listing.module.css';

export default function Loading() {
  return (
    <main>
      <Header />
      
      <div className={styles.banner}>
        <div className="container">
          <h1>Sản Phẩm</h1>
          <p>Tất cả các dòng cà phê tuyển chọn từ Mavia</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Sidebar Skeleton */}
            <aside className={styles.sidebar}>
              <div className="space-y-8 animate-pulse">
                {[1, 2].map((group) => (
                  <div key={group} className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            
            {/* Content Skeleton */}
            <div className={styles.content}>
              <div className={styles.toolbar}>
                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                    <div className="w-full h-[300px] bg-gray-200"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                        <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
