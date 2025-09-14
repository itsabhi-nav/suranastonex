'use client';

// import { motion } from 'framer-motion';

interface PageLoadingSkeletonProps {
  type?: 'homepage' | 'marbles' | 'marble-detail' | 'marble-types' | 'about' | 'contact' | 'services' | 'gallery' | 'wishlist';
}

export const PageLoadingSkeleton: React.FC<PageLoadingSkeletonProps> = ({ type = 'homepage' }) => {
  const shimmerEffect = 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';

  const renderHomepageSkeleton = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-100">
        <div className={`absolute inset-0 ${shimmerEffect}`}></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <div className="space-y-6">
            <div className="h-16 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Marbles Skeleton */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded-lg w-1/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderMarblesSkeleton = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-100">
        <div className={`absolute inset-0 ${shimmerEffect}`}></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/3 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Marbles Grid Skeleton */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderMarbleDetailSkeleton = () => (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Skeleton */}
      <div className="py-4 bg-gray-50 border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="flex space-x-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            </div>

            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarbleTypesSkeleton = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-100">
        <div className={`absolute inset-0 ${shimmerEffect}`}></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
            <div className="h-16 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/3 mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Products Section Skeleton */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderGenericSkeleton = () => (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gray-100">
        <div className={`absolute inset-0 ${shimmerEffect}`}></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/3 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  switch (type) {
    case 'homepage':
      return renderHomepageSkeleton();
    case 'marbles':
      return renderMarblesSkeleton();
    case 'marble-detail':
      return renderMarbleDetailSkeleton();
    case 'marble-types':
      return renderMarbleTypesSkeleton();
    default:
      return renderGenericSkeleton();
  }
};

export default PageLoadingSkeleton;
