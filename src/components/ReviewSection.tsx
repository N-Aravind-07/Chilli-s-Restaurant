import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Aravind N.",
    location: "Bapatla",
    rating: 5,
    comment: "The Chicken Wings Biryani at Chilli's is absolute heaven! Perfectly spiced basmati rice and wings fried to crisp perfection. Highly recommend it to anyone visiting Bapatla.",
    date: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Jahnavi",
    location: "Srungarapuram",
    rating: 5,
    comment: "A beautiful restaurant for family gatherings. The Butter Chicken is exceptionally rich and creamy, goes perfectly with Butter Naan. The staff is polite, and the service is super fast.",
    date: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Venkatesh B.",
    location: "Karlapalem",
    rating: 5,
    comment: "I have been ordering tandoori and Chinese takeaways from Chilli's for over 4 years. The Chicken 65 and Egg Fried Rice are always consistent in quality, taste, and quantity.",
    date: "3 weeks ago",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Dr. Lakshmi Prasad",
    location: "Bapatla Town",
    rating: 4.8,
    comment: "Great quality food. Highly appreciate their hygienic kitchen practices and safe packaging. The Paneer Biryani and Mushroom Curry are wonderful options for vegetarians.",
    date: "1 month ago",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
  }
];

export const ReviewSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-gray-50/50 dark:bg-black/30 border-y border-gray-100 dark:border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-black dark:text-white">
            What Our Patrons Say
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto my-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            Real customer testimonials sharing their culinary experiences at Chilli's Family Restaurant.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className="glass p-6 rounded-2xl flex flex-col justify-between hover:shadow-xl hover:border-brand-yellow/30 transition-all duration-300 transform hover:-translate-y-1 relative group"
            >
              {/* Quote overlay */}
              <Quote className="absolute top-4 right-4 text-brand-red/10 group-hover:text-brand-red/20 transition-colors" size={40} />

              <div>
                {/* Ratings */}
                <div className="flex items-center gap-0.5 mb-4 text-brand-yellow">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < Math.floor(review.rating) ? 'fill-brand-yellow' : 'opacity-30'} 
                    />
                  ))}
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1.5 mt-0.5">
                    {review.rating.toFixed(1)}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs md:text-sm text-black dark:text-gray-200 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-3 mt-6 border-t border-gray-100 dark:border-white/5 pt-4">
                <img 
                  src={review.avatar} 
                  alt={review.name}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover border border-brand-yellow/30 shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-sm text-black dark:text-white">
                    {review.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {review.location} • {review.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregated Rating Stats */}
        <div className="mt-14 glass max-w-lg mx-auto p-6 rounded-2xl border border-brand-yellow/20 flex flex-col sm:flex-row items-center justify-around text-center gap-4">
          <div className="flex flex-col">
            <span className="text-4xl font-extrabold text-brand-red dark:text-brand-yellow font-sans">
              4.8 ★
            </span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
              Average Rating
            </span>
          </div>
          <div className="w-px h-10 bg-gray-200 dark:bg-gray-800 hidden sm:block" />
          <div className="flex flex-col">
            <span className="text-4xl font-extrabold text-gray-950 dark:text-white font-sans">
              1,275+
            </span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
              Google Customer Reviews
            </span>
          </div>
          <div className="w-px h-10 bg-gray-200 dark:bg-gray-800 hidden sm:block" />
          <div className="flex flex-col">
            <span className="text-4xl font-extrabold text-green-500 font-sans">
              98%
            </span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
              Recommendation Rate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
