import React from 'react';
import { Eye, Camera } from 'lucide-react';

interface GalleryItem {
  id: number;
  category: 'food' | 'interior' | 'kitchen';
  title: string;
  subtitle: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    category: 'food',
    title: 'Sizzling Tandoori Platter',
    subtitle: 'Freshly barbecued skewers cooked in our clay tandoor',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    category: 'interior',
    title: 'Modern Dining Space',
    subtitle: 'Air-conditioned premium seating for family dine-ins',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    category: 'food',
    title: 'Hyderabadi Dum Biryani',
    subtitle: 'Slow cooked long grain basmati rice loaded with saffron',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    category: 'kitchen',
    title: 'Pristine Kitchen Station',
    subtitle: 'Highly hygienic equipment conforming to safety standards',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    category: 'food',
    title: 'Chilli Chicken Sizzler',
    subtitle: 'Stir-fried in heavy woks with authentic sauces',
    image: 'https://images.unsplash.com/photo-1603133872878-685f58882791?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    category: 'interior',
    title: 'Welcoming Ambiance',
    subtitle: 'Comfortable layouts designed for hosting heavy gatherings',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=80'
  }
];

export const Gallery: React.FC = () => {
  const [filter, setFilter] = React.useState<'all' | 'food' | 'interior' | 'kitchen'>('all');
  const [lightbox, setLightbox] = React.useState<string | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-gray-950 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-brand-red dark:text-brand-yellow text-xs font-bold uppercase tracking-widest mb-3">
            <Camera size={14} />
            <span>Visual Showcase</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Experience Chilli's
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto my-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            Take a virtual tour of our kitchen hygiene standards, cozy dining setups, and mouthwatering cuisines.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {(['all', 'food', 'interior', 'kitchen'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750 dark:text-gray-300'
              }`}
            >
              {cat === 'all' ? 'All Photos' : cat}
            </button>
          ))}
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item.image)}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-premium border border-gray-100 dark:border-white/5 cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Glassmorphic info overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-350 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-bold text-lg leading-tight mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-300 mt-1 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white">
                    <Eye size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 transition-all duration-300"
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={lightbox}
              alt="Gallery Preview"
              className="w-full h-full object-contain max-h-[80vh]"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white font-bold p-2 px-3 rounded-full cursor-pointer transition-colors"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
