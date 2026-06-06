import React from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { Hero } from './components/Hero';
import { DishCard } from './components/DishCard';
import { ReviewSection } from './components/ReviewSection';
import { Gallery } from './components/Gallery';
import { LocationSection } from './components/LocationSection';
import { CartDrawer } from './components/CartDrawer';
import { OrderTracker } from './components/OrderTracker';
import { AdminDashboard } from './components/AdminDashboard';
import { store } from './services/store';
import { MenuItem } from './data/menu';
import { 
  Search, ShieldCheck, Heart, Sparkles, Clock, Flame, 
  MapPin, ShoppingCart, Info, Award, Leaf, Zap, DollarSign
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('home');
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isAdminActive, setIsAdminActive] = React.useState(false);
  const [isFavoritesActive, setIsFavoritesActive] = React.useState(false);
  const [activeOrderId, setActiveOrderId] = React.useState<string | null>(null);

  // Search & Category Filters State
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [vegOnly, setVegOnly] = React.useState(false);

  // Dynamic values subscribed to store
  const [state, setState] = React.useState({
    menuItems: store.menuItems,
    recentlyViewed: store.recentlyViewed,
    aiRecommendations: store.getAIRecommendations(),
    wishlist: store.user?.wishlist || []
  });

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState({
        menuItems: [...store.menuItems],
        recentlyViewed: [...store.recentlyViewed],
        aiRecommendations: store.getAIRecommendations(),
        wishlist: store.user?.wishlist || []
      });
    });
    return unsubscribe;
  }, []);

  const handleOrderSuccess = (orderId: string) => {
    setActiveOrderId(orderId);
    setIsAdminActive(false);
    setIsFavoritesActive(false);
  };

  // Filter menu items based on options
  const filteredMenu = state.menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesSearch && matchesCategory && matchesVeg;
  });

  const popularDishes = state.menuItems.filter((item) => item.isPopular);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Layer */}
      <Navbar
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onAdminToggle={() => {
          setIsAdminActive(!isAdminActive);
          setIsFavoritesActive(false);
          setActiveOrderId(null);
        }}
        onFavoritesToggle={() => {
          setIsFavoritesActive(!isFavoritesActive);
          setIsAdminActive(false);
          setActiveOrderId(null);
        }}
        isAdminActive={isAdminActive}
        isFavoritesActive={isFavoritesActive}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Areas */}
      <main className="flex-grow">
        {isAdminActive ? (
          /* OWNER ADMIN PANEL VIEW */
          <AdminDashboard />
        ) : isFavoritesActive ? (
          /* USER WISHLIST FAVORITES VIEW */
          <section className="py-16 px-4 max-w-7xl mx-auto select-none min-h-[80vh]">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
                Your Preferred Dishes
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-black dark:text-white mt-1">
                Your Saved Favorites
              </h2>
              <div className="w-12 h-0.5 bg-brand-red mx-auto my-3" />
            </div>

            {state.wishlist.length === 0 ? (
              <div className="text-center py-16">
                <Heart size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-xs text-gray-500">You haven't favorited any dishes yet.</p>
                <button
                  onClick={() => setIsFavoritesActive(false)}
                  className="mt-4 px-5 py-2.5 bg-brand-red text-white text-xs font-bold rounded-xl"
                >
                  Explore Delicious Menu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {state.menuItems
                  .filter((item) => state.wishlist.includes(item.id))
                  .map((item) => (
                    <DishCard key={item.id} item={item} />
                  ))}
              </div>
            )}
          </section>
        ) : activeOrderId ? (
          /* LIVE ACTIVE ORDER TRACKING VIEW */
          <OrderTracker
            orderId={activeOrderId}
            onBackToHome={() => setActiveOrderId(null)}
          />
        ) : (
          /* MAIN LUXURY HOMEPAGE LANDING VIEW */
          <>
            {/* Hero Section */}
            <Hero onOrderNowClick={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }} />

            {/* Popular Highlights Grid */}
            <section id="popular" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red dark:text-brand-yellow">
                  Trending Specialities
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-black dark:text-white mt-1">
                  Our Popular Dishes
                </h2>
                <div className="w-16 h-1 bg-brand-red mx-auto my-4 rounded-full" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Try Bapatla's highly ordered dishes cooked with premium ingredients.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularDishes.slice(0, 6).map((item) => (
                  <DishCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            {/* Why Choose Us Cards */}
            <section id="why-us" className="py-20 bg-gray-50 dark:bg-black/30 border-y border-gray-150 dark:border-white/5 select-none">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-red dark:text-brand-yellow">
                    Premium Quality
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-black dark:text-white mt-1">
                    Why Choose Chilli's
                  </h2>
                  <div className="w-16 h-1 bg-brand-red mx-auto my-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {[
                    { label: 'Fresh Ingredients', desc: 'Prepared with fresh cuts of chicken, veggies, and daily dairy.', icon: Leaf, color: 'text-green-500' },
                    { label: 'Express Delivery', desc: 'Fast, hot packaging ensuring zero heat loss to Bapatla.', icon: Zap, color: 'text-orange-500' },
                    { label: 'Safe & Hygienic', desc: 'Double masked staff, sanitised utensils, clean setups.', icon: ShieldCheck, color: 'text-blue-500' },
                    { label: 'Family Friendly', desc: 'Cozy and spacious AC rooms perfect for dine-ins.', icon: Award, color: 'text-brand-yellow' },
                    { label: 'Affordable Pricing', desc: 'Startup quality food at extremely reasonable pricing.', icon: DollarSign, color: 'text-green-600' }
                  ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                      <div key={i} className="glass p-6 rounded-2xl text-center border border-gray-150 dark:border-white/5 flex flex-col items-center">
                        <div className={`p-3.5 rounded-full bg-white dark:bg-gray-900 shadow-md ${card.color} mb-4`}>
                          <Icon size={24} />
                        </div>
                        <h4 className="font-serif font-black text-base text-gray-800 dark:text-white mb-2">
                          {card.label}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Menu Filter System */}
            <section id="menu" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red dark:text-brand-yellow">
                  Order Food Delivery
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-black dark:text-white mt-1">
                  Browse Menu & Filter
                </h2>
                <div className="w-16 h-1 bg-brand-red mx-auto my-4 rounded-full" />
              </div>

              {/* Search input & Veg Toggle */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-gray-50 dark:bg-black/20 p-4 rounded-3xl border border-gray-150 dark:border-white/5 shadow-sm">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search biryani, tandoori, curries, soups..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white dark:bg-gray-950 border border-gray-250 dark:border-white/5 p-3 pl-10 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-red"
                  />
                </div>

                {/* Categories Tab Scrollbar */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
                  {['All', 'Biryani', 'Fried Rice', 'Non-Veg Curries', 'Veg Curries', 'Tandoori', 'Soups', 'Rice Items', 'Starters', 'Chinese'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2.5 rounded-xl text-[10px] uppercase font-bold tracking-wider transition-all duration-200 shrink-0 cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-brand-red text-white shadow-md shadow-brand-red/10'
                          : 'bg-white dark:bg-gray-950 hover:bg-gray-100 text-gray-700 dark:text-gray-300 border border-gray-150 dark:border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Veg Toggle Badge */}
                <button
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                    vegOnly
                      ? 'bg-green-500 text-white border-green-500 shadow-md'
                      : 'bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/5'
                  }`}
                >
                  <Leaf size={14} />
                  <span>Veg Only</span>
                </button>
              </div>

              {/* Menu Grid Items */}
              {filteredMenu.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-3xl">🔍</span>
                  <p className="text-xs text-gray-500 mt-2">No items found matching the selected filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredMenu.map((item) => (
                    <DishCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </section>

            {/* AI Food Recommendations & Suggestions */}
            {state.aiRecommendations.length > 0 && (
              <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2 mb-8">
                  <div className="p-2 bg-brand-yellow/10 dark:bg-brand-yellow/20 text-brand-red dark:text-brand-yellow rounded-xl">
                    <Sparkles size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-xl text-black dark:text-white">
                      Chef's Personalized Recommendations
                    </h3>
                    <p className="text-[10px] text-gray-400">Smart recommendations generated for you based on viewed categories</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {state.aiRecommendations.map((item) => (
                    <DishCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}

            {/* Recently Viewed Panel */}
            {state.recentlyViewed.length > 0 && (
              <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none border-t border-gray-100 dark:border-white/5">
                <h3 className="font-serif font-black text-lg text-black dark:text-white mb-6">
                  Recently Viewed Dishes
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {state.menuItems
                    .filter((m) => state.recentlyViewed.includes(m.id))
                    .map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => store.addToCart(item)}
                        className="group bg-gray-50/50 dark:bg-black/20 p-2.5 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-3 items-center hover:border-brand-red cursor-pointer transition-all"
                      >
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-xs text-gray-800 dark:text-white block truncate">{item.name}</span>
                          <span className="font-black text-[10px] text-brand-red dark:text-brand-yellow block mt-0.5">₹{item.price}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Restaurant Gallery Section */}
            <Gallery />

            {/* Customer Reviews Section */}
            <ReviewSection />

            {/* Location Section */}
            <LocationSection />
          </>
        )}
      </main>

      {/* Footer System */}
      <footer className="bg-brand-purple text-gray-300 py-12 border-t border-white/5 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand block */}
          <div className="space-y-3">
            <h3 className="font-serif font-black text-2xl text-brand-yellow">Chilli's Restaurant</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Serving premium authentic Indian, Biryani, Chinese & Tandoori cuisines since decades. Good Food. Good Taste.
            </p>
            <span className="text-[10px] text-gray-400 block font-semibold">
              GSTIN: 37ANRPK6273H1ZV
            </span>
          </div>

          {/* Quick links block */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-brand-yellow text-sm">Navigate</h4>
            <ul className="text-xs space-y-2">
              {['home', 'menu', 'why-us', 'reviews', 'location'].map((tab) => (
                <li key={tab}>
                  <button 
                    onClick={() => {
                      setIsAdminActive(false);
                      setIsFavoritesActive(false);
                      setActiveOrderId(null);
                      setActiveTab(tab);
                      const el = document.getElementById(tab);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }} 
                    className="hover:text-brand-yellow hover:underline cursor-pointer capitalize"
                  >
                    {tab.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating times */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-brand-yellow text-sm">Working Hours</h4>
            <ul className="text-xs space-y-1.5 text-gray-400">
              <li>Monday - Sunday</li>
              <li className="font-bold text-white">11:00 AM - 09:45 PM</li>
              <li className="text-[10px] text-green-400 font-semibold flex items-center gap-1 mt-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                Dine-in & Delivery active
              </li>
            </ul>
          </div>

          {/* Secure gateway & Contact info */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-brand-yellow text-sm">Order Helpline</h4>
            <ul className="text-xs space-y-1 text-gray-400">
              <li>Landline: <a href="tel:08643225544" className="text-white font-bold hover:text-brand-yellow transition-colors">08643-225544</a></li>
              <li>Mobile: <a href="tel:8500857676" className="text-white font-bold hover:text-brand-yellow transition-colors">+91 8500857676</a></li>
            </ul>
            <div className="flex items-center gap-1.5 bg-white/5 p-2 rounded-xl border border-white/5 w-fit mt-4">
              <span className="text-[9px] uppercase tracking-wider font-bold text-brand-yellow">Razorpay Secured</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-8 pt-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
          <span>© {new Date().getFullYear()} Chilli's Family Restaurant. All Rights Reserved.</span>
          <span>Project created by Aravind.N (Phone: +91 9100553873)</span>
        </div>
      </footer>

      {/* Slide Out Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
};
export default App;
