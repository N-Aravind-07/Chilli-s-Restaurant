import React from 'react';
import { Heart, Star, Plus, Minus, Flame } from 'lucide-react';
import { MenuItem } from '../data/menu';
import { store } from '../services/store';

interface DishCardProps {
  item: MenuItem;
}

export const DishCard: React.FC<DishCardProps> = ({ item }) => {
  const [state, setState] = React.useState({
    isFavorite: store.user?.wishlist?.includes(item.id) || false,
    quantityInCart: store.cart.find((c) => c.menuItem.id === item.id)?.quantity || 0
  });

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState({
        isFavorite: store.user?.wishlist?.includes(item.id) || false,
        quantityInCart: store.cart.find((c) => c.menuItem.id === item.id)?.quantity || 0
      });
    });
    return unsubscribe;
  }, [item.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleFavorite(item.id);
  };

  const handleCardClick = () => {
    store.addToRecentlyViewed(item.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.addToCart(item);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.updateCartQty(item.id, state.quantityInCart + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state.quantityInCart === 1) {
      store.removeFromCart(item.id);
    } else {
      store.updateCartQty(item.id, state.quantityInCart - 1);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-premium hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full transform hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* Photo header area */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating overlays */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {/* Veg/Non-Veg Badge */}
          <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
            item.isVeg 
              ? 'bg-green-500/90 text-white' 
              : 'bg-brand-red/90 text-white'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-white ${item.isVeg ? 'animate-pulse' : ''}`} />
            {item.isVeg ? 'Veg' : 'Non-Veg'}
          </span>

          {/* Popular/Trending Ribbon */}
          {item.isPopular && (
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase bg-brand-yellow text-brand-purple px-2 py-0.5 rounded-full border border-brand-yellow/30">
              <Flame size={10} className="fill-brand-red text-brand-red" />
              <span>Popular</span>
            </span>
          )}
        </div>

        {/* Favorite Icon */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full glass hover:bg-white/20 dark:hover:bg-black/30 text-gray-500 dark:text-gray-400 hover:text-brand-red transition-all duration-200 z-10 cursor-pointer"
          title="Add to Favorites"
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-200 ${state.isFavorite ? 'fill-brand-red text-brand-red scale-110' : ''}`} 
          />
        </button>

        {/* Ratings overlay */}
        <div className="absolute bottom-3 right-3 glass px-2 py-0.5 rounded-lg flex items-center gap-1 text-xs font-bold text-brand-purple dark:text-brand-yellow border border-white/20">
          <Star size={12} className="fill-brand-yellow text-brand-yellow" />
          <span>{item.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Info details body area */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-serif font-bold text-lg text-gray-800 dark:text-gray-100 group-hover:text-brand-red dark:group-hover:text-brand-yellow transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 min-h-[32px]">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-gray-950 dark:text-white font-sans">
              ₹{item.price}
            </span>
            <span className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">
              Inclusive Tax
            </span>
          </div>

          {/* Dynamic Quantity Controller button */}
          {state.quantityInCart > 0 ? (
            <div className="flex items-center bg-brand-red text-white rounded-xl shadow-md overflow-hidden transition-all duration-200">
              <button
                onClick={handleDecrement}
                className="p-2.5 hover:bg-brand-red/90 transition-colors active:bg-brand-red/80 cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="px-3 font-bold text-sm select-none">
                {state.quantityInCart}
              </span>
              <button
                onClick={handleIncrement}
                className="p-2.5 hover:bg-brand-red/90 transition-colors active:bg-brand-red/80 cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2.5 bg-gray-100 hover:bg-brand-red dark:bg-gray-800 dark:hover:bg-brand-red text-gray-800 dark:text-white hover:text-white rounded-xl font-bold text-xs transition-all duration-200 border border-transparent hover:border-brand-red/10 active:scale-95 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-brand-red/20"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
