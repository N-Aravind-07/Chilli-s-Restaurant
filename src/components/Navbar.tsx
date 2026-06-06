import React from 'react';
import { ShoppingCart, Heart, Sun, Moon, ShieldCheck, PhoneCall, Clock } from 'lucide-react';
import { store } from '../services/store';

interface NavbarProps {
  onCartToggle: () => void;
  onAdminToggle: () => void;
  onFavoritesToggle: () => void;
  isAdminActive: boolean;
  isFavoritesActive: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onCartToggle,
  onAdminToggle,
  onFavoritesToggle,
  isAdminActive,
  isFavoritesActive,
  activeTab,
  setActiveTab
}) => {
  const [state, setState] = React.useState({
    isDark: store.isDark,
    cartCount: store.cart.reduce((sum, item) => sum + item.quantity, 0),
    wishlistCount: store.user?.wishlist?.length || 0
  });

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState({
        isDark: store.isDark,
        cartCount: store.cart.reduce((sum, item) => sum + item.quantity, 0),
        wishlistCount: store.user?.wishlist?.length || 0
      });
    });
    return unsubscribe;
  }, []);

  const handleLogoClick = () => {
    onAdminToggle();
    if (isAdminActive) onAdminToggle();
    if (isFavoritesActive) onFavoritesToggle();
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300 w-full shadow-premium">
      {/* Top Banner info */}
      <div className="bg-brand-purple text-brand-yellow px-4 py-1.5 text-xs flex justify-between items-center font-medium md:px-8">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <PhoneCall size={12} /> +91 8500857676 / 08643-225544
          </span>
          <span className="hidden md:flex items-center gap-1">
            <Clock size={12} /> 11:00 AM - 9:45 PM
          </span>
        </div>
        <div>
          <span>Srungarapuram, Bapatla, AP</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        {/* Restaurant Branding */}
        <div 
          onClick={handleLogoClick}
          className="flex flex-col cursor-pointer transition-transform duration-200 active:scale-95 group"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-serif font-bold text-brand-red group-hover:text-brand-red/90 transition-colors">
              Chilli's
            </span>
            <span className="text-xs font-sans font-semibold bg-brand-yellow/30 text-brand-red dark:text-brand-yellow px-2 py-0.5 rounded-full border border-brand-yellow/60">
              Family
            </span>
          </div>
          <span className="text-[10px] tracking-wider uppercase font-medium text-gray-500 dark:text-gray-400 font-sans mt-0.5">
            Good Food. Good Taste.
          </span>
        </div>

        {/* Navigation Tabs */}
        {!isAdminActive && !isFavoritesActive && (
          <nav className="hidden md:flex items-center gap-6">
            {['home', 'menu', 'why-us', 'reviews', 'location'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  const el = document.getElementById(tab);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`text-sm font-semibold capitalize transition-all duration-200 relative py-1 ${
                  activeTab === tab 
                    ? 'text-brand-red dark:text-brand-yellow' 
                    : 'text-gray-600 hover:text-brand-red dark:text-gray-300 dark:hover:text-brand-yellow'
                }`}
              >
                {tab.replace('-', ' ')}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-red dark:bg-brand-yellow rounded-full animate-slide-up" />
                )}
              </button>
            ))}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Admin Switcher */}
          <button
            onClick={onAdminToggle}
            className={`p-2 rounded-full transition-all duration-300 relative ${
              isAdminActive
                ? 'bg-brand-red text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
            }`}
            title="Admin Dashboard"
          >
            <ShieldCheck size={20} className={isAdminActive ? 'animate-pulse' : ''} />
            {isAdminActive && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-gray-900" />
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => store.toggleTheme()}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition-all duration-300"
            title="Toggle Theme"
          >
            {state.isDark ? <Sun size={20} className="text-brand-yellow" /> : <Moon size={20} />}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onFavoritesToggle}
            className={`p-2 rounded-full transition-all duration-300 relative ${
              isFavoritesActive 
                ? 'bg-brand-red text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
            }`}
            title="Favorites"
          >
            <Heart size={20} className={isFavoritesActive ? 'fill-white' : ''} />
            {state.wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white dark:border-gray-900">
                {state.wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onCartToggle}
            className="p-2.5 rounded-full bg-brand-red hover:bg-brand-red/90 text-white shadow-lg shadow-brand-red/20 transition-all duration-200 relative flex items-center gap-1 px-4 active:scale-95"
            title="View Cart"
          >
            <ShoppingCart size={18} />
            <span className="hidden md:inline text-xs font-bold font-sans">Cart</span>
            {state.cartCount > 0 && (
              <span className="bg-brand-yellow text-brand-purple text-[10px] w-5.5 h-5.5 rounded-full flex items-center justify-center font-black animate-bounce">
                {state.cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
